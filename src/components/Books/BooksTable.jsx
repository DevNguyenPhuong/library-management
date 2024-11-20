import { Button, Popconfirm, Space, Tooltip } from "antd";
import { getAllData, deleteData } from "../../services/apiLibrary";
import { BOOK_PAGE_SIZE } from "../../utils/constants";
import { ReusableDataTable } from "../UI/Table/ReuseableDataTable";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import bookImgPlaceHolder from "../../assets/book.png";
import { getImageName } from "../../utils/helpers";

export default function BooksTable() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const columns = [
    { header: "Image", accessor: "image" },
    { header: "Title", accessor: "title" },
    { header: "Author(s)", accessor: "authors" },
    { header: "Price(VNĐ)", accessor: "price" },
    { header: "Publisher", accessor: "publisher" },
    { header: "Categories", accessor: "categories" },
    { header: "Actions", accessor: "actions" },
  ];

  const { mutate: deleteBook } = useMutation({
    mutationFn: (id) => deleteData(`/books/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`books`],
      });
    },

    onError: (error) => {
      const { response } = error;
      toast.error(response?.data.message || "Opps, cannot perform this action");
    },
  });

  const handleDetail = (id) => {
    navigate(`/librarian/books/${id}`);
  };

  const handleDelete = (id) => {
    deleteBook(id);
  };

  const renderRow = (book, columns) => (
    <tr key={book.id}>
      {columns.map((column) => (
        <td
          key={column.accessor}
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
        >
          {column.accessor === "image" && (
            <img
              src={
                getImageName(book?.imageUrl) !== ""
                  ? book?.imageUrl
                  : bookImgPlaceHolder
              }
              alt={book.title}
              className="w-12 h-16 object-cover"
            />
          )}
          {column.accessor === "authors" && (
            <span>
              {book?.authors?.map((author) => author.name).join(", ")}
            </span>
          )}
          {column.accessor === "publisher" && (
            <span>{book?.publisher?.name}</span>
          )}
          {column.accessor === "categories" && (
            <span>
              {book?.categories?.map((category) => category.name).join(", ")}
            </span>
          )}
          {column.accessor === "price" && (
            <span>
              {book.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          )}
          {column.accessor === "actions" && (
            <Space size="middle">
              <Tooltip title="Details">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleDetail(book.id)}
                />
              </Tooltip>

              <Popconfirm
                title="Delete this book"
                description="Are you sure you want delete this book?"
                onConfirm={() => handleDelete(book.id)}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip placement="bottom" title="Delete">
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    aria-label="Delete copy"
                  />
                </Tooltip>
              </Popconfirm>
            </Space>
          )}
          {![
            "image",
            "authors",
            "publisher",
            "categories",
            "price",
            "actions",
          ].includes(column.accessor) && book[column.accessor]}
        </td>
      ))}
    </tr>
  );

  return (
    <ReusableDataTable
      queryFn={({ page, size, query }) =>
        getAllData(`/books?page=${page}&size=${BOOK_PAGE_SIZE}&query=${query}`)
      }
      searchPlaceHolder={"Search by title or author..."}
      queryKey={["books"]}
      columns={columns}
      renderRow={renderRow}
      pageSize={BOOK_PAGE_SIZE}
    />
  );
}
