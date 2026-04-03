import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
        <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-muted/40 flex-1 overflow-auto">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout