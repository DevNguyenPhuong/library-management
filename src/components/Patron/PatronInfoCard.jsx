import React, { useState } from "react";

import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Form,
  Modal,
  Input,
  DatePicker,
  Select,
  Tag,
  Typography,
} from "antd";
import {
  EditOutlined,
  IdcardOutlined,
  CalendarOutlined,
  BookOutlined,
  UserOutlined,
} from "@ant-design/icons";

import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

const PatronInfoCard = ({ patron, calculateAge, onUpdatePatron }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue({
      ...patron,
      dob: moment(patron.dob),
      membershipDate: moment(patron.membershipDate),
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      onUpdatePatron({
        ...patron,
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

  return (
    <>
      <Card
        hoverable
        className="w-full"
        cover={
          <div className="bg-blue-600 p-6 text-center">
            <Avatar size={128} icon={<UserOutlined />} />
            <Title level={2} className="!text-white mt-4">
              {patron.name}
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
            {patron.id}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <CalendarOutlined /> Date of Birth
              </>
            }
          >
            {patron.dob} (Age: {calculateAge(patron.dob)})
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            <Tag color={patron.gender === "MALE" ? "blue" : "pink"}>
              {patron.gender}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <BookOutlined /> Currently Borrowed
              </>
            }
          >
            {patron.currentlyBorrowed} book(s)
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <CalendarOutlined /> Membership Date
              </>
            }
          >
            {patron.membershipDate}
          </Descriptions.Item>
        </Descriptions>
      </Card>



      <Modal
        title="Edit Patron Information"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modal"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input className="border border-gray-300 rounded-md" />
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select className="border border-gray-300 rounded-md">
              <Option value="MALE">Male</Option>
              <Option value="FEMALE">Female</Option>
              <Option value="OTHER">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="membershipDate"
            label="Membership Date"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </Form>
      </Modal>

    </>
  );
};

export default PatronInfoCard;
