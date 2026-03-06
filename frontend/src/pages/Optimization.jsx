import React, { useEffect, useState } from 'react';
import Loader from '../components/common/Loader.jsx';
import AssignmentTable from '../components/tables/AssignmentTable.jsx';
import OptimizationImpactChart from '../components/charts/OptimizationImpactChart.jsx';
import { runOptimization, getAssignments } from '../services/optimizationService.js';
import { currency } from '../utils/formatters.js';

const Optimization = () => {
  const [loading, setLoading] = useState(false);
  const [algorithm, setAlgorithm] = useState('greedy');
  const [maxTerritoriesPerRep, setMaxTerritoriesPerRep] = useState(2);
  const [result, setResult] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);

  const refreshAssignments = async () => {
    const res = await getAssignments();
    setAssignments(res.data?.assignments || []);
  };

  useEffect(() => {
    refreshAssignments().catch(() => {});
  }, []);

  const handleOptimize = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await runOptimization({ algorithm, maxTerritoriesPerRep });
      setResult(res.data);
      await refreshAssignments();
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  const metrics = result?.metrics;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Territory Optimization</h1>
        <p className="mt-1 text-sm text-slate-600">
          Assign reps to territories to maximize predicted revenue. Constraint: each rep can handle up to N territories.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap items-end gap-4 rounded-lg border border-slate-200 bg-white p-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs text-slate-600">Algorithm</span>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2"
          >
            <option value="greedy">Greedy</option>
            <option value="hungarian">Hungarian (simplified)</option>
            <option value="lp">Linear Programming (approx)</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs text-slate-600">Max territories per rep</span>
          <input
            type="number"
            min={1}
            max={5}
            value={maxTerritoriesPerRep}
            onChange={(e) => setMaxTerritoriesPerRep(Number(e.target.value))}
            className="w-40 rounded-md border border-slate-200 px-3 py-2"
          />
        </label>

        <button
          onClick={handleOptimize}
          disabled={loading}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white disabled:bg-slate-300"
        >
          Run Optimization
        </button>

        {loading ? <Loader label="Optimizing..." /> : null}
      </div>

      {metrics ? (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs uppercase text-slate-500">Total assignments</div>
            <div className="mt-2 text-xl font-semibold">{metrics.totalAssignments}</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs uppercase text-slate-500">Predicted revenue after</div>
            <div className="mt-2 text-xl font-semibold">{currency(metrics.totalPredictedRevenue)}</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs uppercase text-slate-500">Improvement</div>
            <div className="mt-2 text-xl font-semibold">{currency(metrics.improvement)}</div>
          </div>
        </div>
      ) : null}

      {metrics ? (
        <OptimizationImpactChart before={metrics.totalBeforeOptimization} after={metrics.totalPredictedRevenue} />
      ) : null}

      <div className="space-y-2">
        <div className="text-sm font-semibold">Recommended Assignments</div>
        <AssignmentTable rows={assignments} />
      </div>
    </div>
  );
};

export default Optimization;


