import React from "react";

export default function ClauseCard({ clause }) {
  return (
    <div className="border p-3 sm:p-4 rounded-lg shadow-sm bg-white w-full">
      <h3 className="font-semibold text-sm sm:text-base break-words">{clause.title}</h3>
      <p className="mt-2 text-sm text-gray-600 break-words">{clause.summary}</p>
      <p className="mt-2 text-xs text-gray-500">Confidence: {Math.round(clause.confidence * 100)}%</p>
    </div>
  );
}
