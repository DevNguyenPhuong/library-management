import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { updateData, getAllData } from "../../services/apiLibrary";
import { Button, Form, Input, Result, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const EditPublisher = () => {
    const { TextArea } = Input;
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const { publisherID } = useParams();
    const {
        data: publisher,
        error,
        isLoading
    } = useQuery({
        queryFn: () => getAllData(`/publishers/${publisherID}`),
        queryKey: ["publishers", publisherID],
    });

    const { mutate: updatePublisher, isPending } = useMutation({
        mutationFn: (publisher) => updateData(`/publishers/${publisherID}`, publisher),

        onSuccess: (publisher) => {
            queryClient.invalidateQueries({
                queryKey: [`publishers`],
            });
            toast.success("Update Success");
            navigate(`/publishers`);
        },

        onError: (error) => {
            const { response } = error;
            toast.error(response?.data.message || "Opps, cannot perform this action");
        },
    });
    if (error)
        return <>
            <Result
                status="error"
                title="Error"
                subTitle="Sorry, there was an error loading the sample data."
            />
        </>
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </div>
        );
    }
    const onSubmit = (values) => {
        updatePublisher(values);
    }
    return (
        <>
            <Button shape="rounded" onClick={() => navigate(`/publishers`)}>
                <IoMdArrowBack />
            </Button>

            <h1 className="text-3xl font-bold mb-11 flex justify-center">
                Edit Category
            </h1>
            <Form
                name="add"
                size="large"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 32,
                }}
                style={{
                    maxWidth: 1000,
                }}
                initialValues={publisher}
                onFinish={onSubmit}
            >
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
                    <Input disabled={isPending} />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: "Please input Address!",
                        },
                    ]}
                >
                    <TextArea disabled={isPending} rows={4} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button loading={isPending} type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default EditPublisher