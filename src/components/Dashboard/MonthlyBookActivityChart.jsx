import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Card, Result, Spin } from "antd";
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
import { getAllData } from "../../services/apiLibrary";
import { useQueries } from "@tanstack/react-query";

const MonthlyBookActivityChart = () => {

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const today = new Date()
  let monthlyData = new Array((today.getMonth()) + 1)

  for (var i = (today.getMonth()); i >= 0; i--) {
    monthlyData[i] = {
      month: `${months[i]}`,
      numberOfMonth: `${i + 1}`
    }
  }

  const loan = useQueries({
    queries: monthlyData.map((month) => {
      return {
        queryFn: () => getAllData(`/loans/statistics?year=2024&month=${month.numberOfMonth}`),
        queryKey: ['loan', month.numberOfMonth],
      }
    }),
    combine: (result) => {
      return {
        data: result.map((result) => result.data),
        isLoading: result.some((result) => result.isPending),
        error: result.some((result) => result.isError)
      }
    }
  })

  const monthlyDataStatistics = monthlyData.map((month, index) => {
    return { ...month, ...loan.data[index] }
  })


  if (loan.isLoading) {
    return (
      <Card title="Monthly Book Activity" hoverable>
        <div className="flex justify-center items-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      </Card>
    );
  }


  if (loan.error) {
    return (
      <Card title="Monthly Book Activity" hoverable>
        <Result
          status="error"
          title="Error"
          subTitle="Sorry, there was an error loading the sample data."
        />
      </Card>

    );
  }

  return (
    <Card title="Monthly Book Activity" hoverable>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyDataStatistics}>
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
}
export default MonthlyBookActivityChart;
