// src/components/UploadModal.jsx
import React, { useState } from "react";
import { X, UploadCloud, Trash2 } from "lucide-react";

export default function UploadModal({ isOpen, onClose }) {
  const [files, setFiles] = useState([]);

  if (!isOpen) return null;

  const handleFiles = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map((file) => ({
      file,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload with timeout
    newFiles.forEach((f, idx) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((pf) =>
            pf.file === f.file ? { ...pf, status: "success" } : pf
          )
        );
      }, 1500 + idx * 500); // staggered animation
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleBrowse = (e) => {
    handleFiles(e.target.files);
  };

  const handleRemove = (fileToRemove) => {
    setFiles((prev) => prev.filter((f) => f.file !== fileToRemove));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded-full"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Upload Contracts</h2>

        {/* Drag & Drop Area */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <UploadCloud className="mx-auto mb-2 w-8 h-8 text-gray-500" />
          <p className="text-gray-600">Drag & drop files here or</p>
          <label className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
            Browse
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleBrowse}
            />
          </label>
        </div>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <ul className="mt-4 space-y-2 max-h-48 overflow-y-auto">
            {files.map((f, idx) => (
              <li
                key={idx}
                className={`flex items-center justify-between p-2 border rounded ${
                  f.status === "success"
                    ? "bg-green-50 border-green-300 text-green-700"
                    : "bg-yellow-50 border-yellow-300 text-yellow-700"
                }`}
              >
                <span>{f.file.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {f.status === "uploading" ? "Uploading..." : "Success"}
                  </span>
                  {/* Remove button */}
                  <button
                    onClick={() => handleRemove(f.file)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
