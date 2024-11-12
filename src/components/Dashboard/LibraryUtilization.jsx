import React from "react";
import { Card, Row, Col, Statistic, Progress, Spin, Result } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LibraryUtilization = ({
  totalBooks,
  borrowedBooks,
  overdueBooks,
  activePatrons,
  totalPatrons,
  statusQueryBook,
  statusQueryPatron,
}) => {
  return (
    <Card title="Library Utilization" hoverable>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          {statusQueryBook?.isLoading ? (
            <div className="flex justify-center items-center">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              />
            </div>
          ) : statusQueryBook?.error ? (
            <Result
              className="flex flex-col justify-center items-center h-36"
              status="error"
              title="Error"
              subTitle="Sorry, there was an error loading the sample data."
            />
          ) : (
            <>
              <Statistic
                title="Books in Circulation"
                value={borrowedBooks}
                suffix={`/ ${totalBooks}`}
              />
              <Progress
                percent={((borrowedBooks / totalBooks) * 100 || 0).toFixed(2)}
                strokeColor="#45B7D1"
              />
            </>
          )}
        </Col>
        <Col xs={24} sm={12} md={8}>
          {statusQueryBook?.isLoading ? (
            <div className="flex justify-center items-center">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              />
            </div>
          ) : statusQueryBook?.error ? (
            <Result
              className="flex flex-col justify-center items-center h-36"
              status="error"
              title="Error"
              subTitle="Sorry, there was an error loading the sample data."
            />
          ) : (
            <>
              <Statistic
                title="Overdue Rate"
                value={overdueBooks}
                suffix={`/ ${borrowedBooks}`}
              />
              <Progress
                percent={
                  borrowedBooks === 0
                    ? 0
                    : ((overdueBooks / borrowedBooks) * 100 || 0).toFixed(2)
                }
                strokeColor="#45B7D1"
              />
            </>
          )}
        </Col>
        <Col xs={24} sm={12} md={8}>
          {statusQueryPatron?.isLoading ? (
            <div className="flex justify-center items-center">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              />
            </div>
          ) : statusQueryPatron?.error ? (
            <Result
              className="flex flex-col justify-center items-center h-36"
              status="error"
              title="Error"
              subTitle="Sorry, there was an error loading the sample data."
            />
          ) : (
            <>
              <Statistic
                title="Member Engagement"
                value={activePatrons}
                suffix={`/ ${totalPatrons}`}
              />
              <Progress
                percent={((activePatrons / totalPatrons) * 100 || 0).toFixed(2)}
                strokeColor="#FFA07A"
              />
            </>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default LibraryUtilization;
