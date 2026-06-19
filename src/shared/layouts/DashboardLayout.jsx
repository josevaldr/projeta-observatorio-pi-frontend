import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ sidebarLinks }) {
  return (
    <div className="flex h-screen bg-white">
      {/* Reusable Sidebar receiving dynamic links */}
      <Sidebar links={sidebarLinks} />
      
      {/* Main content area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
}

