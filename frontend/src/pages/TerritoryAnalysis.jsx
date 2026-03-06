import React, { useEffect, useState } from 'react';
import Loader from '../components/common/Loader.jsx';
import RevenueChart from '../components/charts/RevenueChart.jsx';
import TerritoryPotentialChart from '../components/charts/TerritoryPotentialChart.jsx';
import RepPerformanceChart from '../components/charts/RepPerformanceChart.jsx';
import { getTerritoryAnalysis } from '../services/territoryService.js';

const TerritoryAnalysis = () => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await getTerritoryAnalysis();
        if (!mounted) return;
        setAnalysis(res.data);
      } catch (e) {
        if (!mounted) return;
        setError(e?.response?.data?.message || e.message);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <Loader label="Computing analysis..." />;

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Territory Performance Analysis</h1>
        <p className="mt-1 text-sm text-slate-600">
          Revenue per region, rep performance, and market opportunity gaps.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={analysis?.revenueByRegion || []} />
        <RepPerformanceChart data={analysis?.revenueByRep || []} />
      </div>

      <TerritoryPotentialChart data={analysis?.marketAnalysis || []} />
    </div>
  );
};

export default TerritoryAnalysis;


