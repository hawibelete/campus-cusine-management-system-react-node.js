import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { LogOut } from 'lucide-react';
import { Button } from "./ui/button";

const Sidebar = ({ sidebarCollapsed, onLogout }) => {

  const navLinks = [
    { to: '/admin-dashboard', label: 'Dashboard', icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      )
    },
    { to: '/admin/lounges', label: 'Lounges', icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )
    },
    { to: '/admin/users', label: 'Users', icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    { to: '/admin/feedback', label: 'Feedback', icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5Z" />
          <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
        </svg>
      )
    },
    { to: '/admin/reports', label: 'Reports', icon: (
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
            <div className="small fw-medium">Admin User</div>
            <div className="text-muted small">admin@example.com</div>
          </div>
        </div>

        <nav className="d-flex flex-column gap-2">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `d-flex align-items-center gap-2 px-3 py-2 mt-3 text-decoration-none rounded ${
                  isActive ? 'bg-primary text-white' : 'text-secondary hover-bg-light'
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-3">
        <Button onClick={onLogout} className="w-100" variant="outline">
          <LogOut className="h-4 w-4 me-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;