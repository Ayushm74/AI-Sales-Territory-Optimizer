import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/dashboard" className="text-lg font-semibold tracking-tight">
          AI Sales Territory Optimizer
        </Link>
        <div className="text-xs text-slate-500">
          {location.pathname}
        </div>
      </div>
    </header>
  );
};

export default Navbar;


