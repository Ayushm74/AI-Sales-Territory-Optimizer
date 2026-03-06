import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { currency } from '../../utils/formatters.js';

const RepPerformanceChart = ({ data }) => {
  return (
    <div className="h-80 rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 text-sm font-semibold">Sales Rep Performance</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sales_rep" />
          <YAxis />
          <Tooltip formatter={(v) => currency(v)} />
          <Bar dataKey="total_revenue" fill="#0f172a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RepPerformanceChart;


