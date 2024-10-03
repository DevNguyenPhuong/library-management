import React from "react";
import { Card } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { monthlyData } from "../../data/fakeData";

const MonthlyBookActivityChart = () => (
  <Card title="Monthly Book Activity" hoverable>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="borrowed" fill="#FF6B6B" name="Borrowed" />
        <Bar dataKey="returned" fill="#4ECDC4" name="Returned" />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);

export default MonthlyBookActivityChart;
