import React from "react";
import { Menu, LogOut, Upload } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onOpenUpload, onToggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        )}
        <div className="text-base sm:text-lg font-semibold text-gray-700">
          Welcome!
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {onOpenUpload && (
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition text-sm sm:text-base"
          >
            <Upload size={16} />
            <span className="hidden sm:inline">Upload Contract</span>
          </button>
        )}

        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-red-600 hover:text-white transition"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
