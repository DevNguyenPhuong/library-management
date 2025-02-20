import { Button, Form, Input, Modal } from "antd";
import { HiPlus } from "react-icons/hi";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import LibrariansList from "./LibrariansList";
import { createData } from "../../services/apiLibrary";

function Librarians() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const query = searchParams.get("query") || "";
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate: addLibrarians, isPending } = useMutation({
    mutationFn: (data) => createData(`/librarians`, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [["librarians"], page, query],
      });
      toast.success("Create Success");
      setIsModalVisible(false);
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const onSubmit = () => {
    form.validateFields().then((values) => {
      addLibrarians(values);
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button
        type="primary"
        className="mb-4"
        icon={<HiPlus />}
        onClick={() => setIsModalVisible(true)}
      >
        Add librarian
      </Button>
      <LibrariansList />

      <Modal
        centered
        title="Add librarian account"
        open={isModalVisible}
        onOk={onSubmit}
        onCancel={handleCancel}
        className="modal"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input
              className="border border-gray-300 rounded-md"
              disabled={isPending}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password
              className="border border-gray-300 rounded-md"
              disabled={isPending}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Librarians;
