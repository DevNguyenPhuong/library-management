import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import dayjs from "dayjs";
import { useLayoutEffect, useState } from "react";
import { createData } from "../../services/apiLibrary";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { format } from "date-fns";

function CreateFineModal({ open, loan, onChangeModalVisible }) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { patronID } = useParams();
  const [totalFine, setTotalFine] = useState(0);
  const { mutate: createFine, isPending } = useMutation({
    mutationFn: (fine) => createData("/fines", fine),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fines", patronID],
      });
      toast.success("Fine created successfully");
      onChangeModalVisible(false);
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Oops, cannot perform this action");
    },
  });

  useLayoutEffect(() => {
    if (open) {
      if (loan?.loanDate && loan?.dueDate) {
        const overdueDays = Math.max(
          0,
          dayjs().diff(dayjs(loan?.dueDate), "day")
        );
        const overdueFine = overdueDays * 1000;
        setTotalFine(overdueFine);
        form.setFieldsValue({ overdueFine, paymentStatus: "PAID" });
      } else {
        setTotalFine(0);
        form.setFieldsValue({ overdueFine: 0, paymentStatus: "PAID" });
      }
    }
  }, [loan?.loanDate, loan?.dueDate, form, open]);

  function onClose() {
    form.resetFields();
    onChangeModalVisible(false);
  }

  const handleSubmit = async () => {
    const values = await form.validateFields();
    createFine({
      amount: totalFine,
      reason: `Overdue: ₫${values.overdueFine.toLocaleString()}, Other: ₫${(
        values.otherFine || 0
      ).toLocaleString()} - ${values.reason || "N/A"}`,
      patronId: patronID,
      paymentStatus: values.paymentStatus,
      issueDate: format(new Date(), "yyyy-MM-dd"),
      paymentDate:
        values.paymentStatus === "PAID"
          ? format(new Date(), "yyyy-MM-dd")
          : null,
      loanId: loan?.id,
    });
  };

  const handleOtherFineChange = (value) => {
    const overdueFine = form.getFieldValue("overdueFine") || 0;
    setTotalFine(overdueFine + (value || 0));
  };

  return (
    <Modal
      title={`Create Fine, overdue ${Math.max(
        0,
        dayjs().diff(dayjs(loan?.dueDate), "day")
      )} day(s)`}
      open={open}
      onCancel={onClose}
      footer={[
        <Button disabled={isPending} key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          loading={isPending}
          key="submit"
          type="primary"
          onClick={handleSubmit}
        >
          Submit Fine
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form} className="space-y-4">
        <div className="flex space-x-4">
          <Form.Item label="Loan Date" className="w-1/2">
            <DatePicker
              value={loan?.loanDate ? dayjs(loan.loanDate) : null}
              disabled
              className="w-full"
            />
          </Form.Item>
          <Form.Item label="Due Date" className="w-1/2">
            <DatePicker
              value={loan?.dueDate ? dayjs(loan.dueDate) : null}
              disabled
              className="w-full"
            />
          </Form.Item>
        </div>
        <Form.Item name="overdueFine" label="Overdue Fine (₫)" className="mb-2">
          <InputNumber
            disabled
            className="w-full"
            formatter={(value) =>
              `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>

        <Form.Item name="paymentStatus" label="Payment status" className="mb-2">
          <Select disabled={isPending}>
            <Select.Option key="PAID" value="PAID">
              PAID
            </Select.Option>
            <Select.Option key="UNPAID" value="UNPAID">
              UNPAID
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="otherFine" label="Other Fine (₫)" className="mb-2">
          <InputNumber
            disabled={isPending}
            min={0}
            className="w-full"
            onChange={handleOtherFineChange}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/₫\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item
          name="reason"
          label="Reason for Other Fine"
          rules={[
            ({ getFieldValue }) => ({
              required: !!getFieldValue("otherFine"),
              message: "Please input the reason for the other fine",
            }),
          ]}
        >
          <Input.TextArea disabled={isPending} rows={3} className="w-full" />
        </Form.Item>
        <div className="text-right font-bold text-lg">
          Total Fine: {totalFine.toLocaleString()} đ
        </div>
      </Form>
    </Modal>
  );
}

export default CreateFineModal;
