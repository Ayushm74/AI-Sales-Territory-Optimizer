import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import UploadData from "./pages/UploadData";
import TerritoryAnalysis from "./pages/TerritoryAnalysis";
import Predictions from "./pages/Predictions";
import Optimization from "./pages/Optimization";

import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="p-6 w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadData />} />
            <Route path="/analysis" element={<TerritoryAnalysis />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/optimization" element={<Optimization />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}