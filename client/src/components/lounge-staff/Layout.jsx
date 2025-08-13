import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'; 
import { Menu } from 'lucide-react'; 
import Sidebar from './Sidebar'; 
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
      <header className="sticky-top d-flex align-items-center justify-content-between px-3 shadow-sm bg-white" style={{ height: '4rem', zIndex: 1030 }}>
        <button
          className="btn btn-ghost d-md-none"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-controls="sidebar-nav"
          aria-expanded={!sidebarCollapsed}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="d-flex justify-content-between w-100">
          <Link to="/" className="fw-bold fs-5 text-dark text-decoration-none">
            Lounge Dashboard
          </Link>
          <div className="d-flex align-items-center gap-4">
          </div>
        </div>
      </header>

      <div className="d-flex">
        <Sidebar sidebarCollapsed={sidebarCollapsed} onLogout={handleLogout} />

        <main
          className="flex-grow-1 p-3"
          style={{ marginLeft: sidebarCollapsed ? 0 : '16rem', transition: 'margin-left 0.3s' }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;