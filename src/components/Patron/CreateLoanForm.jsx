import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import { addDays, format } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createData } from "../../services/apiLibrary";
import SimpleBookTable from "./SimpleBookTable";

const LOAN_DURATIONS = [
  { label: "5 Days", value: 5 },
  { label: "15 Days", value: 15 },
  { label: "30 Days", value: 30 },
];

function CreateLoanForm() {
  const [form] = Form.useForm();
  const [bookCopyId, setBookCopyId] = useState(null);
  const { patronID } = useParams();
  const queryClient = useQueryClient();
  const id =
    useSelector((store) => store.user.id) || localStorage.getItem("id");

  const { mutate, isPending } = useMutation({
    mutationFn: (loan) => createData("/loans", loan),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["loans", patronID],
      });
      toast.success("Loan created successfully");
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Oops, cannot perform this action");
    },
  });

  useEffect(() => {
    if (bookCopyId) {
      form.setFieldValue("bookCopyId", bookCopyId);
    }
  }, [bookCopyId, form]);

  const handleSubmit = async (values) => {
    const loanDate = new Date();
    const dueDate = addDays(loanDate, values.duration);

    const loanData = {
      ...values,
      dueDate: format(dueDate, "yyyy-MM-dd"),
      status: "BORROWED",
      loanDate: format(loanDate, "yyyy-MM-dd"),
      returnDate: null,
      patronId: patronID,
      userId: id,
    };

    mutate(loanData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">New Loan</h2>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="duration"
          label="Loan Duration"
          rules={[
            { required: true, message: "Please select the loan duration" },
          ]}
        >
          <Select
            disabled={isPending}
            placeholder="Select loan duration"
            options={LOAN_DURATIONS}
          />
        </Form.Item>

        <Form.Item
          name="bookCopyId"
          label="Book Copy ID"
          rules={[{ required: true, message: "Please enter the book copy ID" }]}
        >
          <Input
            readOnly
            disabled={isPending}
            placeholder="Select a book from the table below"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={isPending}
          >
            Create Loan
          </Button>
        </Form.Item>
      </Form>

      <SimpleBookTable setBookCopyId={setBookCopyId} />
    </div>
  );
}

export default CreateLoanForm;
