// src/pages/ContractDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClauseCard from "../components/ClauseCard";
import InsightsList from "../components/InsightsList";
import { useSelector, useDispatch } from "react-redux";
import { fetchContractById } from "../redux/slice/contractsSlice";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import EvidenceDrawer from "../components/Evidencedrawer";

export default function ContractDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showEvidence, setShowEvidence] = useState(false);

  const { selected, status, error } = useSelector((state) => state.contracts);

  useEffect(() => {
    dispatch(fetchContractById(id));
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading contract details...</p>;
  if (status === "failed") return <p className="text-red-500">{error}</p>;
  if (!selected) return <p>No contract found.</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 overflow-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{selected.name}</h1>
            <button
              onClick={() => setShowEvidence(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Evidence
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Parties:</strong> {selected.parties}
              </p>
              <p>
                <strong>Start:</strong> {selected.start}
              </p>
              <p>
                <strong>Expiry:</strong> {selected.expiry}
              </p>
              <p>
                <strong>Status:</strong> {selected.status}
              </p>
              <p>
                <strong>Risk:</strong> {selected.risk}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Clauses</h2>
              {selected.clauses.map((clause, i) => (
                <ClauseCard key={i} clause={clause} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">AI Insights</h2>
            <InsightsList insights={selected.insights} />
          </div>
        </main>
      </div>

      {showEvidence && (
        <EvidenceDrawer evidence={selected.evidence} onClose={() => setShowEvidence(false)} />
      )}
    </div>
  );
}
