// src/components/ClauseCard.jsx
import React from "react";

export default function ClauseCard({ clause }) {
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <h3 className="font-semibold">{clause.title}</h3>
      <p className="text-gray-600">{clause.summary}</p>
      <p className="text-sm text-gray-500">Confidence: {Math.round(clause.confidence * 100)}%</p>
    </div>
  );
}
