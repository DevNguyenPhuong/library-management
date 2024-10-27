import { LoadingOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Result, Spin, Table, Form, Modal, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllData, deleteData, updateData } from "../../services/apiLibrary";
import { PATRON_PAGE_SIZE } from "../../utils/constants";
import { preparePublishersTableData } from "../Table/tableUtils";
import publishersCols from "./publishersCols";
import { toast } from "react-hot-toast";
import { useState } from "react";

const PublishersTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm();
  const { TextArea } = Input
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const {
    data: samples,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllData(`/publishers`),
    queryKey: ["publishers"],
    select: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
  });

  const{mutate:updatePublisher, isPending}=useMutation({
    mutationFn:(publisher)=>updateData(`/publishers/${publisher.id}`,publisher),

    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:[`publishers`]
      });
      toast.success('Update Success')
    },

    onError:(error)=>{
      const {respone}=error
      toast.error(respone?.data.message||"Opps, cannot perform this action")
    }
  })

  const { mutate: deletePublisher } = useMutation({
    mutationFn: (id) => deleteData(`/publishers/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`publishers`],
      });
      toast.success("Delete Success")
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

  const handleEdit = (publisher) => {
    form.setFieldsValue({...publisher});
    setIsModalVisible(true);
  };

  const onSubmit = ()=>{
    form.validateFields().then((values)=>{
      updatePublisher({
        ...values
      })
      setIsModalVisible(false)
    })
  }

  const handleCancel = ()=>{
    setIsModalVisible(false)
  }

  const handleDelete = (id) => {
    deletePublisher(id);
  };

  const columns = publishersCols(handleEdit, handleDelete);
  const emptyRowsCount = Math.max(
    0,
    PATRON_PAGE_SIZE - (samples?.length % PATRON_PAGE_SIZE)
  );

  const dataWithEmptyRows = preparePublishersTableData(samples, emptyRowsCount);
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
        title="Update Publisher"
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
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <TextArea
              placeholder="Tell somethings about this publisher"
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

export default PublishersTable;
