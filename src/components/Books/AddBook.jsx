import { BookOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Result,
  Row,
  Select,
  Spin,
  Upload,
} from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { createData, getAllData } from "../../services/apiLibrary";
import { getBase64 } from "../../utils/helpers";

export default function AddBook() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    const lastFile = newFileList.slice(-1); // Keep only the last file
    setFileList(lastFile);
  };

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
    mutationFn: ({ formData }) => createData("/books", formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`books`],
      });
      toast.success("Add Success");
      form.resetFields();
      setFileList([]);
      navigate("/librarian/books");
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  if (isLoadingAuthors || isLoadingCategories || isLoadingPublishers) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (errorAuthors || errorCategories || errorPublishers) {
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
    publishers?.length === 0
  ) {
    return (
      <Result
        status="error"
        title="Failed to load form data"
        subTitle="Please try again later or contact support if the problem persists."
      />
    );
  }

  const onFinish = (values) => {
    const formData = new FormData();
    const imageFile = fileList[0]?.originFileObj;

    // Convert book data to JSON string and append as 'book' part

    formData.append(
      "book",
      new Blob([JSON.stringify(values)], { type: "application/json" })
    );

    // Append image if exists
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // For debugging - log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    mutate({ formData });
  };
  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-wrap items-center w-full">
          <Button
            type="primary"
            icon={<HiArrowLeft />}
            onClick={() => navigate("/librarian/books")}
          >
            Back
          </Button>

          <h2 className=" w-full flex justify-center items-center text-2xl font-semibold">
            <BookOutlined className="mr-2" />
            Create Book Information
          </h2>
        </div>
        <Form
          form={form}
          name="book-create"
          onFinish={onFinish}
          layout="vertical"
          className="p-6"
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

          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Form.Item name="image" label="Book Image">
                <Upload
                  disabled={isPending}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  {fileList.length === 0 && ( // Only show upload button when no files
                    <button className="bg-none border-0" type="button">
                      <PlusOutlined />
                      <div className="mt-2">Upload</div>
                    </button>
                  )}
                </Upload>

                {previewImage && (
                  <Image
                    className="hidden"
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
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
              Create Book
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
