import React, { useMemo, useState } from 'react';
import FileUploader from '../components/common/FileUploader.jsx';
import Loader from '../components/common/Loader.jsx';
import SalesDataTable from '../components/tables/SalesDataTable.jsx';
import TerritoryTable from '../components/tables/TerritoryTable.jsx';
import { uploadSalesCSV } from '../services/salesService.js';
import { uploadTerritoryCSV } from '../services/territoryService.js';

const UploadData = () => {
  const [loading, setLoading] = useState(false);
  const [salesPreview, setSalesPreview] = useState(null);
  const [territoryPreview, setTerritoryPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleSalesUpload = async (file) => {
    setError(null);
    setLoading(true);
    try {
      const res = await uploadSalesCSV(file);
      setSalesPreview(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTerritoryUpload = async (file) => {
    setError(null);
    setLoading(true);
    try {
      const res = await uploadTerritoryCSV(file);
      setTerritoryPreview(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  const salesRows = useMemo(() => salesPreview?.records || [], [salesPreview]);
  const territoryRows = useMemo(() => territoryPreview?.records || [], [territoryPreview]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Upload Data</h1>
        <p className="mt-1 text-sm text-slate-600">
          Upload your sales and territory CSVs. The backend validates structure and stores into PostgreSQL.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <FileUploader
          title="Sales Data CSV"
          description="Required columns: sales_rep, region, revenue, deals, customers"
          onUpload={handleSalesUpload}
          disabled={loading}
        />
        <FileUploader
          title="Territory Data CSV"
          description="Required columns: region, market_size"
          onUpload={handleTerritoryUpload}
          disabled={loading}
        />
      </div>

      {loading ? <Loader label="Uploading and validating..." /> : null}

      <div className="grid gap-6">
        {salesRows.length ? (
          <div className="space-y-2">
            <div className="text-sm font-semibold">Sales Preview</div>
            <SalesDataTable rows={salesRows} />
          </div>
        ) : null}

        {territoryRows.length ? (
          <div className="space-y-2">
            <div className="text-sm font-semibold">Territory Preview</div>
            <TerritoryTable rows={territoryRows} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UploadData;


