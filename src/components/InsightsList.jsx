// src/components/InsightsList.jsx
import React from "react";
import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";

export default function InsightsList({ insights }) {
  const getIcon = (risk) => {
    switch (risk) {
      case "High":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "Medium":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    }
  };

  const getStyle = (risk) => {
    switch (risk) {
      case "High":
        return "border-red-200 bg-red-50 text-red-700";
      case "Medium":
        return "border-yellow-200 bg-yellow-50 text-yellow-700";
      default:
        return "border-green-200 bg-green-50 text-green-700";
    }
  };

  return (
    <ul className="space-y-3">
      {insights.map((ins, i) => (
        <li
          key={i}
          className={`flex items-start gap-3 p-4 rounded-lg border ${getStyle(ins.risk)}`}
        >
          {getIcon(ins.risk)}
          <div>
            <p className="font-semibold">{ins.risk} Risk</p>
            <p className="text-sm">{ins.message}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
