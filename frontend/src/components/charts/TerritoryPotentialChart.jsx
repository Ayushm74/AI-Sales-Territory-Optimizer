import { PieChart, Pie, Tooltip } from "recharts";

export default function TerritoryPotentialChart({ data }) {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="market_size"
        nameKey="region"
        outerRadius={120}
      />
      <Tooltip />
    </PieChart>
  );
}