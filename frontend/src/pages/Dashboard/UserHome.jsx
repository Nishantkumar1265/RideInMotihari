import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import './UserHome.css';
import Header from '../Login/Header';

import carImg from '../../assets/car1.png';
import bikeImg from '../../assets/bike.png';
import autoImg from '../../assets/auto.png';
 

function UserHome() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [providerServices, setProviderServices] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [distance, setDistance] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [userBookings, setUserBookings] = useState([]);

  const userId = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  const isStrongPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){2,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axiosInstance.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserDetails(res.data);
      } catch (err) {
        setError('Failed to load user details');
      }
    };

    const fetchServiceProviders = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get('/service-providers/approvedproviders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServiceProviders(res.data);

        const allTypes = {};
        for (const provider of res.data) {
          const typesRes = await axiosInstance.get(`/service-types/providers/${provider.provider_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          allTypes[provider.provider_id] = typesRes.data;
        }
        setProviderServices(allTypes);
      } catch (err) {
        setError('Failed to load service providers');
      } finally {
        setLoading(false);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get(`/bookings/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserBookings(res.data);
      } catch (err) {
        console.error('Failed to load bookings', err);
      }
    };

    fetchUserDetails();
    fetchServiceProviders();
    fetchBookings();
  }, [userId, token]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout', {}, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'user-id': userId
        }
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.clear();
    navigate('/userlogin');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }

    if (!isStrongPassword(newPassword)) {
      setError('Password must be at least 8 characters long, include at least 1 lowercase, 1 uppercase, 2 digits, and 1 special character.');
      return;
    }

    try {
      await axiosInstance.put(`/users/${userId}/change-password`, { newPassword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Password changed successfully');
      setNewPassword('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Password update failed';
      setError(msg);
    }
  };

  const handleBookNow = (provider, serviceType) => {
    setSelectedProvider(provider);
    setSelectedServiceType(serviceType);
    setPickup('');
    setDrop('');
    setDistance('');
    setShowPopup(true);
  };

  const handleConfirmRide = async () => {
    if (!pickup || !drop || !selectedServiceType || !distance) {
      alert('Please fill all fields');
      return;
    }

    try {
      await axiosInstance.post('/bookings', {
        user_id: userId,
        provider_id: selectedProvider.provider_id,
        pickup_location: pickup,
        drop_location: drop,
        service_type: selectedServiceType,
        distance: parseFloat(distance)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Booking successful!');
      setShowPopup(false);

      const res = await axiosInstance.get(`/bookings/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserBookings(res.data);
    } catch (error) {
      alert('Failed to book ride');
      console.error(error);
    }
  };

  const getServiceImage = (serviceType) => {
    if (serviceType === 'car (4-seater)') return carImg;
    if (serviceType === 'auto') return autoImg;
    if (serviceType === 'bike') return bikeImg;
    return carImg;
  };

  return (
    <>
      <Header />
      <div className="user-home-container">
        <header className="user-header">
          <h2>Welcome, {userDetails?.name}</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setShowChangePasswordPopup(true)} className="logout-btn" style={{ backgroundColor: '#007bff' }}>
              Change Password
            </button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </header>

        <section className="providers-section">
          <h2>Available Services</h2>
          {loading ? (
            <p>Loading providers...</p>
          ) : (
            <div className="providers-cards">
              {serviceProviders.map((provider) => (
                <div key={provider.provider_id} className="provider-card">
                  <h3>{provider.name}</h3>
                  <div className="service-images">
                    {providerServices[provider.provider_id]?.map((type, idx) => (
                      <div key={idx} className="service-type-card">
                        <img
                          src={getServiceImage(type)}
                          alt={type}
                          className="service-image"
                        />
                        
                        <button onClick={() => handleBookNow(provider, type)}>Book Your Ride </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bookings-section">
          <h2>My Bookings</h2>
          {userBookings.length > 0 ? (
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Pickup</th>
                  <th>Drop</th>
                  <th>Distance (km)</th>
                  <th>Cost (₹)</th>
                  <th>Service</th>
                  <th>Booking Status</th>
                  <th>Booked At</th>
                </tr>
              </thead>
              <tbody>
                {userBookings.map((booking) => (
                  <tr key={booking.booking_id}>
                    <td>{booking.pickup_location}</td>
                    <td>{booking.drop_location}</td>
                    <td>{booking.distance}km</td>
                    <td>₹{booking.cost}</td>
                    <td>{booking.service_type}</td>
                    <td>{booking.status}</td>
                    <td>{moment(booking.booked_at).format('DD MMM YYYY, h:mm A')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No bookings found.</p>
          )}
        </section>

        {showPopup && selectedProvider && (
          <div className="popup-overlay">
            <div className="popup-form">
              <h3>Book a Ride with {selectedProvider.name} ({selectedServiceType})</h3>
              <input
                type="text"
                placeholder="Pickup Location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Drop Location"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Distance (in km)"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                required
              />
              <div className="popup-buttons">
                <button onClick={handleConfirmRide}>Confirm</button>
                <button onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showChangePasswordPopup && (
          <div className="popup-overlay">
            <div className="popup-form">
              <h3>Change Password</h3>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="popup-buttons">
                <button onClick={handleChangePassword}>Submit</button>
                <button onClick={() => {
                  setShowChangePasswordPopup(false);
                  setNewPassword('');
                  setError('');
                  setMessage('');
                }}>Cancel</button>
              </div>
              {error && <p className="error">{error}</p>}
              {message && <p className="success">{message}</p>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserHome;
