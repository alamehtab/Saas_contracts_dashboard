import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClauseCard from "../components/ClauseCard";
import InsightsList from "../components/InsightsList";
import { useSelector, useDispatch } from "react-redux";
import { fetchContractById } from "../redux/slice/contractsSlice";
import Layout from "../layout/Layout";
import EvidenceDrawer from "../components/EvidenceDrawer";

export default function ContractDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, status, error } = useSelector((state) => state.contracts);
  const [showEvidence, setShowEvidence] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchContractById(id));
  }, [dispatch, id]);

  if (status === "loading") return <div className="p-6">Loading contract details...</div>;
  if (status === "failed") return <div className="p-6 text-red-600">{error}</div>;
  if (!selected) return <div className="p-6 text-gray-600">No contract found.</div>;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">{selected.name}</h1>
          <div className="text-sm text-gray-600 mt-1">
            {selected.parties} • {selected.status} • {selected.risk}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowEvidence(true)} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">View Evidence</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 text-sm">
          <div><strong>Start:</strong> {selected.start}</div>
          <div><strong>Expiry:</strong> {selected.expiry}</div>
          <div><strong>Status:</strong> {selected.status}</div>
          <div><strong>Risk:</strong> {selected.risk}</div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Clauses</h2>
          <div className="space-y-2">
            {(selected.clauses || []).map((cl, i) => <ClauseCard key={i} clause={cl} />)}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold mb-2">AI Insights</h2>
        <InsightsList insights={selected.insights || []} />
      </div>

      {showEvidence && <EvidenceDrawer evidence={selected.evidence || []} onClose={() => setShowEvidence(false)} />}
    </Layout>
  );
}
