import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { HiArrowLeft, HiArrowRight, HiSearch } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import CustomTable from "./CustomTable";

export function ReusableDataTable({
  queryFn,
  queryKey,
  columns,
  renderRow,
  pageSize = 10,
  searchPlaceHolder,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const query = searchParams.get("query") || "";

  const [search, setSearch] = useState(query);

  const { data, isLoading, error } = useQuery({
    queryFn: () => queryFn({ page: page - 1, size: pageSize, query }),
    queryKey: [...queryKey, page, query],
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ page: "1", query: search });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), query });
  };

  if (isLoading) return <div>Loading...</div>;

  const items = data?.content || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className="container mx-auto pt-8 space-y-4">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          placeholder={searchPlaceHolder || "Search..."}
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

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error.message}</span>
        </div>
      )}

      <CustomTable columns={columns}>
        <CustomTable.Header>
          {columns.map((column) => column.header)}
        </CustomTable.Header>
        <CustomTable.Body
          data={items}
          render={(item) => renderRow(item, columns)}
        />
      </CustomTable>

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
          Page {page} of {totalPages}
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
    </div>
  );
}
