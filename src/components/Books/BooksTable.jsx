import { Button, Space, Tooltip } from "antd";
import { getAllData } from "../../services/apiLibrary";
import { BOOK_PAGE_SIZE } from "../../utils/constants";
import { ReusableDataTable } from "../UI/Table/ReuseableDataTable";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function BooksTable() {
  const navigate = useNavigate();
  const columns = [
    { header: "Image", accessor: "image" },
    { header: "Title", accessor: "title" },
    { header: "Author(s)", accessor: "authors" },
    { header: "Price(VNĐ)", accessor: "price" },
    { header: "Publisher", accessor: "publisher" },
    { header: "Categories", accessor: "categories" },
    { header: "Actions", accessor: "actions" },
  ];

  const handleDetail = (id) => {
    navigate(`/books/${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Book ID: ${id}`);
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
                "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/451_do_f/2021_05_11_16_51_55_1-390x510.jpg"
              }
              alt={book.title}
              className="w-12 h-16 object-cover"
            />
          )}
          {column.accessor === "authors" && (
            <span>{book.authors.map((author) => author.name).join(", ")}</span>
          )}
          {column.accessor === "publisher" && (
            <span>{book.publisher.name}</span>
          )}
          {column.accessor === "categories" && (
            <span>
              {book.categories.map((category) => category.name).join(", ")}
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
              <Tooltip title="Delete">
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(book.id)}
                />
              </Tooltip>
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
