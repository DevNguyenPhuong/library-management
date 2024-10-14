import { useState, useEffect } from "react";
import { HiArrowLeft, HiArrowRight, HiSearch } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { getAllBooks, searchBooks } from "../../services/apiLibrary";
import { useNavigate, useLocation } from "react-router-dom";

export default function BooksTable() {
  const navigate = useNavigate();
  const location = useLocation();
  // Parse URL parameters
  const params = new URLSearchParams(location.search);
  const [page, setPage] = useState(parseInt(params.get("page") || "0"));

  const [search, setSearch] = useState(params.get("search") || "");
  const [isSearching, setIsSearching] = useState(
    params.get("isSearching") === "true"
  );

  const fetchBooks = isSearching ? searchBooks : getAllBooks;

  const {
    data: booksData,
    isLoading,
    error,
  } = useQuery({
    queryFn: () =>
      fetchBooks({
        page,

        ...(isSearching
          ? { query: search }
          : { title: search, author: search }),
      }),
    queryKey: ["books", page, search, isSearching],
  });

  const books = booksData?.result?.content || [];
  const totalPages = booksData?.result?.totalPages || 0;

  // Update URL when state changes
  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page.toString());
    if (search) searchParams.set("search", search);
    searchParams.set("isSearching", isSearching.toString());

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [page, search, isSearching, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    setIsSearching(true);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          placeholder="Search books..."
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

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Title", "Author(s)", "ISBN", "Year", "Genre"].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : books.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  No books found
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {book.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.isbn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.publicationYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {book.genre}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiArrowLeft className="w-5 h-5 mr-2 inline" />
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1 || totalPages === 0}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <HiArrowRight className="w-5 h-5 ml-2 inline" />
        </button>
      </div>
    </div>
  );
}
