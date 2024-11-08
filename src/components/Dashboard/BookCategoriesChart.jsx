import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Card, Spin, Result } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "../../data/fakeData";
import { getAllData } from "../../services/apiLibrary";
import { useQuery } from "@tanstack/react-query";

const BookCategoriesChart = () => {
  const {
    data: category,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllData("/categories/statistics"),
    queryKey: ["categories"],
  });

  if (isLoading) {
    return (
      <Card title="Book Categories" hoverable>
        <div className="flex justify-center items-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Book Categories" hoverable>
        <Result
          status="error"
          title="Error"
          subTitle="Sorry, there was an error loading the sample data."
        />
      </Card>
    );
  }

  return (
    <>
      <Card title="Book Categories" hoverable>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={category}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {category.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};

export default BookCategoriesChart;
