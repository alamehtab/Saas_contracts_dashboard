// src/components/Topbar.jsx
import React from "react";
import { UserCircle, LogOut, Upload } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onOpenUpload }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Left section */}
      <div className="text-lg font-semibold text-gray-700">Welcome!</div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Upload Contract Button */}
        <button
          onClick={onOpenUpload}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Upload size={18} />
          Upload Contract
        </button>

        {/* User / Logout */}
        <button
          className="p-2 rounded-full hover:bg-red-600 hover:text-white transition"
          onClick={handleLogout}
        >
          <LogOut size={28} className="" />
        </button>
      </div>
    </header>
  );
}
