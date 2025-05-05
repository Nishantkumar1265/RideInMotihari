import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import './login.css';
import Header from './Header';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // ✅ Import eye icons

function UserLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // ✅ toggle for password
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? 'login' : 'register';
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { ...formData };

    try {
      const res = await axiosInstance.post(`/users/${endpoint}`, payload);

      localStorage.setItem("token", res.data.user.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user_id", res.data.user.user_id);

      if (isLogin) {
        navigate('/user-home');
      } else {
        setIsLogin(true);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        (err.response?.status === 404
          ? 'User not found'
          : 'An error occurred. Please try again.');
      setError(errorMessage);
    }
  };

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-card">
          <div className="dashboard-header">
            <h1>{isLogin ? "User Login" : "User Registration"}</h1>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <form onSubmit={handleSubmit}>
            {isLogin ? (
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button type="submit" className="primary-btn">Login</button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Username"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <input
                  type="text"
                  name="location"
                  placeholder="City"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="primary-btn">Register</button>
              </>
            )}
          </form>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-btn"
          >
            {isLogin ? "New here? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
