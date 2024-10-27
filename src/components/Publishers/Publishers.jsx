import { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import PublishersTable from "./PublishersTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createData } from "../../services/apiLibrary";
import toast from "react-hot-toast";

function Publishers() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false)
  const queryClient = useQueryClient();
  const { TextArea } = Input

  const { mutate, isPending } = useMutation({
    mutationFn: (publisher) => createData(`/publishers`, publisher),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`publishers`]
      })
      toast.success('Add Success')
      form.resetFields();
    },

    onError: (error) => {
      const { respone } = error
      toast.error(respone?.data.message || "Opps, cannot perform this action")
      form.resetFields();
    }

  })

  const onSubmit=()=>{
    form.validateFields().then((values)=>{
      mutate({
        ...values
      })
      setIsModalVisible(false)
    })
  }

  const handleCancel=()=>{
    form.resetFields()
    setIsModalVisible(false)
  }

  return (
    <div>
      <Button className="mb-4" type="primary" icon={<HiPlus />} onClick={() => setIsModalVisible(true)}>
        New Publisher
      </Button>
      <PublishersTable />
      <Modal
        title="Add New Category"
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
        </Form>
      </Modal>
    </div>
  )
}

export default Publishers;
