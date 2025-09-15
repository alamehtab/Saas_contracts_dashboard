// src/pages/InsightPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import InsightsList from "../components/InsightsList";

export default function InsightPage() {
  const navigate = useNavigate();

  // Dummy insights for demo
  const insights = [
    { risk: "High", message: "Contract renewal clause may cause penalties." },
    { risk: "Medium", message: "Pricing terms are ambiguous." },
    { risk: "Low", message: "Contract complies with data protection rules." },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Insights</h1>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
          <InsightsList insights={insights} />
        </main>
      </div>
    </div>
  );
}
