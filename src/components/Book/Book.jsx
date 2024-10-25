import UpdateBook from "../Books/UpdateBook";
import React, { useState } from "react";
import { BookOutlined } from "@ant-design/icons";
import BookCopiesTable from "./BookCopiesTable";
import { HiOutlinePlus } from "react-icons/hi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Descriptions,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Tag,
  Typography,
  InputNumber
} from "antd";
import { createData, getAllData } from "../../services/apiLibrary";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function BookCopies() {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { bookId } = useParams();
  const onSubmit = () => {
    form.validateFields().then((values) => {
      mutate({
        ...values,
        bookId: bookId
      });
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: (bookCopies) => createData(`/book-copies`, bookCopies),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`book-copies`],
      });
      toast.success("Add Success");
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });
  return (
    <div>
      <UpdateBook />
      <div className="max-w-6xl mx-auto p-6 ">
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-wrap items-center w-full">
      <h2 className=" w-full flex justify-center items-center text-2xl font-semibold">
        <BookOutlined className="mr-2" />
        Book Copied
      </h2>
      <Button
        onClick={() => setIsModalVisible(true)}
        type="primary"
        icon={<HiOutlinePlus />}
      >
        Add Book Coppied
      </Button>
      </div>
      <BookCopiesTable />
      <Modal
        title="Add BookCopies Copied"
        open={isModalVisible}
        onOk={onSubmit}
        onCancel={handleCancel}
        // className="modal"
      >
        <Form layout="horizontal" form={form}>
          <Form.Item
            name="numberOfCopies"
            label="Number Of Copies"
            rules={[{ required: true }]}
          >
            <InputNumber className="w-full" min={1} />
          </Form.Item>
        </Form>
      </Modal>
      </Card>
      </div>
    </div>
  );
}

export default BookCopies;
