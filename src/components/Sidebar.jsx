// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Lightbulb, BarChart2, Settings } from "lucide-react";

const nav = [
  { label: "Contracts", to: "/dashboard", icon: FileText },
  { label: "Insights", to: "/insight", icon: Lightbulb },
  { label: "Reports", to: "#", icon: BarChart2 },
  { label: "Settings", to: "#", icon: Settings },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col shadow-xl">
      <div className="px-6 py-6 border-b border-blue-700 flex items-center gap-2">
        <FileText size={28} className="text-blue-300" />
        <span className="text-xl font-bold tracking-tight">SaaS Contracts</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {nav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.to;

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-700 text-blue-200 shadow-inner"
                  : "hover:bg-blue-700 hover:text-blue-200"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-blue-700 text-xs text-blue-300">
        © {new Date().getFullYear()} SaaS Contracts
      </div>
    </aside>
  );
}
