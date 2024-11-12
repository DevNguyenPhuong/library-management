import { BookOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Form, InputNumber, Modal } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlinePlus } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { createData } from "../../services/apiLibrary";
import UpdateBook from "../Books/UpdateBook";
import BookCopiesTable from "./BookCopiesTable";

function BookCopies() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { bookId } = useParams();
  const onSubmit = () => {
    form.validateFields().then((values) => {
      mutate({
        ...values,
        bookId: bookId,
      });
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  const { mutate, isPending } = useMutation({
    mutationFn: (bookCopies) => createData(`/book-copies`, bookCopies),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`book-copies`],
      });
      toast.success("Add Success");
      form.resetFields();
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
      form.resetFields();
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
            title="Add Book Copied"
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
                <InputNumber disabled={isPending} className="w-full" min={1} />
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </div>
    </div>
  );
}

export default BookCopies;
