import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children, setSearch }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen">

      <Navbar
        setSearch={setSearch}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex">
        <Sidebar open={sidebarOpen} />

        <div className="flex-1 p-5 ml-0 md:ml-60">
          {children}
        </div>
      </div>

    </div>
  );
};

export default Layout;