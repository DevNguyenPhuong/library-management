import { useQuery } from "@tanstack/react-query";
import { Col, Result, Row, Spin } from "antd";
import Title from "antd/es/skeleton/Title";
import { useState } from "react";
import { HiArrowLeft, HiArrowRight, HiSearch } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { getAllData } from "../../services/apiLibrary";
import BookCard from "./BookCard";

function PatronBooks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const query = searchParams.get("query") || "";

  const [search, setSearch] = useState(query);

  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      getAllData(`/books?page=${page - 1}&size=${2}&query=${query}`),
    queryKey: [["books"], page, query],
  });

  if (isLoading)
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Spin size="large"></Spin>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <Result
          status="error"
          title="Error"
          subTitle="Sorry, there was an error loading the data."
        />
      </div>
    );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ page: "1", query: search });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), query });
  };

  const items = data?.content || [];
  const totalPages = data?.totalPages || 0;

  return (
    <>
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          placeholder={"Search..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <HiSearch className="w-5 h-5" />
        </button>
      </form>

      {
        <div style={{ padding: "24px" }}>
          <Title level={2}>Book Library</Title>
          <Row gutter={[16, 16]}>
            {items?.map((book) => (
              <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
                <BookCard {...book} />
              </Col>
            ))}
          </Row>
        </div>
      }

      <div className="flex items-center justify-between">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiArrowLeft className="w-5 h-5 mr-2 inline" />
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages || totalPages === 0}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <HiArrowRight className="w-5 h-5 ml-2 inline" />
        </button>
      </div>
    </>
  );
}

export default PatronBooks;
