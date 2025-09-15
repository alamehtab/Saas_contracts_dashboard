// src/components/Topbar.jsx
import React from "react";
import { UserCircle, LogOut } from "lucide-react";
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
      <div className="text-lg font-semibold text-gray-700">Welcome!</div>

      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition"
          onClick={handleLogout}
        >
          <LogOut size={28} className="text-gray-500" />
        </button>
      </div>
    </header>
  );
}
