import { LockOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import libraryBackground from "../assets/bg-img.jpg";
import { createData } from "../services/apiLibrary";

const { Title, Text } = Typography;

function Signup() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: (data) => createData("/patrons/register", data),
    onSuccess: () => {
      toast.success("Your account has successfully created");
      form.resetFields();
      navigate("/signup");
    },
    onError: (error) => {
      const { response } = error;
      console.log(error);
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const onFinish = (user) => {
    signup(user);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${libraryBackground})` }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="w-full max-w-lg px-4">
        <Form
          form={form}
          wrapperCol={{ span: 24 }}
          requiredMark={false}
          size="large"
          layout="vertical"
          onFinish={onFinish}
          className="p-8 rounded-xl shadow-2xl bg-white bg-opacity-90 backdrop-blur-sm"
        >
          <Button
            disabl={isPending}
            onClick={() => navigate("/login")}
            className="absolute"
          >
            <HiArrowLeft />
          </Button>

          <Title level={2} className="text-center text-primary ">
            <p> Welcome</p>
          </Title>

          <Text className="-mt-4 block text-center mb-8 text-gray-600">
            Library management system
          </Text>

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "username required!" }]}
          >
            <Input
              disabled={isPending}
              placeholder="John Danny"
              className="w-full rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              className="rounded-md"
              disabled={isPending}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Confirm Password required!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
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
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Confirm password"
              className="rounded-md"
              disabled={isPending}
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between items-center space-x-4 mt-8">
              <Button
                className="flex-1 rounded-md hover:opacity-90 transition-opacity"
                onClick={() => {
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="flex-1 rounded-md hover:opacity-90 transition-opacity"
              >
                Sign up
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
