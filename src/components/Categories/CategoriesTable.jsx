import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Result, Spin, Table, Form, Modal, Input } from "antd";
import { getAllData, deleteData, updateData } from "../../services/apiLibrary";
import { PAGE_SIZE } from "../../utils/constants";
import { prepareCategoriesTableData } from "../Table/tableUtils";
import categoriesCols from "./categoriesCols";
import { toast } from "react-hot-toast";

const CategoriesTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const queryClient = useQueryClient();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllData(`/categories`),
    queryKey: ["categories"],
    select: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
  });

  const { mutate: updateCategory, isPending } = useMutation({
    mutationFn: (category) => {
      updateData(`/categories/${category.id}`, category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`categories`],
      });
      toast.success("Update Success");
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const { mutate: deleteCategory } = useMutation({
    mutationFn: (id) => deleteData(`/categories/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`categories`],
      });
      toast.success("Delete Success");
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const onSubmit = () => {
    form.validateFields().then((values) => {
      updateCategory({
        ...values,
      });
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (error) {
    return (
      <Result
        status="error"
        title="Error"
        subTitle="Sorry, there was an error loading the sample data."
      />
    );
  }

  const handleEdit = (category) => {
    form.setFieldsValue({
      ...category,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    deleteCategory(id);
  };

  const columns = categoriesCols(handleEdit, handleDelete);
  const emptyRowsCount = Math.max(
    0,
    PAGE_SIZE - (categories?.length % PAGE_SIZE)
  );

  const dataWithEmptyRows = prepareCategoriesTableData(
    categories,
    emptyRowsCount
  );
  return (
    <>
      <Table
        className="shadow-lg rounded-lg"
        columns={columns}
        dataSource={
          categories?.length === 0
            ? []
            : categories?.length % PAGE_SIZE === 0
            ? categories
            : dataWithEmptyRows
        }
        rowKey="id"
        pagination={{
          pageSize: PAGE_SIZE,
        }}
        bordered
        borderColor="#ffff00"
      />
      <Modal
        title="Update Category"
        open={isModalVisible}
        onOk={onSubmit}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <TextArea
              placeholder="Tell somethings about this category"
              showCount
              maxLength={400}
              disabled={isPending}
              rows={5}
            />
          </Form.Item>
          <Form.Item name="id"></Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoriesTable;
