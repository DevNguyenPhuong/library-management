import {
  BookOutlined,
  ClockCircleOutlined,
  LoadingOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Col, Layout, Result, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { getAllData } from "../../services/apiLibrary";
import BookCategoriesChart from "./BookCategoriesChart";
import LibraryUtilization from "./LibraryUtilization";
import MonthlyBookActivityChart from "./MonthlyBookActivityChart";
import StatCard from "./StatCard";
import { borrowedBooks } from "../../data/fakeData";

const { Content } = Layout;

export default function Dashboard() {
  const [statusQueryBook, setStatusQueryBook] = useState({
    isLoading: true, error: ''
  })

  const [statusQueryPatron, setStatusQueryPatron] = useState({
    isLoading: true, error: ''
  })

  const { data: totalBooks,
    isLoading: isLoadingBooks,
    error: errorBooks
  } = useQuery({
    queryFn: () => getAllData(`/book-copies`),
    queryKey: [`book-copies`],
  })

  const {
    data: patrons,
    isLoading: isLoadingPatrons,
    error: errorPatrons
  } = useQuery({
    queryFn: () => getAllData(`/patrons`),
    queryKey: ['patrons']
  })

  useEffect(() => {
    setStatusQueryBook({ isLoading: isLoadingBooks, error: errorBooks })

  }, [isLoadingBooks])

  useEffect(() => {
    setStatusQueryPatron({ isLoading: isLoadingPatrons, error: errorPatrons })
  }, [isLoadingPatrons])


  const borrowedBooks = totalBooks?.filter((book) => {
    return book.status === 'BORROWED'
  })

  const overdueBooks = totalBooks?.filter((book) => {
    return book.status === 'OVERDUE'
  })
  const activePatrons = patrons?.content.filter((patron) => {
    return patron.status === 'ACTIVE'
  })

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
              icon={<BookOutlined />}
              color="#FF6B6B"
              status={statusQueryBook}
              value={totalBooks?.length}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Borrowed Books"
              status={statusQueryBook}
              icon={<ReadOutlined />}
              color="#4ECDC4"
              value={borrowedBooks?.length}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Overdue Books"
              status={statusQueryBook}
              icon={<ClockCircleOutlined />}
              color="#45B7D1"
              value={overdueBooks?.length}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Active Members"
              icon={<UserOutlined />}
              color="#FFA07A"
              status={statusQueryPatron}
              value={activePatrons?.length}
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
              totalBooks={totalBooks?.length}
              borrowedBooks={borrowedBooks?.length}
              overdueBooks={overdueBooks?.length}
              activePatrons={activePatrons?.length}
              totalPatrons={patrons?.content.length}
              statusQueryBook={statusQueryBook}
              statusQueryPatron={statusQueryPatron}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}