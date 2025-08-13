import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import UserTable from '@/components/admin/UserTable';
import { fetchUsers } from '@/redux/slices/admin/userSlice';
import { useAuthCheck } from '@/hooks/useAuthCheck';

const UserManagement = () => {
  useAuthCheck();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid py-3 animate__animated animate__fadeIn">
      <div className="shadow p-5 rounded-4" style={{ backgroundColor: '#f9f9f9', border: '1px solid #1F3A77' }}>
        <div className="text-center mb-5">
          <h2 className="fw-bold">👥 User Management</h2>
          <p>Manage your users efficiently with search functionality.</p>
        </div>

        <div className="row align-items-center mb-4 g-3">
          <div>
            <div className="position-relative">
              <Search size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3"/>
              <input
                type="text"
                className="form-control ps-5 shadow-sm"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-muted">Loading users...</p>
        ) : error ? (
          <p className="text-center text-danger">Error: {error}</p>
        ) : filteredUsers.length > 0 ? (
          <div className="animate__animated animate__fadeInUp">
            <UserTable users={filteredUsers} />
          </div>
        ) : (
          <div className="text-center py-5 border rounded">
            <div className="mb-3">
              <Search size={28} />
            </div>
            <h5>No users found</h5>
            <p>Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
