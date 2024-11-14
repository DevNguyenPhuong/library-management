import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";

export const PublihserTableColumns = ({
  handleDelete,
  handleEdit,
  isLoading,
}) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 250,
    className: "border-r border-gray-200",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    width: 120,
    className: "border-l border-gray-200 text-center",
    render: (_, record) => (
      <div className="flex justify-center gap-2 flex-wrap">
        <Tooltip placement="bottom" title="Edit">
          <Button
            onClick={() => handleEdit(record)}
            type="primary"
            disabled={isLoading}
            icon={<EditOutlined />}
          />
        </Tooltip>

        <Popconfirm
          title="Delete publisher"
          description={`Delete this ? This action cannot be undone.`}
          onConfirm={() => handleDelete(record.id)}
          okText="Delete"
          okType="danger"
          cancelText="Cancel"
        >
          <Tooltip placement="bottom" title="Delete">
            <Button
              disabled={isLoading}
              icon={<DeleteOutlined />}
              type="primary"
              danger
              className="text-red-500 hover:text-red-600"
              aria-label="Delete book record"
            />
          </Tooltip>
        </Popconfirm>
      </div>
    ),
  },
];
