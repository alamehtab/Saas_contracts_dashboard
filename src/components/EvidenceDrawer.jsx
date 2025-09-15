// src/components/EvidenceDrawer.jsx
import React from "react";
import { X } from "lucide-react";

export default function EvidenceDrawer({ evidence, onClose }) {
  return (
    <div className="fixed inset-0 flex z-50">
      <div className="bg-black/30 flex-1" onClick={onClose}></div>
      <div className="bg-white w-96 p-4 overflow-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Evidence</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {evidence.map((e, i) => (
          <div key={i} className="border p-3 mb-2 rounded">
            <p>
              <strong>Source:</strong> {e.source}
            </p>
            <p>{e.snippet}</p>
            <p className="text-sm text-gray-500">
              Relevance: {Math.round(e.relevance * 100)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
