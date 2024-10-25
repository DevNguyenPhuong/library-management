import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { deleteData, getAllData } from "../../services/apiLibrary";
import { PATRON_PAGE_SIZE } from "../../utils/constants";
import { ReusableDataTable } from "../UI/Table/ReuseableDataTable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


function BookCopiesTable() {
  const { bookId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Status", accessor: "status" },
    { header: "Actions", accessor: "actions" },
  ];

  const { mutate: deleteBookCopied } = useMutation({
    mutationFn: (id) => deleteData(`/book-copies/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`book-copies`],
      });
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const handleDetail = (id) => {
    // navigate(`/book-copies/${id}`);
  };

  const handleDelete = (id) => {
    deleteBookCopied(id);
  };

  const renderRow = (bookCopied, columns) => (
    <tr key={bookCopied.id}>
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
                  disabled={bookCopied.status!=='AVAILABLE'}
                  onClick={() => handleDetail(bookCopied.id)}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(bookCopied.id)}
                />
              </Tooltip>
            </Space>
          )}
          {!["actions"].includes(column.accessor) && bookCopied[column.accessor]}
        </td>
      ))}
    </tr>
  );

  return (
    <ReusableDataTable
      queryFn={({ page, size, query }) =>
        getAllData(
          `/books/${bookId}/copies?page=${page}&size=${PATRON_PAGE_SIZE}&query=${query}`
        )
      }
      searchPlaceHolder={"Search by name or id..."}
      queryKey={["book-copies"]}
      columns={columns}
      renderRow={renderRow}
      pageSize={PATRON_PAGE_SIZE}
    />
  );
}

export default BookCopiesTable;
