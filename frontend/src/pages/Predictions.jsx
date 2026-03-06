import React, { useState } from 'react';
import Loader from '../components/common/Loader.jsx';
import TerritoryTable from '../components/tables/TerritoryTable.jsx';
import { runPrediction } from '../services/optimizationService.js';
import { getTerritories } from '../services/territoryService.js';

const Predictions = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [territories, setTerritories] = useState([]);

  const handlePredict = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await runPrediction();
      const t = await getTerritories();
      setTerritories(t.data || []);
      setMessage('Predictions updated successfully.');
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Revenue Predictions</h1>
        <p className="mt-1 text-sm text-slate-600">
          Runs the ML service (RandomForestRegressor) to predict territory revenue potential.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handlePredict}
          disabled={loading}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white disabled:bg-slate-300"
        >
          Run Prediction
        </button>
        {loading ? <Loader label="Predicting..." /> : null}
      </div>

      {message ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          {message}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {territories.length ? (
        <div className="space-y-2">
          <div className="text-sm font-semibold">Territories</div>
          <TerritoryTable rows={territories} />
        </div>
      ) : (
        <div className="text-sm text-slate-600">
          No territories loaded yet. Upload data, then run prediction.
        </div>
      )}
    </div>
  );
};

export default Predictions;


