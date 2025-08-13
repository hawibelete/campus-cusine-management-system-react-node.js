import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import Sidebar from './Sidebar';
import { Toaster } from "sonner";
import axios from '@/utility/axios';

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <header
        className="sticky-top d-flex align-items-center justify-content-between px-3 shadow-sm bg-white"
        style={{ height: "4rem", zIndex: 1030 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="d-md-none"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="d-flex justify-content-between w-100">
          <div className="fw-semibold fs-5">Admin Dashboard</div>
          <div className="d-flex align-items-center gap-4">
          </div>
        </div>
      </header>

      <div className="d-flex">
        <Sidebar sidebarCollapsed={sidebarCollapsed} onLogout={handleLogout} />

        <main
          className="flex-grow-1 p-3"
          style={{
            marginLeft: sidebarCollapsed ? 0 : "16rem",
            transition: "margin-left 0.3s",
          }}
        >
          <Outlet />
        </main>

        <Toaster />
      </div>
    </div>
  );
};

export default Layout;
