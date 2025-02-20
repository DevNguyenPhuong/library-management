import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import libraryBackground from "../assets/bg-img.jpg"; // Adjust the path as necessary
import { useLogin } from "../hooks/Authentication/useLogin";

const { Title, Text } = Typography;

function Login() {
  const { login, isPending } = useLogin();
  const [form] = Form.useForm();

  const onFinish = (user) => {
    login(user);
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
          initialValues={{ role: "PATRON" }}
        >
          <Title level={2} className="text-center mb-2 text-primary">
            Welcome Back
          </Title>
          <Text className="block text-center mb-8 text-gray-600">
            Library management system
          </Text>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Username"
              className="rounded-md"
              disabled={isPending}
            />
          </Form.Item>
          <Form.Item
            name="password"
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

          <Form.Item>
            <div className="flex justify-between items-center space-x-4">
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
                Log in
              </Button>
            </div>
          </Form.Item>

          <p className="flex justify-center mb-2">
            Not registed?
            <Link className="pl-2 text-indigo-400" to={"/signup"}>
              Create an account
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Login;
