import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip, Popconfirm } from "antd";
import React from "react";

const categoriesCols = (handleEdit, handleDelete) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20% ",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "80%",
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
                  onClick={() => handleEdit(record.key)}
                />
              </Tooltip>
              {/* <Tooltip title="Delete">
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record.key)}
                />
              </Tooltip> */}
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
                onConfirm={()=>handleDelete(record.key)}
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
};

export default categoriesCols;
