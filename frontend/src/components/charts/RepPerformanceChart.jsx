import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function RepPerformanceChart({ data }) {
  return (
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="sales_rep" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
    </LineChart>
  );
}