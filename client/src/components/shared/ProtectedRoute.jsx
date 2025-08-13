// components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const [auth, setAuth] = useState({ checked: false, allowed: false });

  useEffect(() => {
    fetch('/api/auth/me', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setAuth({
          checked: true,
          allowed: allowedRoles.includes(data.role),
        });
      })
      .catch(() => {
        setAuth({ checked: true, allowed: false });
      });
  }, [allowedRoles]);

  if (!auth.checked) return <div>Loading...</div>;

  return auth.allowed ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
