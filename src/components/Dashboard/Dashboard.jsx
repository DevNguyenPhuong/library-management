import {
  BookOutlined,
  ClockCircleOutlined,
  LoadingOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Col, Layout, Result, Row, Spin } from "antd";
import React from "react";
import { fakeLoanData } from "../../data/fakeData";
import { getAllData } from "../../services/apiLibrary";
import BookCategoriesChart from "./BookCategoriesChart";
import LibraryUtilization from "./LibraryUtilization";
import MonthlyBookActivityChart from "./MonthlyBookActivityChart";
import StatCard from "./StatCard";

const { Content } = Layout;

export default function Dashboard() {
  const {
    data: totalBooks,
    isLoading: isLoadingBookCopies,
    error: errorBookCopies,
  } = useQuery({
    queryFn: () => getAllData("/book-copies"),
    queryKey: ["book-copies"],
  });

  const {
    data: patrons,
    isLoading: isLoadingPatrons,
    error: errorPatrons,
  } = useQuery({
    queryFn: () => getAllData("/patrons"),
    queryKey: ["patrons"],
  });

  if (isLoadingBookCopies || isLoadingPatrons) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (errorBookCopies || errorPatrons) {
    return (
      <Result
        status="error"
        title="Error"
        subTitle="Sorry, there was an error loading the sample data."
      />
    );
  }

  const borrowedBooks = fakeLoanData.filter((book) => {
    return book.status === "borrowed";
  });

  const activePatrons = patrons.content.filter((patron) => {
    return patron.status === "ACTIVE";
  });

  const overdueBooks = fakeLoanData.filter((book) => {
    return book.status === "overdue";
  });
  return (
    <Layout className="min-h-screen bg-zinc-200">
      <Content className="p-6">
        <h1 className="text-3xl font-semibold mb-12 text-center !text-indigo-500">
          Library Statistics Dashboard
        </h1>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Total Books"
              value={totalBooks?.length === 0 ? 0 : totalBooks.length}
              icon={<BookOutlined />}
              color="#FF6B6B"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Borrowed Books"
              value={borrowedBooks?.length === 0 ? 0 : borrowedBooks.length}
              icon={<ReadOutlined />}
              color="#4ECDC4"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Overdue Books"
              value={overdueBooks?.length === 0 ? 0 : overdueBooks.length}
              icon={<ClockCircleOutlined />}
              color="#45B7D1"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Active Members"
              value={activePatrons?.length === 0 ? 0 : activePatrons.length}
              icon={<UserOutlined />}
              color="#FFA07A"
            />
          </Col>

          <Col xs={24} lg={12}>
            <BookCategoriesChart />
          </Col>

          <Col xs={24} lg={12}>
            <MonthlyBookActivityChart />
          </Col>

          <Col xs={24}>
            <LibraryUtilization
              totalBooks={totalBooks.length}
              borrowedBooks={borrowedBooks.length}
              overdueBooks={overdueBooks.length}
              activePatrons={activePatrons.length}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}