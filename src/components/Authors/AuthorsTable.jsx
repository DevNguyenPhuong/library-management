import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal, Result, Spin, Table } from "antd";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { deleteData, getAllData, updateData } from "../../services/apiLibrary";
import { MED_PAGE_SIZE } from "../../utils/constants";
import { AuthorsTableColumns } from "./AuthorsTableColumns";

const AuthorsTable = () => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, error } = useQuery({
    queryFn: () => getAllData(`/authors`),
    queryKey: ["authors"],
  });

  const { mutate: updateAuthor, isPendingUpdate } = useMutation({
    mutationFn: (author) => updateData(`/authors/${author.id}`, author),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`authors`],
      });
      toast.success("Update Success");
    },

    onError: (error) => {
      const { respone } = error;
      toast.error(respone?.data.message || "Opps, cannot perform this action");
    },
  });

  const { mutate: deleteAuthor, isPending: isPendingDelete } = useMutation({
    mutationFn: (id) => deleteData(`/authors/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`authors`],
      });
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

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

  const onSubmit = () => {
    form.validateFields().then((values) => {
      updateAuthor({
        ...values,
      });
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (author) => {
    form.setFieldsValue({
      ...author,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    deleteAuthor(id);
  };

  const columns = AuthorsTableColumns({
    handleDelete,
    handleEdit,
    isLoading: isPendingDelete || isPendingUpdate,
  });

  return (
    <>
      <div className="mb-4 flex items-center">
        <Input
          placeholder="Search by name"
          prefix={<SearchOutlined className="text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full max-w-md mr-4"
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{
          pageSize: MED_PAGE_SIZE,
        }}
        className="shadow-sm"
      />
      <Modal
        title="Update Author"
        open={isModalVisible}
        onOk={onSubmit}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            name="biography"
            label="Biography"
            rules={[{ required: true }]}
          >
            <TextArea
              placeholder="Tell somethings about this author"
              showCount
              maxLength={400}
              disabled={isPendingUpdate}
              rows={5}
            />
          </Form.Item>
          <Form.Item name="id"></Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AuthorsTable;
