import RevenueChart from "../components/charts/RevenueChart";

const sample = [
  { region: "California", revenue: 120000 },
  { region: "Texas", revenue: 90000 },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl mb-6">Dashboard</h1>

      <RevenueChart data={sample} />
    </div>
  );
}