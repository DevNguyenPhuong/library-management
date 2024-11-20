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
import dayjs from "dayjs";
import React from "react";
import toast from "react-hot-toast";
import { getAllData, updateData } from "../../services/apiLibrary";

export default function UpdateCurrentUserForm() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useQuery({
    queryFn: () => getAllData(`/users/my-info`),
    queryKey: ["current-user"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (user) => updateData(`/users/update-me`, user),

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

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (errorUser) {
    return (
      <Result
        status="error"
        title="Failed to load form data"
        subTitle="Please try again later or contact support if the problem persists."
      />
    );
  }

  if (!user) {
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
          <h2 className=" w-full flex justify-center items-center text-2xl font-semibold">
            <BookOutlined className="mr-2" />
            Update my information
          </h2>
        </div>
        <Form
          form={form}
          name="user-create"
          onFinish={onFinish}
          layout="vertical"
          className="p-6"
          initialValues={{
            ...user,
            dob: user.dob ? dayjs(user.dob) : null,
            roles: user.roles.map((role) => role.name),
          }}
        >
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
            <Col xs={24} md={12}>
              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[
                  { required: true, message: "Please input date of birth!" },
                ]}
              >
                <DatePicker className="w-full" disabled={isPending} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
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
          </Row>

          <Form.Item className="text-center mt-8">
            <Button
              loading={isPending}
              type="primary"
              htmlType="submit"
              size="large"
              className="px-8 rounded-md"
            >
              Update user
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
