import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 bg-white shadow h-screen p-4">
      <ul className="space-y-4">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/upload">Upload Data</Link></li>
        <li><Link to="/analysis">Territory Analysis</Link></li>
        <li><Link to="/predictions">Predictions</Link></li>
        <li><Link to="/optimization">Optimization</Link></li>
      </ul>
    </div>
  );
}