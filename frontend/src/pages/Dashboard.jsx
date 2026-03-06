import React, { useEffect, useMemo, useState } from 'react';
import Loader from '../components/common/Loader.jsx';
import RevenueChart from '../components/charts/RevenueChart.jsx';
import TerritoryPotentialChart from '../components/charts/TerritoryPotentialChart.jsx';
import RepPerformanceChart from '../components/charts/RepPerformanceChart.jsx';
import OptimizationImpactChart from '../components/charts/OptimizationImpactChart.jsx';
import TerritoryMap from '../components/map/TerritoryMap.jsx';
import MapLegend from '../components/map/MapLegend.jsx';
import { getTerritoryAnalysis, getTerritories } from '../services/territoryService.js';
import { getAssignments } from '../services/optimizationService.js';
import { currency, number } from '../utils/formatters.js';

const StatCard = ({ label, value }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4">
    <div className="text-xs uppercase text-slate-500">{label}</div>
    <div className="mt-2 text-xl font-semibold">{value}</div>
  </div>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [territories, setTerritories] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [assignmentStats, setAssignmentStats] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const [analysisRes, territoriesRes, assignmentsRes] = await Promise.all([
          getTerritoryAnalysis(),
          getTerritories(),
          getAssignments(),
        ]);

        if (!mounted) return;
        setAnalysis(analysisRes.data);
        setTerritories(territoriesRes.data || []);
        setAssignments(assignmentsRes.data?.assignments || []);
        setAssignmentStats(assignmentsRes.data?.statistics?.[0] || null);
      } catch {
        // Keep UI resilient for first-run (no data yet)
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const stats = analysis?.statistics;
  const totalPredictedAfter = assignmentStats?.total_predicted_revenue;

  const beforeAfter = useMemo(() => {
    const before = analysis?.territoryScores?.reduce((s, t) => s + Number(t.revenue || 0), 0) || 0;
    const after = Number(totalPredictedAfter || 0);
    return { before, after };
  }, [analysis, totalPredictedAfter]);

  if (loading) return <Loader label="Loading dashboard..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Overview of revenue, market opportunity, rep performance, and optimization impact.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total Reps" value={number(stats?.total_reps || 0)} />
        <StatCard label="Total Regions" value={number(stats?.total_regions || 0)} />
        <StatCard label="Total Revenue" value={currency(stats?.total_revenue || 0)} />
        <StatCard label="Total Deals" value={number(stats?.total_deals || 0)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={analysis?.revenueByRegion || []} />
        <RepPerformanceChart data={analysis?.revenueByRep || []} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TerritoryPotentialChart data={analysis?.marketAnalysis || []} />
        <OptimizationImpactChart before={beforeAfter.before} after={beforeAfter.after} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        <div className="space-y-2">
          <div className="text-sm font-semibold">Territory Map</div>
          <TerritoryMap territories={territories} assignments={assignments} />
        </div>
        <div className="space-y-2">
          <div className="text-sm font-semibold">Map</div>
          <MapLegend />
          <div className="rounded-md border border-slate-200 bg-white p-3 text-xs text-slate-600">
            Note: this demo uses territory centroids. Replace with GeoJSON boundaries for production-grade mapping.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


