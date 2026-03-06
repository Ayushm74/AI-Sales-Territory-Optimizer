import React from 'react';

const MapLegend = () => {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-3 text-xs text-slate-700">
      <div className="font-semibold">Legend</div>
      <div className="mt-2 space-y-1">
        <div><span className="inline-block h-2 w-2 rounded-full bg-slate-900" /> Assigned territory</div>
        <div><span className="inline-block h-2 w-2 rounded-full bg-slate-400" /> Unassigned / unknown</div>
      </div>
    </div>
  );
};

export default MapLegend;


