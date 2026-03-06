import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { currency } from '../../utils/formatters.js';

const OptimizationImpactChart = ({ before, after }) => {
  const data = [
    { name: 'Before', revenue: Number(before || 0) },
    { name: 'After', revenue: Number(after || 0) },
  ];

  return (
    <div className="h-64 rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 text-sm font-semibold">Optimization Impact</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(v) => currency(v)} />
          <Legend />
          <Bar dataKey="revenue" fill="#0f172a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OptimizationImpactChart;


