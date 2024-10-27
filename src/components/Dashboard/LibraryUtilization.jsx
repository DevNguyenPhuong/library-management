import React from "react";
import { Card, Row, Col, Statistic, Progress } from "antd";
import { bookStats } from "../../data/fakeData";

const LibraryUtilization = ({totalBooks, borrowedBooks, overdueBooks, activePatrons}) => (
  <Card title="Library Utilization" hoverable>
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
        <Statistic
          title="Books in Circulation"
          value={borrowedBooks}
          suffix={`/ ${totalBooks}`}
        />
        <Progress
          percent={(
            (borrowedBooks / totalBooks) *
            100
          ).toFixed(2)}
          strokeColor="#4ECDC4"
        />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Statistic
          title="Overdue Rate"
          value={overdueBooks}
          suffix={`/ ${borrowedBooks}`}
        />
        <Progress
          percent={(
            (overdueBooks / borrowedBooks) *
            100
          ).toFixed(2)}
          strokeColor="#45B7D1"
        />
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Statistic
          title="Member Engagement"
          value={activePatrons}
          suffix="/ 1000"
        />
        <Progress
          percent={((activePatrons / 1000) * 100).toFixed(2)}
          strokeColor="#FFA07A"
        />
      </Col>
    </Row>
  </Card>
);

export default LibraryUtilization;
