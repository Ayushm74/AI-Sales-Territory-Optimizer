import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/upload', label: 'Upload' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/territory-analysis', label: 'Territory Analysis' },
  { to: '/predictions', label: 'Predictions' },
  { to: '/optimization', label: 'Optimization' },
];

const Sidebar = () => {
  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white p-4 md:block">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'block rounded-md px-3 py-2 text-sm',
                isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        Upload CSVs first, then run prediction and optimization.
      </div>
    </aside>
  );
};

export default Sidebar;


