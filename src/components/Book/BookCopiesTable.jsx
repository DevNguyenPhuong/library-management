import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button, Space, Tooltip, Form, Modal, Select
} from "antd";
import { deleteData, getAllData, updateData } from "../../services/apiLibrary";
import { PATRON_PAGE_SIZE } from "../../utils/constants";
import { ReusableDataTable } from "../UI/Table/ReuseableDataTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


function BookCopiesTable() {
  const { bookId } = useParams();
  const { Option } = Select;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updateBookCopies, isPending } = useMutation({
    mutationFn: (data) => updateData(`/book-copies/${data.id}`, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`book-copies`],
      });
      toast.success("Update Success");
      setIsModalVisible(false);
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const onSubmit = () => {
    form.validateFields().then((values) => {
      updateBookCopies({
        ...values
      });
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Status", accessor: "status" },
    { header: "Actions", accessor: "actions" },
  ];

  const { mutate: deleteBookCopied } = useMutation({
    mutationFn: (id) => deleteData(`/book-copies/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`book-copies`],
      });
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });



  const handleDetail = (data) => {
    form.setFieldsValue({
      ...data,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    deleteBookCopied(id);
  };

  const renderRow = (bookCopied, columns) => (
    <tr key={bookCopied.id}>
      {columns.map((column) => (
        <td
          key={column.accessor}
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
        >
          {column.accessor === "actions" && (
            <Space size="middle">
              <Tooltip title="Edit">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  disabled={bookCopied.status === 'CHECKOUT'}
                  onClick={() => handleDetail(bookCopied)}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(bookCopied.id)}
                />
              </Tooltip>
            </Space>
          )}
          {!["actions"].includes(column.accessor) && bookCopied[column.accessor]}
        </td>
      ))}
    </tr>
  );

  return (
    <>
      <ReusableDataTable
        queryFn={({ page, size, query }) =>
          getAllData(
            `/books/${bookId}/copies?page=${page}&size=${PATRON_PAGE_SIZE}&query=${query}`
          )
        }
        searchPlaceHolder={"Search by name or id..."}
        queryKey={["book-copies"]}
        columns={columns}
        renderRow={renderRow}
        pageSize={PATRON_PAGE_SIZE}
      />
      <Modal
        title="Update Book Copied"
        open={isModalVisible}
        onOk={onSubmit}
        onCancel={handleCancel}
      >
        <Form layout="horizontal" form={form}>
          <Form.Item
            name="id"
          >
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true }]}
          >
            <Select
              disabled={isPending}
              className="border border-gray-300 rounded-md"
            >
              <Option value="AVAILABLE">Available</Option>
              <Option value="REPAIRING">Reparing</Option>
              <Option value="LOST">Lost</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>


  );
}

export default BookCopiesTable;
