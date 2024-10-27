import { LoadingOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Result, Spin, Table, Form, Modal, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllData, deleteData, updateData } from "../../services/apiLibrary";
import { PATRON_PAGE_SIZE } from "../../utils/constants";
import { prepareAuthorsTableData } from "../Table/tableUtils";
import { toast } from "react-hot-toast";
import authorsCols from "./authorsCols";
import { useState } from "react";
import { values } from "lodash";

const AuthorsTable = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const { TextArea } = Input

  const {
    data: samples,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllData(`/authors`),
    queryKey: ["authors"],
    select: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
  });

  const { mutate: updateAuthor, isPending } = useMutation({
    mutationFn: (author) => updateData(`/authors/${author.id}`, author),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`authors`]
      })
      toast.success('Update Success');
    },

    onError: (error) => {
      const { respone } = error
      toast.error(respone?.data.message || "Opps, cannot perform this action")
    }
  })

  const { mutate: deleteAuthor } = useMutation({
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

  const onSubmit=()=>{
    form.validateFields().then((values)=>{
      updateAuthor({
        ...values
      })
      setIsModalVisible(false)
    })
  }

  const handleCancel=()=>{
    setIsModalVisible(false)
  }

  const handleEdit = (author) => {
    form.setFieldsValue({
      ...author
    })
    setIsModalVisible(true)
  };

  const handleDelete = (id) => {
    deleteAuthor(id);
  };

  const columns = authorsCols(handleEdit, handleDelete);
  const emptyRowsCount = Math.max(
    0,
    PATRON_PAGE_SIZE - (samples?.length % PATRON_PAGE_SIZE)
  );

  const dataWithEmptyRows = prepareAuthorsTableData(samples, emptyRowsCount);
  return (
    <>
      <Table
        className="shadow-lg rounded-lg"
        columns={columns}
        dataSource={samples?.length === 0 ? [] : dataWithEmptyRows}
        pagination={{
          pageSize: PATRON_PAGE_SIZE,
        }}
        bordered
      />
            <Modal
        title="Add New Author"
        open={isModalVisible}
        onOk={onSubmit}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true }]}
          >
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
              disabled={isPending}
              rows={5}
            />
          </Form.Item>
          <Form.Item
            name="id"
          >
          </Form.Item>
        </Form>
      </Modal>
    </>


  );
};

export default AuthorsTable;
