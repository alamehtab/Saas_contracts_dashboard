import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Eye } from "lucide-react";

export default function ContractsTable({ contracts, onOpenEvidence }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  if (!Array.isArray(contracts)) return null;

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y">
        <thead className="bg-gray-50">
          <tr className="text-xs sm:text-sm text-gray-700">
            <th className="px-2 sm:px-4 py-2 text-left">Contract</th>
            <th className="px-2 sm:px-4 py-2 text-left">Parties</th>
            <th className="px-2 sm:px-4 py-2 text-left">Expiry</th>
            <th className="px-2 sm:px-4 py-2 text-left">Status</th>
            <th className="px-2 sm:px-4 py-2 text-left">Risk</th>
            <th className="px-2 sm:px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-xs sm:text-sm">
          {contracts.map((c) => (
            <React.Fragment key={c.id}>
              <tr className="hover:bg-gray-50 border-b">
                <td className="px-2 sm:px-4 py-3">{c.name}</td>
                <td className="px-2 sm:px-4 py-3">{c.parties}</td>
                <td className="px-2 sm:px-4 py-3">{c.expiry}</td>
                <td className="px-2 sm:px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : c.status === "Expired"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      c.risk === "High"
                        ? "bg-red-100 text-red-800"
                        : c.risk === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {c.risk}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/contracts/${c.id}`)}
                      className="p-2 rounded hover:bg-gray-100"
                      title="Details"
                    >
                      <FileText size={16} className="text-blue-600" />
                    </button>

                    <button
                      onClick={() =>
                        onOpenEvidence
                          ? onOpenEvidence(c.evidence || [])
                          : setExpanded((prev) => (prev === c.id ? null : c.id))
                      }
                      className="p-2 rounded hover:bg-gray-100"
                      title="View Evidence"
                    >
                      <Eye size={16} className="text-green-600" />
                    </button>
                  </div>
                </td>
              </tr>

              {expanded === c.id && (
                <tr className="bg-gray-50">
                  <td colSpan={6} className="p-3">
                    <div className="space-y-2">
                      {(c.evidence || []).length === 0 ? (
                        <div className="text-gray-500">No evidence found.</div>
                      ) : (
                        (c.evidence || []).map((e, i) => (
                          <div key={i} className="border rounded p-2 bg-white">
                            <div className="text-sm font-semibold">{e.source}</div>
                            <div className="text-sm text-gray-700">{e.snippet}</div>
                            <div className="text-xs text-gray-500">Relevance: {(e.relevance * 100).toFixed(0)}%</div>
                          </div>
                        ))
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
