import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function RevenueChart({ data }) {
  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="region" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="revenue" fill="#8884d8" />
    </BarChart>
  );
}