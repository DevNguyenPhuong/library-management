import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

export const getLoanColumns = (
  handleDetail,
  handleDelete
) => [
  {
    title: "Patron ID",
    dataIndex: "patronId",
    key: "patronId",
    width: "20%",
  },
  {
    title: "Book ID",
    dataIndex: "bookId",
    key: "bookId",
    width: "15%",
  },
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId",
    width: "10%",
  },
  {
    title: "Fine ID",
    dataIndex: "fineId",
    key: "fineId",
    width: "15%",
  },
  {
    title: "Loan Date",
    dataIndex: "loanD",
    key: "loanD",
    width: "15%",
  },
  {
    title: "Due Date",
    dataIndex: "dueD",
    key: "dueD",
    width: "15%",
  },
  {
    title: "Return Date",
    dataIndex: "returnD",
    key: "returnD",
    width: "15%",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "15%",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="h-10">
        {!record.isEmpty && (
          <Space size="middle">
            <Tooltip title="Edit">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => handleDetail(record.key)}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.key)}
              />
            </Tooltip>
          </Space>
        )}
      </div>
    ),
  },
];
