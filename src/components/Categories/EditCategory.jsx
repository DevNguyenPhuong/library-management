import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { updateData, getAllData } from "../../services/apiLibrary";
import { Button, Form, Input,Result } from "antd";

const EditCategory = () => {
    const { TextArea } = Input;
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const { categoryID } = useParams();
    const {
        data: data,
        error,
        isSuccess
    } = useQuery({
        queryFn: () => getAllData(`/categories/${categoryID}`),
        queryKey: ["categories",categoryID],
    });

    const {mutate: updateCategory, isPending } = useMutation({
        mutationFn: (data) => updateData(`/categories/${categoryID}`, data),

        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [`categories`],
            });
            toast.success("Update Success");
            navigate(`/categories`);
        },

        onError: (error) => {
            const { response } = error;
            toast.error(response?.data.message || "Opps, cannot perform this action");
        },
    });
    const onSubmit = (values) => {
        updateCategory(values);
    }
    return (
        <>
            <Button shape="rounded" onClick={() => navigate(`/categories`)}>
                <IoMdArrowBack />
            </Button>

            <h1 className="text-3xl font-bold mb-11 flex justify-center">
                Edit Category
            </h1>
            {isSuccess && (
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
                    initialValues={data}
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
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Please input description!",
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
            )}
            {error && (
                <Result
                status="error"
                title="Error"
                subTitle="Sorry, there was an error loading the sample data."
              />
            )}


        </>
    );
}

export default EditCategory