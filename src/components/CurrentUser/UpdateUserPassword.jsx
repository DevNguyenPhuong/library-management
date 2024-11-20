import { BookOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Col, Form, Input, Row } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { updateData } from "../../services/apiLibrary";

export default function UpdateUserPassword() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (user) => updateData(`/users/update-password`, user),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`current-user`],
      });
      toast.success("update Success");
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const onFinish = (values) => {
    mutate({
      ...values,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-wrap items-center w-full">
          <h2 className=" w-full flex justify-center items-center text-2xl font-semibold">
            <BookOutlined className="mr-2" />
            Change password
          </h2>
        </div>
        <Form
          form={form}
          name="user-create"
          onFinish={onFinish}
          layout="vertical"
          className="p-6"
        >
          <Row className="mb-2" gutter={24}>
            <Col xs={24} md={8}>
              <Form.Item
                name="oldPassword"
                label="Current Password"
                rules={[{ required: true, message: "Old password required!" }]}
              >
                <Input.Password
                  disabled={isPending}
                  className="w-full rounded-md"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true, message: "New password required!" }]}
              >
                <Input.Password
                  disabled={isPending}
                  className="w-full rounded-md"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Confirm Password required!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  disabled={isPending}
                  className="w-full rounded-md"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="text-center mt-8">
            <Button
              loading={isPending}
              type="primary"
              htmlType="submit"
              size="large"
              className="px-8 rounded-md"
            >
              Change password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
