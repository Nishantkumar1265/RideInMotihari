import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css';
import axiosInstance from '../../utils/axiosInstance';

function AdminHome() {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axiosInstance.get('/service-providers/providers');
        setProviders(response.data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users/all');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchProviders();
    fetchUsers();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.patch(`/service-providers/providers/${id}/status`, { status: newStatus });

      setProviders(prev =>
        prev.map(provider =>
          provider.provider_id === id ? { ...provider, status: newStatus } : provider
        )
      );
    } catch (error) {
      console.error('Error updating status:', error.response?.data || error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axiosInstance.delete(`/users/${id}`);
      setUsers(prev => prev.filter(user => user.user_id !== id));
    } catch (error) {
      console.error('Error deleting user:', error.response?.data || error.message);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const admin = JSON.parse(localStorage.getItem('admin'));
    const userId = admin?.id;

    if (token || userId) {
      try {
        await axiosInstance.post('/auth/logout', {}, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'user-id': userId
          }
        });

        console.log('Admin logged out successfully');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }

    localStorage.clear();
    navigate('/adminlogin');
  };

  return (
    <div className="user-home-container">
      <header className="user-header">
        <h2>Welcome Admin</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <section className="providers-section">
        <h2>Registered Users</h2>
        <table className="bookings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Userame</th>
              <th>Email</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.location}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.user_id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="providers-section">
        <h2>Service Provider List</h2>
        <table className="bookings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {providers.map(provider => (
              <tr key={provider.provider_id}>
                <td>{provider.provider_id}</td>
                <td>{provider.name}</td>
                <td>{provider.email}</td>
                <td>{provider.mobile_no}</td>
                <td>{provider.location}</td>
                <td>
                  <select
                    value={provider.status}
                    onChange={e => handleStatusChange(provider.provider_id, e.target.value)}
                    className="status-dropdown"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminHome;
