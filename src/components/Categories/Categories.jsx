import { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { HiPlus } from "react-icons/hi";
import CategoriesTable from "./CategoriesTable";
import { createData } from "../../services/apiLibrary";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Categories() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const { TextArea } = Input;

  const onSubmit = () => {
    form.validateFields().then((values) => {
      mutate({
        ...values,
      });
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (category) => createData(`/categories`, category),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`categories`],
      });
      toast.success("Add Success");
      form.resetFields();
    },
    onError: (error) => {
      const { response } = error;
      console.log(error);
      toast.error(response?.data.message || "Opps, cannot perform this action");
      form.resetFields();
    },
  });

  return (
    <div>
      <Button
        className="mb-4"
        type="primary"
        icon={<HiPlus />}
        onClick={() => setIsModalVisible(true)}
      >
        New Category
      </Button>
      <CategoriesTable />
      <Modal
        title="Add New Category"
        open={isModalVisible}
        onOk={onSubmit}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <TextArea
              placeholder="Tell somethings about this category"
              showCount
              maxLength={400}
              disabled={isPending}
              rows={5}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Categories;
