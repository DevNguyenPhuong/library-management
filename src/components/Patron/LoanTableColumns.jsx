import {
  DeleteOutlined,
  DollarOutlined,
  RollbackOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Tag, Tooltip } from "antd";
import { format } from "date-fns";
import { getStatusAndColor } from "../../utils/helpers";

export const getLoanTableColumns = ({
  onUpdate,
  deleteLoan,
  showModal,
  isLoading,
}) => [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Book Title",
    dataIndex: ["bookCopy", "title"],
    key: "title",
  },
  {
    title: "Patron",
    dataIndex: ["patron", "name"],
    key: "patron",
  },
  {
    title: "Loan Date",
    dataIndex: "loanDate",
    key: "loanDate",
    render: (date) => format(new Date(date), "MMM dd, yyyy"),
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    render: (date) => format(new Date(date), "MMM dd, yyyy"),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (date, record) => {
      const { label, color } = getStatusAndColor(record.status, record.dueDate);
      return <Tag color={color}>{label}</Tag>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="flex gap-1 flex-wrap">
        <Popconfirm
          title="Renew Book"
          description={`Renew this for 7 days ?`}
          onConfirm={() => onUpdate(record, "RENEW")}
          okText="Renew"
          cancelText="Cancel"
        >
          <Tooltip placement="bottom" title="Renew">
            <Button
              disabled={isLoading}
              icon={<SyncOutlined />}
              className="text-blue-500 hover:text-blue-600"
              aria-label="Renew book"
            />
          </Tooltip>
        </Popconfirm>

        <Popconfirm
          title="Return Book"
          description={`Return this book ?`}
          onConfirm={() => onUpdate(record, "RETURNED")}
          okText="Return"
          cancelText="Cancel"
        >
          <Tooltip placement="bottom" title="Return">
            <Button
              disabled={isLoading}
              icon={<RollbackOutlined />}
              className="text-green-500 hover:text-green-600"
              aria-label="Return book"
            />
          </Tooltip>
        </Popconfirm>

        <Tooltip placement="bottom" title="Fine">
          <Button
            disabled={isLoading}
            icon={<DollarOutlined />}
            onClick={() => showModal(record)}
          />
        </Tooltip>

        <Popconfirm
          title="Delete Book Record"
          description={`Delete this ? This action cannot be undone.`}
          onConfirm={() => deleteLoan(record.id)}
          okText="Delete"
          okType="danger"
          cancelText="Cancel"
        >
          <Tooltip placement="bottom" title="Delete">
            <Button
              disabled={isLoading}
              icon={<DeleteOutlined />}
              className="text-red-500 hover:text-red-600"
              aria-label="Delete book record"
            />
          </Tooltip>
        </Popconfirm>
      </div>
    ),
  },
];
