import { BookOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Result,
  Row,
  Select,
  Spin,
} from "antd";
import React from "react";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { createData, getAllData } from "../../services/apiLibrary";

export default function AddUser() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: roles,
    isLoading: isLoadingRoles,
    error: errorRoles,
  } = useQuery({
    queryFn: () => getAllData(`/roles`),
    queryKey: ["roles"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (user) => createData(`/users`, user),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`users`],
      });
      toast.success("Add Success");
      form.resetFields();
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  if (isLoadingRoles) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (errorRoles) {
    return (
      <Result
        status="error"
        title="Failed to load form data"
        subTitle="Please try again later or contact support if the problem persists."
      />
    );
  }

  if (roles?.length === 0 || !roles) {
    return (
      <Result
        status="error"
        title="Failed to load form data"
        subTitle="Please try again later or contact support if the problem persists."
      />
    );
  }

  const onFinish = (values) => {
    mutate({
      ...values,
      dob: values.dob.format("YYYY-MM-DD"),
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-wrap items-center w-full">
          <Button
            type="primary"
            icon={<HiArrowLeft />}
            onClick={() => navigate("/admin/users")}
          >
            Back
          </Button>

          <h2 className=" w-full flex justify-center items-center text-2xl font-semibold">
            <BookOutlined className="mr-2" />
            Create User Information
          </h2>
        </div>
        <Form
          form={form}
          name="book-create"
          onFinish={onFinish}
          layout="vertical"
          className="p-6"
        >
          <Row className="mb-2" gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please input username!" }]}
              >
                <Input placeholder="John Danny" className="rounded-md" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input password!" },
                  { min: 8, message: "Password at least 8 character!" },
                ]}
              >
                <Input.Password
                  type="password"
                  disabled={isPending}
                  placeholder="************"
                  className="rounded-md"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row className="mb-2" gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Name required!" }]}
              >
                <Input
                  disabled={isPending}
                  placeholder="John Danny"
                  className="w-full rounded-md"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: "Please input phone!" }]}
              >
                <Input
                  placeholder="0123456789"
                  disabled={isPending}
                  min={0}
                  className="w-full rounded-md"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row className="mb-2" gutter={24}>
            <Col xs={24} md={4}>
              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[
                  { required: true, message: "Please input date of birth!" },
                ]}
              >
                <DatePicker disabled={isPending} />
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Please select gender!",
                  },
                ]}
              >
                <Select disabled={isPending} placeholder="Select gender">
                  <Select.Option value="MALE">Male</Select.Option>
                  <Select.Option value="FEMALE">Female</Select.Option>
                  <Select.Option value="OTHER">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <Form.Item
                name="roles"
                label="Roles"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one category!",
                    type: "array",
                  },
                ]}
              >
                <Select
                  disabled={isPending}
                  mode="multiple"
                  placeholder="Select roles"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  className="rounded-md"
                >
                  {roles.map((role) => (
                    <Select.Option key={role.name} value={role.name}>
                      {role.name}
                    </Select.Option>
                  ))}
                </Select>
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
              Create user
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
