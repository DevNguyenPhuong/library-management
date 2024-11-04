import { DeleteOutlined, DollarOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tag, Tooltip } from "antd";
import { format } from "date-fns";
import { formatAmount, getPaymentStatusColor } from "../../utils/helpers";

export const getFineTableColumns = ({ deleteFine, updateFine, isLoading }) => [
  {
    title: "#",
    key: "id",
    render: (_, __, index) => index + 1,
    width: 70,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (amount) => (
      <span className="font-medium">{formatAmount(amount)}</span>
    ),
  },
  {
    title: "Loan",
    dataIndex: "loan",
    key: "loan",
    render: (loan) => <span className="font-medium">{loan?.id}</span>,
  },
  {
    title: "Issue Date",
    dataIndex: "issueDate",
    key: "issueDate",
    render: (date) => (date ? format(new Date(date), "MMM dd, yyyy") : "-"),
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
    render: (status) => (
      <Tag color={getPaymentStatusColor(status)}>
        {status?.replace("_", " ")}
      </Tag>
    ),
  },
  {
    title: "Payment Date",
    dataIndex: "paymentDate",
    key: "paymentDate",
    render: (date) => (date ? format(new Date(date), "MMM dd, yyyy") : "-"),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="flex space-x-2">
        {record?.paymentStatus === "UNPAID" && (
          <Popconfirm
            title="Pay this Fine"
            description="Are you sure you want pay this fine?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              updateFine({
                fineId: record?.id,
                updatedFine: {
                  amount: record.amount,
                  reason: record.reason,
                  patronId: record.loan.patron.id,
                  paymentStatus: "PAID",
                  issueDate: record.issueDate,
                  paymentDate: format(new Date(), "yyyy-MM-dd"),
                  loanId: record.loan.id,
                },
              });
            }}
          >
            <Tooltip placement="bottom" title="Pay">
              <Button disabled={isLoading} icon={<DollarOutlined />} />
            </Tooltip>
          </Popconfirm>
        )}

        <Popconfirm
          title="Pay this Fine"
          description="Are you sure you want delete this fine?"
          onConfirm={() => deleteFine(record?.id)}
          okText="Yes"
          cancelText="No"
        >
          <Tooltip placement="bottom" title="Delete">
            <Button
              disabled={isLoading}
              icon={<DeleteOutlined />}
              className="text-red-500 hover:text-red-600"
              aria-label="Delete fine"
            />
          </Tooltip>
        </Popconfirm>
      </div>
    ),
  },
];
