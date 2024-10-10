import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import React from "react";
import { toast } from "react-hot-toast";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { createData } from "../../services/apiLibrary";

const AddCategories = () => {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (category) => createData(`/categories`, category),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`categories`],
      });
      toast.success("Add Success");
      navigate(`/categories`);
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <>
      <Button shape="rounded" onClick={() => navigate(`/categories`)}>
        <IoMdArrowBack />
      </Button>

      <h1 className="text-3xl font-bold mb-11 flex justify-center">
        Add New Category
      </h1>
      <Form
        name="add"
        size="large"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 32,
        }}
        style={{
          maxWidth: 1000,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name!",
            },
          ]}
        >
          <Input disabled={isPending} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input description!",
            },
          ]}
        >
          <TextArea disabled={isPending} rows={4} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button loading={isPending} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCategories;
