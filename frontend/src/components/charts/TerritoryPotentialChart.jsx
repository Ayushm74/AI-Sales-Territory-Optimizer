import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { currency } from '../../utils/formatters.js';

const TerritoryPotentialChart = ({ data }) => {
  const chartData = data.map((d) => ({
    region: d.region,
    market_size: Number(d.market_size || 0),
    actual_revenue: Number(d.actual_revenue || 0),
    opportunity_gap: Number(d.opportunity_gap || 0),
  }));

  return (
    <div className="h-80 rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 text-sm font-semibold">Market Potential vs Actual</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip formatter={(v) => currency(v)} />
          <Legend />
          <Bar dataKey="actual_revenue" fill="#0f172a" />
          <Bar dataKey="opportunity_gap" fill="#64748b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TerritoryPotentialChart;


