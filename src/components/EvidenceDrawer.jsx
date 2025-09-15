import React from "react";
import { X } from "lucide-react";

/**
 * EvidenceDrawer: responsive drawer that is full-width on mobile (w-full)
 * and fixed width on desktop (sm/w-96).
 */
export default function EvidenceDrawer({ evidence = [], onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* backdrop */}
      <div className="flex-1 bg-black/40" onClick={onClose} />

      {/* drawer */}
      <div className="bg-white w-full sm:w-96 max-h-screen overflow-y-auto p-4 shadow-lg transform transition-transform">
        <div className="flex items-center justify-between sticky top-0 bg-white z-10 pb-2">
          <h3 className="text-lg font-semibold">Evidence</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {evidence.length === 0 ? (
            <div className="text-gray-500">No evidence available.</div>
          ) : (
            evidence.map((e, idx) => (
              <div key={idx} className="border rounded p-3 bg-gray-50">
                <div className="text-sm font-semibold">{e.source}</div>
                <div className="text-sm text-gray-700 mt-1">{e.snippet}</div>
                <div className="text-xs text-gray-500 mt-2">Relevance: {(e.relevance * 100).toFixed(0)}%</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
