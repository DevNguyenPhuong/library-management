import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { getAllData } from "../../services/apiLibrary";
import { PATRON_PAGE_SIZE } from "../../utils/constants";
import { ReusableDataTable } from "../UI/Table/ReuseableDataTable";

export default function BooksTable() {
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Phone", accessor: "phone" },
    { header: "Gender", accessor: "gender" },
    { header: "Status", accessor: "status" },
    { header: "Currently borrowed", accessor: "currentlyBorrowed" },
    { header: "Membership Date", accessor: "membershipDate" },
    { header: "Actions", accessor: "actions" },
  ];

  const handleDetail = (id) => {
    console.log(`Patron ID: ${id}`);
    // You can add more complex logic here, such as opening a modal or navigating to a detail page
  };

  const handleDelete = (id) => {
    console.log(`Patron ID: ${id}`);
  };

  const renderRow = (patron, columns) => (
    <tr key={patron.id}>
      {columns.map((column) => (
        <td
          key={column.accessor}
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
        >
          {column.accessor === "actions" && (
            <Space size="middle">
              <Tooltip title="Edit">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleDetail(patron.id)}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(patron.id)}
                />
              </Tooltip>
            </Space>
          )}
          {!["actions"].includes(column.accessor) && patron[column.accessor]}
        </td>
      ))}
    </tr>
  );

  return (
    <ReusableDataTable
      queryFn={({ page, size, query }) =>
        getAllData(
          `/patrons?page=${page}&size=${PATRON_PAGE_SIZE}&query=${query}`
        )
      }
      searchPlaceHolder={"Search by name or id..."}
      queryKey={["patrons"]}
      columns={columns}
      renderRow={renderRow}
      pageSize={PATRON_PAGE_SIZE}
    />
  );
}
