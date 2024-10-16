import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip, Popconfirm } from "antd";
import { getColumnSearchProps } from "../Table/searchUtils";

export const getPatronColumns = (
  handleDetail,
  handleDelete
) => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      wstatusth: "15%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      wstatusth: "20%",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
      wstatusth: "15%",
    },
    {
      title: "Membership Day",
      dataIndex: "membershipDate",
      key: "membershipDate",
      wstatusth: "15%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      wstatusth: "10%",
    },
    {
      title: "Currently Borrowed",
      dataIndex: "currentlyBorrowed",
      key: "currentlyBorrowed",
      wstatusth: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      wstatusth: "15%",

    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="h-10">
          {!record.isEmpty && (
            <Space size="mstatusdle">
              <Tooltip title="Edit">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleDetail(record.key)}
                />
              </Tooltip>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: 'red',
                    }}
                  />
                }
                onConfirm={() => handleDelete(record.key)}
              >
                <Button
                  danger
                  icon={<DeleteOutlined />}
                // onClick={() => handleDelete(record.key)}
                ></Button>
              </Popconfirm>
            </Space>
          )}
        </div>
      ),
    },
  ];
