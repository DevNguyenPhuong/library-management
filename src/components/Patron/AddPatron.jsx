import { BookOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { format } from "date-fns";
import React from "react";
import { toast } from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { createData } from "../../services/apiLibrary";

const AddPatron = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (patron) => createData(`/patrons`, patron),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`patrons`],
      });
      toast.success("Add Success");
      navigate(`/librarian/patrons`);
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const onSubmit = (values) => {
    mutate({
      ...values,
      currentlyBorrowed: 0,
      status: "ACTIVE",
      dob: format(values.dob.$d, "yyyy-MM-dd"),
      membershipDate: format(values.membershipDate.$d, "yyyy-MM-dd"),
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-wrap items-center w-full">
          <Button
            type="primary"
            icon={<HiArrowLeft />}
            onClick={() => navigate("/librarian/patrons")}
          >
            Back
          </Button>

          <h2 className=" w-full flex justify-center items-center text-2xl font-semibold">
            <BookOutlined className="mr-2" />
            Create Patron Information
          </h2>
        </div>
        <Form
          size="large"
          layout="horizontal"
          style={{
            maxWidth: 1000,
          }}
          onFinish={onSubmit}
          className="mt-10"
        >
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label="ID"
                name="id"
                rules={[
                  {
                    required: true,
                    message: "Please input id!",
                  },
                ]}
              >
                <Input placeholder="Id of patron" disabled={isPending} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
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
                <Input placeholder="Name of patron" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please input name!",
                  },
                ]}
              >
                <Select placeholder="Select gender">
                  <Select.Option value="MALE">Male</Select.Option>
                  <Select.Option value="FEMALE">Female</Select.Option>
                  <Select.Option value="OTHER">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input phone!",
                  },
                ]}
              >
                <Input placeholder="Phone of patron" disabled={isPending} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Day of birth"
                name="dob"
                rules={[
                  {
                    required: true,
                    message: "Please input day of birth!",
                  },
                ]}
              >
                <DatePicker className="w-full" disabled={isPending} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Membership Day"
                name="membershipDate"
                rules={[
                  {
                    required: true,
                    message: "Please input membership day!",
                  },
                ]}
              >
                <DatePicker className="w-full" disabled={isPending} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddPatron;
