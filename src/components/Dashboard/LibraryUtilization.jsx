import React from "react";
import { Card, Row, Col, Statistic, Progress } from "antd";
import { bookStats } from "../../data/fakeData";

const LibraryUtilization = () => (
  <Card title="Library Utilization" hoverable>
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
        <Statistic
          title="Books in Circulation"
          value={bookStats.borrowedBooks}
          suffix={`/ ${bookStats.totalBooks}`}
        />
        <Progress
          percent={(
            (bookStats.borrowedBooks / bookStats.totalBooks) *
            100
          ).toFixed(2)}
          strokeColor="#4ECDC4"
        />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Statistic
          title="Overdue Rate"
          value={bookStats.overdueBooks}
          suffix={`/ ${bookStats.borrowedBooks}`}
        />
        <Progress
          percent={(
            (bookStats.overdueBooks / bookStats.borrowedBooks) *
            100
          ).toFixed(2)}
          strokeColor="#45B7D1"
        />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Statistic
          title="Member Engagement"
          value={bookStats.activeMembers}
          suffix="/ 1000"
        />
        <Progress
          percent={((bookStats.activeMembers / 1000) * 100).toFixed(2)}
          strokeColor="#FFA07A"
        />
      </Col>
    </Row>
  </Card>
);

export default LibraryUtilization;
