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

    newFiles.forEach((f, idx) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((pf) =>
            pf.file === f.file ? { ...pf, status: Math.random() > 0.2 ? "success" : "error" } : pf
          )
        );
      }, 1200 + idx * 500);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleBrowse = (e) => handleFiles(e.target.files);

  const removeFile = (file) => setFiles((prev) => prev.filter((p) => p.file !== file));
  const clearAll = () => setFiles([]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl w-full max-w-md p-4 sm:p-6 relative shadow-lg max-h-[90vh] overflow-hidden flex flex-col">
        <button onClick={onClose} className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full">
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold mb-3">Upload Contracts</h2>

        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <UploadCloud className="mb-2 w-8 h-8 text-gray-500" />
          <p className="text-sm text-gray-600">Drag & drop files here or</p>
          <label className="mt-2 inline-block px-3 py-1.5 bg-blue-600 text-white rounded cursor-pointer text-sm">
            Browse
            <input type="file" multiple className="hidden" onChange={handleBrowse} />
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-3 overflow-y-auto flex-1">
            <ul className="space-y-2">
              {files.map((f, idx) => (
                <li key={idx} className="flex items-center justify-between p-2 border rounded text-sm bg-white">
                  <div className="truncate max-w-[60%]">{f.file.name}</div>
                  <div className="flex items-center gap-2">
                    <div className={`${f.status === "success" ? "text-green-700" : f.status === "error" ? "text-red-700" : "text-yellow-700"} text-xs`}>
                      {f.status === "uploading" ? "Uploading..." : f.status === "success" ? "Success" : "Error"}
                    </div>
                    <button onClick={() => removeFile(f.file)} className="p-1 hover:bg-gray-100 rounded-full">
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex gap-2">
              <button onClick={clearAll} className="px-3 py-1 rounded bg-red-600 text-white text-sm">Clear All</button>
              <button onClick={onClose} className="px-3 py-1 rounded bg-gray-200 text-sm">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
