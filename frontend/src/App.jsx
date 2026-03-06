import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar.jsx';
import Sidebar from './components/common/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import UploadData from './pages/UploadData.jsx';
import TerritoryAnalysis from './pages/TerritoryAnalysis.jsx';
import Predictions from './pages/Predictions.jsx';
import Optimization from './pages/Optimization.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/upload" element={<UploadData />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/territory-analysis" element={<TerritoryAnalysis />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/optimization" element={<Optimization />} />
            <Route path="*" element={<div className="text-sm">Not Found</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;


