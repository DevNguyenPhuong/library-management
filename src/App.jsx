import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddBook from "./components/Books/AddBook.jsx";
import AddPatron from "./components/Patron/AddPatron.jsx";
import AppLayout from "./components/UI/AppLayout";
import ProtectedRoute from "./components/UI/ProtectedRoute.jsx";
import AddUser from "./components/Users/AddUser.jsx";
import EditUser from "./components/Users/EditUser.jsx";
import AuthorsPage from "./pages/AuthorsPage.jsx";
import BookPage from "./pages/BookPage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PageNotFound from "./pages/PageNotFound";
import PatronPage from "./pages/PatronPage.jsx";
import PatronsPage from "./pages/PatronsPage.jsx";
import PublishersPage from "./pages/PublishersPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const andConfig = {
  components: {
    Table: {
      headerColor: "rgb(67, 56, 202)",
    },
  },
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ConfigProvider theme={andConfig}>
        <BrowserRouter>
          <Routes>
            <Route
              path="librarian"
              element={
                <ProtectedRoute requiredRoles={"LIBRARIAN"}>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="patrons" />} />

              <Route path="patrons" element={<PatronsPage />} />
              <Route path="patrons/:patronID" element={<PatronPage />} />
              <Route path="addPatron" element={<AddPatron />} />

              <Route path="books" element={<BooksPage />} />
              <Route path="addBook" element={<AddBook />} />
              <Route path="books/:bookId" element={<BookPage />} />

              <Route path="authors" element={<AuthorsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="publishers" element={<PublishersPage />} />
            </Route>

            <Route
              path="admin"
              element={
                <ProtectedRoute requiredRoles={"ADMIN"}>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="users/:userId" element={<EditUser />} />
              <Route path="addUser" element={<AddUser />} />
            </Route>

            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#eff6ff",
            color: "#1d4ed8",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
