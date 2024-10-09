import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import React from "react";

const categoriesCols = (handleDetail, handleDelete) => {
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
};

export default categoriesCols;
