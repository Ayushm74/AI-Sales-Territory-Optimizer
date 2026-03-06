import React from 'react';
import { currency } from '../../utils/formatters.js';

const AssignmentTable = ({ rows }) => {
  return (
    <div className="overflow-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-600">
          <tr>
            <th className="px-4 py-3">Rep</th>
            <th className="px-4 py-3">Territory</th>
            <th className="px-4 py-3">Predicted Revenue</th>
            <th className="px-4 py-3">Algorithm</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t border-slate-200">
              <td className="px-4 py-3">{r.sales_rep}</td>
              <td className="px-4 py-3">{r.territory}</td>
              <td className="px-4 py-3">{currency(r.predicted_revenue)}</td>
              <td className="px-4 py-3">{r.algorithm_used || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;


