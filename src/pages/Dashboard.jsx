import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContracts } from "../redux/slice/contractsSlice";
import Layout from "../layout/Layout";
import ContractsTable from "../components/ContractsTable";
import UploadModal from "../components/UploadModal";
import EvidenceDrawer from "../components/EvidenceDrawer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { list = [], status, error } = useSelector((s) => s.contracts);
  const [showUpload, setShowUpload] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [evidence, setEvidence] = useState([]);
  const [showEvidence, setShowEvidence] = useState(false);

  useEffect(() => {
    dispatch(fetchContracts());
  }, [dispatch]);

  const filtered = (list || [])
    .filter((c) =>
      (c.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (c.parties?.toLowerCase() || "").includes(search.toLowerCase())
    )
    .filter((c) => (statusFilter ? (c.status || "").toLowerCase() === statusFilter.toLowerCase() : true))
    .filter((c) => (riskFilter ? (c.risk || "").toLowerCase() === riskFilter.toLowerCase() : true));

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const start = (currentPage - 1) * rowsPerPage;
  const paginated = filtered.slice(start, start + rowsPerPage);

  return (
    <Layout onOpenUpload={() => setShowUpload(true)}>
      <div className="flex flex-col md:flex-row gap-3 md:items-center mb-4">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          placeholder="Search by name or parties"
          className="px-3 py-2 rounded-md border flex-1"
        />
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="px-3 py-2 rounded-md border">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Renewal Due">Renewal Due</option>
        </select>
        <select value={riskFilter} onChange={(e) => { setRiskFilter(e.target.value); setCurrentPage(1); }} className="px-3 py-2 rounded-md border">
          <option value="">All Risk</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {status === "loading" && <div className="p-6 bg-white rounded shadow">Loading contracts...</div>}
      {status === "failed" && <div className="p-6 bg-white rounded shadow text-red-600">Error: {error}</div>}
      {status === "succeeded" && paginated.length === 0 && <div className="p-6 bg-white rounded shadow text-gray-600">No contracts found.</div>}

      {status === "succeeded" && paginated.length > 0 && (
        <>
          <ContractsTable contracts={paginated} onOpenEvidence={(e) => { setEvidence(e); setShowEvidence(true); }} />
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing {start + 1} - {Math.min(start + rowsPerPage, total)} of {total}</div>
            <div className="flex items-center gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded border disabled:opacity-50">Prev</button>
              <div className="px-3 py-1 border rounded">{currentPage} / {totalPages}</div>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 rounded border disabled:opacity-50">Next</button>
            </div>
          </div>
        </>
      )}

      <UploadModal isOpen={showUpload} onClose={() => setShowUpload(false)} />

      {showEvidence && <EvidenceDrawer evidence={evidence} onClose={() => setShowEvidence(false)} />}
    </Layout>
  );
}
