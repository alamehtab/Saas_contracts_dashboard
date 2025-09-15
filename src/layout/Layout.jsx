import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

/**
 * Layout wraps pages with Topbar and Sidebar.
 * On mobile the sidebar becomes a slide-in drawer controlled by state here.
 */
export default function Layout({ children, onOpenUpload }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Desktop permanent sidebar */}
      <div className="hidden md:block md:w-64">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-xl">
            {/* Pass onLinkClick so clicking a link closes the drawer */}
            <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 min-h-screen flex flex-col w-full">
        <Topbar
          onOpenUpload={onOpenUpload}
          onToggleSidebar={() => setIsSidebarOpen((s) => !s)}
        />
        <main className="p-4 sm:p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
