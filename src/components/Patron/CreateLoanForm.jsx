import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import SimpleBookTable from "./SimpleBookTable";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CreateLoanForm() {
  const [form] = Form.useForm();
  const [bookCopyId, setBookCopyId] = useState(null);
  const { patronID } = useParams();
  const { id } =
    useSelector((store) => store.user) || localStorage.getItem("id");

  // Move form update to useEffect
  useEffect(() => {
    // Only update if bookCopyId exists and after form is connected
    if (bookCopyId) {
      form.setFieldValue("bookCopyId", bookCopyId);
    }
  }, [bookCopyId, form]);

  const handleSubmit = async (values) => {
    console.log({
      ...values,
      dueDate: values.dueDate?.format("YYYY-MM-DD"),
      status: "BORROWED",
      loanDate: format(new Date(Date.now()), "yyyy-MM-dd"),
      returnDate: null,
      patronID,
      userId: id,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">New Loan</h2>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[
            { required: true, message: "Please select the due date" },
            {
              validator: (_, value) => {
                if (value && value.isBefore(new Date(), "day")) {
                  return Promise.reject("Due date cannot be in the past");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker
            className="w-full"
            disabledDate={(current) => {
              return current && current.isBefore(new Date(), "day");
            }}
          />
        </Form.Item>

        <Form.Item
          name="bookCopyId"
          label="Book Copy ID"
          rules={[
            { required: true, message: "Please enter the book copy ID" },
            {
              validator: (_, value) => {
                if (value && !/^[A-Za-z0-9-]+$/.test(value)) {
                  return Promise.reject("Invalid book copy ID format");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input readOnly placeholder="Select a book from the table below" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            className="w-full bg-blue-500 hover:bg-blue-600"
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
