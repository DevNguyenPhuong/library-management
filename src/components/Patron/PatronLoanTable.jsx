import {
  CalendarOutlined,
  EditOutlined,
  SearchOutlined,
  DollarOutlined,
  SyncOutlined,
  RollbackOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Spin,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { addDays, format, isBefore, parseISO } from "date-fns";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteData, getAllData, updateData } from "../../services/apiLibrary";
import { getStatusAndColor } from "../../utils/helpers";
import toast from "react-hot-toast";

const { Option } = Select;

export default function PatronLoanTable() {
  const [form] = Form.useForm();
  const { patronID } = useParams();
  const [searchText, setSearchText] = useState("");
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryFn: () => getAllData(`/patrons/${patronID}/loans`),
    queryKey: ["loans", patronID],
  });

  const { mutate: updateLoan, isPending: isPendingUpdateLoan } = useMutation({
    mutationFn: ({ loanId, updatedLoan }) =>
      updateData(`/loans/${loanId}`, updatedLoan),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`loans`, patronID],
      });
      toast.success("update Success");
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const { mutate: deleteLoan } = useMutation({
    mutationFn: (id) => deleteData(`/loans/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`loans`, patronID],
      });
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (item) =>
        item.bookCopy.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.patron.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-24">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="There was an error loading the data. Please try again later."
        type="error"
        showIcon
      />
    );
  }

  const columns = [
    {
      title: "Book Title",
      dataIndex: ["bookCopy", "title"],
      key: "title",
    },
    {
      title: "Patron",
      dataIndex: ["patron", "name"],
      key: "patron",
    },
    {
      title: "Loan Date",
      dataIndex: "loanDate",
      key: "loanDate",
      render: (date) => format(new Date(date), "MMM dd, yyyy"),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date) => format(new Date(date), "MMM dd, yyyy"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (date, record) => {
        const { label, color } = getStatusAndColor(
          record.status,
          record.dueDate
        );
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Popconfirm
            title="Renew Book"
            description={`Renew this for 7 days ?`}
            onConfirm={() => updateLoan(record, "RENEW")}
            okText="Renew"
            cancelText="Cancel"
          >
            <Tooltip placement="bottom" title="Renew">
              <Button
                icon={<SyncOutlined />}
                className="text-blue-500 hover:text-blue-600"
                aria-label="Renew book"
              />
            </Tooltip>
          </Popconfirm>

          <Popconfirm
            title="Return Book"
            description={`Return this book ?`}
            onConfirm={() => updateLoan(record, "RETURNED")}
            okText="Return"
            cancelText="Cancel"
          >
            <Tooltip placement="bottom" title="Return">
              <Button
                icon={<RollbackOutlined />}
                className="text-green-500 hover:text-green-600"
                aria-label="Return book"
              />
            </Tooltip>
          </Popconfirm>

          {isBefore(new Date(record.dueDate), new Date()) && (
            <Tooltip placement="bottom" title="Fine">
              <Button
                icon={<DollarOutlined />}
                onClick={() => showModal(record)}
              />
            </Tooltip>
          )}

          <Popconfirm
            title="Delete Book Record"
            description={`Delete this ? This action cannot be undone.`}
            onConfirm={() => deleteLoan(record.id)}
            okText="Delete"
            okType="danger"
            cancelText="Cancel"
          >
            <Tooltip placement="bottom" title="Delete">
              <Button
                icon={<DeleteOutlined />}
                className="text-red-500 hover:text-red-600"
                aria-label="Delete book record"
              />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  function onUpdate(oldLoan, type) {
    const updatedLoan = {
      loanDate: oldLoan.loanDate,
      returnDate: type === "RETURNED" ? format(new Date(), "yyyy-MM-dd") : null,
      dueDate:
        type === "RETURNED"
          ? oldLoan.dueDate
          : format(addDays(parseISO(oldLoan.dueDate), 7), "yyyy-MM-dd"),
      status: type === "RETURNED" ? "RETURNED" : "BORROWED",
      patronId: oldLoan.patron.id,
      bookCopyId: oldLoan.bookCopy.id,
      userId: oldLoan.user.id,
    };

    console.log({ loanId: oldLoan.id, updatedLoan });
    //    updateLoan({ loanId: oldLoan.id, updatedLoan });
  }

  function showModal(record) {
    form.setFieldsValue({
      ...data,
      status: record.status,
    });
    setIsModalUpdateVisible(true);
  }

  return (
    <>
      <div className="mb-4">
        <Input
          placeholder="Search by book title or patron name"
          prefix={<SearchOutlined className="text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full max-w-md"
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{
          pageSize: 5,
        }}
        className="shadow-sm"
      />

      <Modal
        title="Update loan"
        open={isModalUpdateVisible}
        onOk={() => onUpdate("RETURN")}
        onCancel={() => setIsModalUpdateVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalUpdateVisible(false)}>
            Cancel
          </Button>,
          <Button key="update" type="primary" onClick={onUpdate}>
            Update
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select
              disabled={isPendingUpdateLoan}
              className="w-full border border-gray-300 rounded-md"
            >
              <Option value="RETURNED">RETURNED</Option>
              <Option value="BORROWED">BORROWED</Option>
            </Select>
          </Form.Item>
          <div className="flex gap-4 mt-4">
            <Button
              loading={isPendingUpdateLoan}
              type="primary"
              icon={<CalendarOutlined />}
              onClick={() => onUpdate("RENEW")}
              className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
            >
              Renew Loan
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
