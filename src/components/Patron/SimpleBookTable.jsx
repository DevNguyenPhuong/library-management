import { EyeFilled } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { useState } from "react";
import { getAllData } from "../../services/apiLibrary";
import { SIMPLE_BOOK_PAGE_SIZE } from "../../utils/constants";
import { ReusableDataTable } from "../UI/Table/ReuseableDataTable";
import AvailableCopiesModal from "./AvailableCopiesModal";

export default function SimpleBookTable({ setBookCopyId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Author(s)", accessor: "authors" },
    { header: "Action", accessor: "actions" },
  ];

  function handleOpenModal(selectedBook) {
    setSelectedBook(selectedBook);
    setIsModalVisible(true);
  }

  const renderRow = (book, columns) => (
    <tr key={book.id}>
      {columns.map((column) => (
        <td
          key={column.accessor}
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
        >
          {column.accessor === "authors" && (
            <span>{book.authors.map((author) => author.name).join(", ")}</span>
          )}

          {column.accessor === "actions" && (
            <Space size="middle">
              <Tooltip title="Details">
                <Button
                  type="primary"
                  icon={<EyeFilled />}
                  onClick={() => handleOpenModal(book)}
                />
              </Tooltip>
            </Space>
          )}
          {!["authors", "actions"].includes(column.accessor) &&
            book[column.accessor]}
        </td>
      ))}
    </tr>
  );

  return (
    <>
      <ReusableDataTable
        queryFn={({ page, query }) =>
          getAllData(
            `/books?page=${page}&size=${SIMPLE_BOOK_PAGE_SIZE}&query=${query}`
          )
        }
        searchPlaceHolder={"Search by title or author..."}
        queryKey={["books"]}
        columns={columns}
        renderRow={renderRow}
        pageSize={SIMPLE_BOOK_PAGE_SIZE}
      />
      <AvailableCopiesModal
        book={selectedBook}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSetBookCopyId={setBookCopyId}
      />
    </>
  );
}
