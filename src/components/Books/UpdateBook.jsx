import { BookOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Result,
  Row,
  Select,
  Spin,
} from "antd";
import React from "react";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { createData, getAllData, updateData } from "../../services/apiLibrary";

export default function UpdateBook() {
  const { bookId } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: book,
    isLoading: isLoadingBook,
    error: errorBook,
  } = useQuery({
    queryFn: () => getAllData(`/books/${bookId}`),
    queryKey: ["books", bookId],
  });

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery({
    queryFn: () => getAllData(`/categories`),
    queryKey: ["categories"],
  });

  const {
    data: publishers,
    isLoading: isLoadingPublishers,
    error: errorPublishers,
  } = useQuery({
    queryFn: () => getAllData(`/publishers`),
    queryKey: ["publishers"],
  });

  const {
    data: authors,
    isLoading: isLoadingAuthors,
    error: errorAuthors,
  } = useQuery({
    queryFn: () => getAllData(`/authors`),
    queryKey: ["authors"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (book) => updateData(`/books/${bookId}`, book),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`books`, bookId],
      });
      toast.success("update Success");
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  if (
    isLoadingAuthors ||
    isLoadingCategories ||
    isLoadingPublishers ||
    isLoadingBook
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (errorAuthors || errorCategories || errorPublishers || errorBook) {
    return (
      <Result
        status="error"
        title="Failed to load form data"
        subTitle="Please try again later or contact support if the problem persists."
      />
    );
  }

  if (
    authors?.length === 0 ||
    categories?.length === 0 ||
    publishers?.length === 0 ||
    !book
  ) {
    return (
      <Result
        status="error"
        title="Failed to load form data"
        subTitle="Please try again later or contact support if the problem persists."
      />
    );
  }

  console.log(book);

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-wrap items-center w-full">
          <Button
            type="primary"
            icon={<HiArrowLeft />}
            onClick={() => navigate("/books")}
          >
            Back
          </Button>

          <h2 className=" w-full flex justify-center items-center text-2xl font-semibold">
            <BookOutlined className="mr-2" />
            Book Information
          </h2>
        </div>
        <Form
          form={form}
          name="book-create"
          onFinish={onFinish}
          layout="vertical"
          className="p-6"
          initialValues={{
            ...book,
            publisher: book.publisher.id,
            authors: book.authors.map((author) => author.id),
            categories: book.categories.map((category) => category.id),
          }}
        >
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please input the title!" }]}
              >
                <Input placeholder="Book title" className="rounded-md" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="isbn"
                label="ISBN"
                rules={[{ required: true, message: "Please input the ISBN!" }]}
              >
                <Input
                  disabled={isPending}
                  placeholder="International Standard Book Number"
                  className="rounded-md"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                name="publicationYear"
                label="Publication Year"
                rules={[
                  { required: true, message: "Publication year required!" },
                ]}
              >
                <InputNumber
                  disabled={isPending}
                  placeholder="2021"
                  className="w-full rounded-md"
                  min={1000}
                  max={new Date().getFullYear()}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please input the price!" }]}
              >
                <InputNumber
                  disabled={isPending}
                  min={0}
                  className="w-full rounded-md"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Form.Item
                name="publisher"
                label="Publisher"
                rules={[
                  { required: true, message: "Please select a publisher!" },
                ]}
              >
                <Select
                  disabled={isPending}
                  showSearch
                  placeholder="Select a publisher"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  className="rounded-md"
                >
                  {publishers.map((pub) => (
                    <Select.Option key={pub.id} value={pub.id} label={pub.name}>
                      {pub.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="authors"
                label="Authors"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one author!",
                    type: "array",
                  },
                ]}
              >
                <Select
                  disabled={isPending}
                  mode="multiple"
                  placeholder="Select authors"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  className="rounded-md"
                >
                  {authors.map((author) => (
                    <Select.Option
                      key={author.id}
                      value={author.id}
                      label={author.name}
                    >
                      {author.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="categories"
                label="Categories"
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
                  placeholder="Select categories"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  className="rounded-md"
                >
                  {categories.map((category) => (
                    <Select.Option
                      key={category.id}
                      value={category.id}
                      label={category.name}
                    >
                      {category.name}
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
              Update Book
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
