import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { IoMdArrowBack } from "react-icons/io";
import { createData } from '../../services/apiBooks';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';



const AddCategories = () => {
    const [category, setCategory] = useState({
        name: '',
        description: ''
    })
    const navigate = useNavigate()

    const queryClient = useQueryClient();
    const { mutate: mutation, isPending } = useMutation({
        mutationFn: (category) => createData(`/categories`, category),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [`categories`],
            });
            toast.success("Add Success")
            navigate(`/categories`)
        },
        onError: (error) => {
            const { response } = error;
            toast.error(response?.data.message || "Opps, cannot perform this action");
        },
    });
    const onSubmit = (e) => {
        e.preventDefault()
        mutation(category)
    }
    // createData(`/categories`,)
    return (
        <>

            <Button shape='rounded' onClick={() => navigate(`/categories`)}><IoMdArrowBack />
            </Button>
            {isPending ?
            (
            <Flex className='flex justify-center'>
                <Spin className='' indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
            </Flex>

            ) : (
            <>
                <h1 className='text-3xl font-bold mb-11 flex justify-center'>Add New Category</h1>
                <Form
                    name="basic"
                    size='large'
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 32,
                    }}
                    style={{
                        maxWidth: 1000,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input name!',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setCategory({
                            ...category,
                            name: e.target.value
                        })} />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input description!',
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) => setCategory({
                                ...category,
                                description: e.target.value
                            })}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" onClick={onSubmit}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </>
            )
            }
        </>
    )
}

export default AddCategories