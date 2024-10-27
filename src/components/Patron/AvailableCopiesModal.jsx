import { useQuery } from "@tanstack/react-query";
import { Modal, Input, List, Spin, Alert, Pagination } from "antd";
import { SearchOutlined, BookOutlined } from "@ant-design/icons";
import { useState } from "react";
import { getAllData } from "../../services/apiLibrary";

function AvailableCopiesModal({ open, onCancel, onSetBookCopyId, book }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const {
    data: bookCopiesResponse,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllData(`/books/${book?.id}/copies?page=0&size=1000`),
    queryKey: ["book-copies", book?.id],
    enabled: !!book?.id && open,
  });

  // Filter copies based on search term
  const filteredCopies =
    bookCopiesResponse?.content?.filter((copy) =>
      copy?.id?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Calculate pagination
  const totalItems = filteredCopies.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCopies = filteredCopies.slice(startIndex, endIndex);

  const handleSetBookCopyId = (id) => {
    if (id) {
      onSetBookCopyId(id);
      onCancel();
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Content to be rendered inside Modal
  const modalContent = () => {
    if (error) {
      return (
        <Alert
          message="Error"
          description={`Error loading book copies: ${error.message}`}
          type="error"
          showIcon
        />
      );
    }

    if (isLoading) {
      return (
        <div
          className="flex justify-center items-center"
          style={{ minHeight: "200px" }}
        >
          <Spin size="large" />
        </div>
      );
    }

    if (!bookCopiesResponse?.content) {
      return (
        <Alert
          message="No Data"
          description="No book copies data available"
          type="warning"
          showIcon
        />
      );
    }

    return (
      <div className="space-y-4">
        <Input
          placeholder="Search by copy ID..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchTerm}
          onChange={handleSearch}
          className="w-full"
        />

        {bookCopiesResponse.content.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No copies available for this book
          </div>
        ) : filteredCopies.length > 0 ? (
          <div className="space-y-4">
            <List
              dataSource={currentCopies}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  onClick={() => handleSetBookCopyId(item.id)}
                >
                  <div className="w-full flex items-center space-x-3 px-4">
                    <BookOutlined className="text-blue-500" />
                    <span className="text-gray-400">ID: {item.id}</span>
                    {item.status && (
                      <span
                        className={`text-sm ${
                          item.status === "AVAILABLE"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        ({item.status})
                      </span>
                    )}
                  </div>
                </List.Item>
              )}
            />

            {/* Only show pagination if there are more items than pageSize */}
            {totalItems > pageSize && (
              <div className="flex justify-center pt-4">
                <Pagination
                  current={currentPage}
                  total={totalItems}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                  }
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No matching copies found
          </div>
        )}
      </div>
    );
  };

  return (
    <Modal
      title={
        book?.title ? `Available copies of "${book.title}"` : "Available Copies"
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      {modalContent()}
    </Modal>
  );
}

export default AvailableCopiesModal;
