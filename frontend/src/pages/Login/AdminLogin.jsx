import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './login.css';
import axiosInstance from '../../utils/axiosInstance';
import Header from './Header'; // ✅ Already imported

function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await axiosInstance.post('/users/login', {
        email: formData.email,
        password: formData.password,
      });

      const { token, role, user_id } = res.data.user;

      if (role !== 'admin') {
        setError('Access denied: Not an admin account');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user_id', user_id);

      navigate('/admin-home');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <>
    <Header /> {/* ✅ Placed the header at the top */ }
    <div className="dashboard-container">
      <div className="dashboard-card admin-card">
        <div className="dashboard-header">
          <h1>Admin Portal</h1>
          
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <button type="submit" className="primary-btn">Login</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default AdminLogin;
