import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Alert, Button, Input, Spin, Table, Tag, Tooltip } from "antd";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllData } from "../../services/apiLibrary";

export default function PatronLoanTable() {
  const { patronID } = useParams();
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, error } = useQuery({
    queryFn: () => getAllData(`/patrons/${patronID}/loans`),
    queryKey: ["loans", patronID],
  });

  const columns = [
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
      render: (status) => (
        <Tag color={status === "BORROWED" ? "blue" : "green"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              className="text-blue-500 hover:text-blue-600"
              onClick={() => console.log("Edit", record.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (item) =>
        item.bookCopy.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.patron.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-24">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="There was an error loading the data. Please try again later."
        type="error"
        showIcon
      />
    );
  }

  return (
    <>
      <div className="mb-4">
        <Input
          placeholder="Search by book title or patron name"
          prefix={<SearchOutlined className="text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full max-w-md"
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{
          pageSize: 5,
        }}
        className="shadow-sm"
      />
    </>
  );
}
