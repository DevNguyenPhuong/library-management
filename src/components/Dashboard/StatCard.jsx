import { LoadingOutlined } from "@ant-design/icons";
import { Card, Result, Spin, Statistic } from "antd";
import React from "react";

const StatCard = ({ title, icon, color, status, value }) => {
  if (status?.isLoading) {
    return (
      <Card
        hoverable
        style={{ height: "100%" }}
        styles={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="flex justify-center items-center h-32">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      </Card>
    );
  }

  if (status?.error) {
    return (
      <Card
        hoverable
        style={{ height: "100%" }}
        styles={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Result
          className="flex flex-col justify-center items-center h-40 p-2"
          status="error"
          title="Error"
          subTitle="Sorry, there was an error loading the sample data."
        />
      </Card>
    );
  }
  return (
    <Card
      hoverable
      style={{ height: "100%" }}
      styles={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {React.cloneElement(icon, {
        style: { fontSize: 48, color: color, marginBottom: 16 },
      })}
      <Statistic title={title} value={value} valueStyle={{ color: color }} />
    </Card>
  );
};

export default StatCard;
