import {
  BookOutlined,
  ClockCircleOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Layout, Row } from "antd";
import React from "react";

import { bookStats } from "../../data/fakeData";
import BookCategoriesChart from "./BookCategoriesChart";
import LibraryUtilization from "./LibraryUtilization";
import MonthlyBookActivityChart from "./MonthlyBookActivityChart";
import StatCard from "./StatCard";

const { Content } = Layout;

export default function Dashboard() {
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
              value={bookStats.totalBooks}
              icon={<BookOutlined />}
              color="#FF6B6B"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Borrowed Books"
              value={bookStats.borrowedBooks}
              icon={<ReadOutlined />}
              color="#4ECDC4"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Overdue Books"
              value={bookStats.overdueBooks}
              icon={<ClockCircleOutlined />}
              color="#45B7D1"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Active Members"
              value={bookStats.activeMembers}
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
            <LibraryUtilization />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
