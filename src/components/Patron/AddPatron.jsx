import React, { useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { IoMdArrowBack } from "react-icons/io";
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
        <div>
            <Button shape="rounded" onClick={() => navigate(`/patrons`)}>
                <IoMdArrowBack />
            </Button>
            <h1 className="text-3xl font-bold mb-11 flex justify-center">
                Add New Patron
            </h1>
            <Form
                size='large'
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 32,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 1000,
                }}
                onFinish={onSubmit}

            >
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
                <Form.Item label="Currently Borrowed"
                    name="currentlyBorrowed"
                    rules={[
                        {
                            required: true,
                            message: "Please input currently borrowed!",
                        },
                    ]}
                >
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item label="Day of birth"
                    name="dob"
                    rules={[
                        {
                            required: true,
                            message: "Please input day of birth!",
                        },
                    ]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Membership Day"
                    name="membershipDate"
                    rules={[
                        {
                            required: true,
                            message: "Please input membership day!",
                        },
                    ]}>
                    <DatePicker />
                </Form.Item>
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
        </div>
    );
};

export default AddPatron