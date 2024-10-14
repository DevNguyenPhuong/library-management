import React, { createContext, useContext, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const TableContext = createContext(undefined);

function useTableContext() {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
}

function Table({
  columns,
  data,
  onPageChange,
  onSearch,
  currentPage,
  totalPages,
  children,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const contextValue = {
    data,
    currentPage,
    totalPages,
    onPageChange,
  };

  return (
    <TableContext.Provider value={contextValue}>
      <div className="w-full space-y-4">
        <form onSubmit={handleSearch} className="flex space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
        <div className={`grid items-center ${columns} gap-4`}>{children}</div>
      </div>
    </TableContext.Provider>
  );
}

function TableHeader({ children }) {
  return (
    <header className="contents font-semibold text-sm uppercase text-gray-600 bg-gray-50">
      {children}
    </header>
  );
}

function TableBody({ render }) {
  const { data } = useTableContext();

  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={index}>{render(item)}</React.Fragment>
      ))}
    </>
  );
}

function TableFooter({ children }) {
  return <footer className="mt-4 col-span-full">{children}</footer>;
}

function Pagination() {
  const { currentPage, totalPages, onPageChange } = useTableContext();

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Pagination = Pagination;

export default Table;
