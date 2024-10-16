import React, { useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { createData } from "../../services/apiLibrary";
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
    InputNumber,
    Card,
    Col,
    Result,
    Spin,
    Row
} from 'antd';
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
            navigate(`/patrons`);
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
        <div className="max-w-6xl mx-auto p-6 ">
            <Card className="shadow-lg rounded-lg overflow-hidden">
                <Button
                    type="primary"
                    icon={<HiArrowLeft />}
                    onClick={() => navigate("/patrons")}
                >
                    Back
                </Button>
                <h2 className=" w-full flex justify-center items-center text-2xl font-semibold">
                    Create Patron Information
                </h2>
                <Form
                    size='large'
                    layout="horizontal"
                    onFinish={onSubmit}
                    name='patron-create'
                    className="p-6"
                >
                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item label="ID"
                                name="id"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input id!",
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input name!",
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item label="Gender"
                                name="gender"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input name!",
                                    },
                                ]}>
                                <Select
                                    placeholder="Select gender"
                                >
                                    <Select.Option value="MALE">Male</Select.Option>
                                    <Select.Option value="FEMALE">Female</Select.Option>
                                    <Select.Option value="OTHER">Other</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Status"
                                name="status"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input status!",
                                    },
                                ]}>
                                <Select
                                    placeholder="Select status"
                                >
                                    <Select.Option value="ACTIVE">Active</Select.Option>
                                    <Select.Option value="INACTIVE">Inactive</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item label="Phone"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input phone!",
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Currently Borrowed"
                                name="currentlyBorrowed"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input currently borrowed!",
                                    },
                                ]}
                            >
                                <InputNumber min={1} className='w-full' />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col xs={24} md={12}>
                            <Form.Item label="Day of birth"
                                name="dob"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input day of birth!",
                                    },
                                ]}>
                                <DatePicker className='w-full' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Membership Day"
                                name="membershipDate"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input membership day!",
                                    },
                                ]}>
                                <DatePicker className='w-full' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
        </div>
    );
};

export default AddPatron