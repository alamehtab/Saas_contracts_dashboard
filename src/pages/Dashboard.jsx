// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContracts } from "../redux/slice/contractsSlice";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ContractTable from "../components/ContractsTable";
import UploadModal from "../components/UploadModal";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.contracts);
  const [showUpload, setShowUpload] = useState(false);

  // Filters & search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");

  useEffect(() => {
    dispatch(fetchContracts());
  }, [dispatch]);

  const filteredContracts = list
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.parties.toLowerCase().includes(search.toLowerCase())
    )
    .filter((c) => (statusFilter ? c.status === statusFilter : true))
    .filter((c) => (riskFilter ? c.risk === riskFilter : true));

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar onOpenUpload={() => setShowUpload(true)} />

        <main className="p-6 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by name or parties"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-lg flex-1"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Renewal Due">Renewal Due</option>
            </select>

            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">All Risk</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {status === "loading" && <p>Loading contracts...</p>}
          {status === "failed" && <p className="text-red-500">{error}</p>}
          {status === "succeeded" && filteredContracts.length === 0 && (
            <p>No contracts found.</p>
          )}

          {status === "succeeded" && filteredContracts.length > 0 && (
            <ContractTable contracts={filteredContracts} />
          )}
        </main>
      </div>

      {/* Pass isOpen prop correctly */}
      <UploadModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
      />
    </div>
  );
}
