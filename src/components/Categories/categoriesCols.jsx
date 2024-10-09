import React from 'react'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { getColumnSearchProps } from "../Table/searchUtils";

const categoriesCols = (
    searchInput,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    handleDetail,
    handleDelete) => {
    return (
        [
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                width: "30% ",
                ...getColumnSearchProps(
                    "name",
                    searchInput,
                    searchText,
                    setSearchText,
                    searchedColumn,
                    setSearchedColumn
                ),
            },
            {
                title: "Description",
                dataIndex: "description",
                key: "description",
                width: "55%",
                ...getColumnSearchProps(
                    "description",
                    searchInput,
                    searchText,
                    setSearchText,
                    searchedColumn,
                    setSearchedColumn
                ),
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
        ]
    )

}

export default categoriesCols