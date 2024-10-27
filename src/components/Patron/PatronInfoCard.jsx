import {
  BookOutlined,
  CalendarOutlined,
  EditOutlined,
  IdcardOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Descriptions,
  Form,
  Input,
  Modal,
  Result,
  Select,
  Spin,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getAllData, updateData } from "../../services/apiLibrary";

import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

const PatronInfoCard = ({ calculateAge }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue({
      ...data,
      dob: moment(data.dob),
      membershipDate: moment(data.membershipDate),
    });
    setIsModalVisible(true);
  };

  const queryClient = useQueryClient();
  const { patronID } = useParams();
  const { data, error, isLoading } = useQuery({
    queryFn: () => getAllData(`/patrons/${patronID}`),
    queryKey: ["patrons", patronID],
  });

  const { mutate: updatePatron, isPending } = useMutation({
    mutationFn: (data) => updateData(`/patrons/${patronID}`, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`patrons`],
      });
      toast.success("Update Success");
      setIsModalVisible(false);
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const onSubmit = () => {
    form.validateFields().then((values) => {
      updatePatron({
        ...data,
        ...values,
        dob: values.dob.format("YYYY-MM-DD"),
        membershipDate: values.membershipDate.format("YYYY-MM-DD"),
      });
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );

  if (error) {
    return (
      <Result
        status="error"
        title="Error"
        subTitle="Sorry, there was an error loading the  data."
      />
    );
  }

  return (
    <>
      <Card
        hoverable
        className="w-full"
        cover={
          <div className="bg-blue-600 p-6 text-center">
            <Avatar size={128} icon={<UserOutlined />} />
            <Title level={2} className="!text-white mt-4">
              {data.name}
            </Title>
          </div>
        }
        actions={[
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={showModal}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Edit Information
          </Button>,
          <Button
            key="export"
            icon={<IdcardOutlined />}
            className="hover:bg-gray-200"
          >
            Export to PDF
          </Button>,
        ]}
      >
        <Descriptions title="Patron Information" bordered column={1}>
          <Descriptions.Item
            label={
              <>
                <IdcardOutlined /> Patron ID
              </>
            }
          >
            {data.id}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <CalendarOutlined /> Date of Birth
              </>
            }
          >
            {data.dob} (Age: {calculateAge(data.dob)})
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            <Tag color={data.gender === "MALE" ? "blue" : "pink"}>
              {data.gender}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <BookOutlined /> Currently Borrowed
              </>
            }
          >
            {data.currentlyBorrowed} book(s)
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <CalendarOutlined /> Membership Date
              </>
            }
          >
            {data.membershipDate}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Modal
        title="Edit Patron Information"
        open={isModalVisible}
        onOk={onSubmit}
        onCancel={handleCancel}
        className="modal"
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input
              className="border border-gray-300 rounded-md"
              disabled={isPending}
            />
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" disabled={isPending} />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select
              disabled={isPending}
              className="border border-gray-300 rounded-md"
            >
              <Option value="MALE">Male</Option>
              <Option value="FEMALE">Female</Option>
              <Option value="OTHER">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select
              disabled={isPending}
              className="border border-gray-300 rounded-md"
            >
              <Option value="ACTIVE">Active</Option>
              <Option value="INACTIVE">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input
              className="border border-gray-300 rounded-md"
              disabled={isPending}
            />
          </Form.Item>
          <Form.Item
            name="membershipDate"
            label="Membership Date"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" disabled={isPending} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PatronInfoCard;
