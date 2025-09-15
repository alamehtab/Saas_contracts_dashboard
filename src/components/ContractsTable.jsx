// src/components/ContractTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Lightbulb } from "lucide-react";

export default function ContractTable({ contracts }) {
  const navigate = useNavigate();

  return (
    <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-left">Contract Name</th>
          <th className="px-4 py-2 text-left">Parties</th>
          <th className="px-4 py-2 text-left">Expiry</th>
          <th className="px-4 py-2 text-left">Status</th>
          <th className="px-4 py-2 text-left">Risk</th>
          <th className="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {contracts.map((c) => (
          <tr key={c.id} className="hover:bg-gray-100">
            <td className="px-4 py-2">{c.name}</td>
            <td className="px-4 py-2">{c.parties}</td>
            <td className="px-4 py-2">{c.expiry}</td>
            <td className="px-4 py-2">{c.status}</td>
            <td className="px-4 py-2">{c.risk}</td>
            <td className="px-4 py-2 flex gap-2">
              <button
                className="p-1 rounded hover:bg-gray-200"
                onClick={() => navigate(`/contracts/${c.id}`)}
                title="View Details"
              >
                <FileText size={20} className="text-blue-600" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
