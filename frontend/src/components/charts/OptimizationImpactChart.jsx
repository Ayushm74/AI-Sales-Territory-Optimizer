import { BarChart, Bar, XAxis, YAxis } from "recharts";

export default function OptimizationImpactChart({ data }) {
  return (
    <BarChart width={400} height={300} data={data}>
      <XAxis dataKey="type" />
      <YAxis />
      <Bar dataKey="revenue" fill="#ff7300" />
    </BarChart>
  );
}