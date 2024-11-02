import React from "react";
import { Card, Statistic } from "antd";

const StatCard = ({ title, value, icon, color }) => (
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

export default StatCard;