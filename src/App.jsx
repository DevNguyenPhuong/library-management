import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/UI/AppLayout";
import AuthorsPage from "./pages/AuthorsPage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PageNotFound from "./pages/PageNotFound";
import PatronsPage from "./pages/PatronsPage.jsx";
import RolesPage from "./pages/RolesPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import PatronPage from "./pages/PatronPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import PublishersPage from "./pages/PublishersPage.jsx";
import ProtectedRoute from "./components/UI/ProtectedRoute.jsx";
import AddCategories from "./components/Categories/AddCategories.jsx";
import EditCategory from "./components/Categories/EditCategory.jsx";
import AddAthors from "./components/Authors/AddAthors.jsx";
import EditAuthor from "./components/Authors/EditAuthor.jsx";
import AddPublisher from "./components/Publishers/AddPublisher.jsx";
import EditPublisher from "./components/Publishers/EditPublisher.jsx";
import AddBook from './components/Books/AddBook.jsx'
import AddPatron from "./components/Patron/AddPatron.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ConfigProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="patrons" element={<PatronsPage />} />
              <Route path="patrons/:patronID" element={<PatronPage />} />
              <Route path="books" element={<BooksPage />} />
              <Route path="addBook" element={<AddBook />} />
              <Route path="authors" element={<AuthorsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="publishers" element={<PublishersPage />} />
              <Route path="roles" element={<RolesPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="addCategories" element={<AddCategories />} />
              <Route path="categories/:categoryID" element={<EditCategory />} />
              <Route path="addAuthor" element={<AddAthors />} />
              <Route path="authors/:authorID" element={<EditAuthor />} />
              <Route path="addPublisher" element={<AddPublisher />} />
              <Route
                path="publishers/:publisherID"
                element={<EditPublisher />}
              />
              <Route path="addPatron" element={<AddPatron />} />
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
