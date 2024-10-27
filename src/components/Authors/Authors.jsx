import { Button, Modal, Form, Input } from "antd";
import AuthorsTable from "./AuthorsTable";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createData } from "../../services/apiLibrary";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Authors() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false)
  const queryClient = useQueryClient();
  const { TextArea } = Input

  const {mutate,isPending}=useMutation({
    mutationFn:(author)=>createData(`/authors`,author),

    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:[`authors`]
      })
      toast.success('Add Success')
      form.resetFields()
    },

    onError:(error)=>{
      const {respone}=error;
      toast.error(respone?.data.message||'Opps, cannot perform this action')
      form.resetFields();
    }
  })

  const onSubmit= ()=>{
    form.validateFields().then((values)=>{
      mutate({
        ...values
      })
      setIsModalVisible(false)
    })
  }

  const handleCancel= ()=>{
    setIsModalVisible(false)
  }
  return (
    <div>
      <Button className="mb-4" type="primary" icon={<HiPlus />} onClick={() => setIsModalVisible(true)}>
        New Author
      </Button>
      <AuthorsTable />
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
        </Form>
      </Modal>
    </div>
  )
}

export default Authors;
