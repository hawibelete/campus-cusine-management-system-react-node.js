import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react'; 
import { Button } from "../shared/ui/button";

const Sidebar = ({ sidebarCollapsed, onLogout }) => {
  const location = useLocation();

  const navLinks = [
    { to: '/lounge-dashboard', label: 'Dashboard', icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      )
    },
    { to: '/lounge-staff/orders', label: 'Manage Orders', icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    },
    { to: '/lounge-staff/menu', label: 'Manage Menu', icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M10 2h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
          <path d="M16 8v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8Z" />
          <path d="M12 18v.01" />
          <path d="M12 14v.01" />
        </svg>
      )
    },
    { to: '/lounge-staff/prepaids', label: 'Prepaid Services', icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
          <path d="M7 15h0.01" />
          <path d="M11 15h0.01" />
        </svg>
      )
    },
    { to: '/lounge-staff/feedback', label: 'Feedback', icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5Z" />
          <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
        </svg>
      )
    },
    { to: '/lounge-staff/reports', label: 'Reports', icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      )
    },
  ];

  return (
    <aside
      className={`position-fixed top-0 start-0 bg-white border-end ${
        sidebarCollapsed ? 'd-none' : 'd-block'
      } d-md-block d-flex flex-column justify-content-between`}
      style={{ top: '4rem', height: 'calc(100vh - 4rem)', width: '16rem', zIndex: 1020 }}
    >
      <div className="p-3">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>
            <div className="small fw-medium">Lounge Staff</div>
            <div className="text-muted small">staff@platepalette.com</div>
          </div>
        </div>

        <nav className="d-flex flex-column gap-2">
          {navLinks.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`d-flex align-items-center gap-2 px-3 py-2 mt-3 text-decoration-none rounded ${
                location.pathname === to ? 'bg-primary text-white' : 'text-secondary hover-bg-light'
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-3">
        <Button onClick={onLogout} className="w-100" variant="outline">
          <LogOut className="h-4 w-4" /> 
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;