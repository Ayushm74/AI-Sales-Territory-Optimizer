import React from 'react';

const SalesDataTable = ({ rows }) => {
  return (
    <div className="overflow-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-600">
          <tr>
            <th className="px-4 py-3">Rep</th>
            <th className="px-4 py-3">Region</th>
            <th className="px-4 py-3">Revenue</th>
            <th className="px-4 py-3">Deals</th>
            <th className="px-4 py-3">Customers</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t border-slate-200">
              <td className="px-4 py-3">{r.sales_rep}</td>
              <td className="px-4 py-3">{r.region}</td>
              <td className="px-4 py-3">{r.revenue}</td>
              <td className="px-4 py-3">{r.deals}</td>
              <td className="px-4 py-3">{r.customers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesDataTable;


