import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { getColumnSearchProps } from "../Table/searchUtils";

export const getPatronColumns = (
  searchInput,
  searchText,
  setSearchText,
  searchedColumn,
  setSearchedColumn,
  handleDetail,
  handleDelete
) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "20%",
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
    title: "Date of Birth",
    dataIndex: "dob",
    key: "dob",
    width: "15%",
    ...getColumnSearchProps(
      "dob",
      searchInput,
      searchText,
      setSearchText,
      searchedColumn,
      setSearchedColumn
    ),
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: "10%",
    ...getColumnSearchProps(
      "gender",
      searchInput,
      searchText,
      setSearchText,
      searchedColumn,
      setSearchedColumn
    ),
  },
  {
    title: "Currently Borrowed",
    dataIndex: "currentlyBorrowed",
    key: "currentlyBorrowed",
    width: "15%",
    ...getColumnSearchProps(
      "currentlyBorrowed",
      searchInput,
      searchText,
      setSearchText,
      searchedColumn,
      setSearchedColumn
    ),
  },
  {
    title: "Membership Date",
    dataIndex: "membershipDate",
    key: "membershipDate",
    width: "15%",
    ...getColumnSearchProps(
      "membershipDate",
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
];
