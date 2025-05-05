import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { useForm } from 'react-hook-form';
import './ServiceProviderHome.css';
import Header from './../Login/Header'; 

function ServiceProviderHome() {
  const navigate = useNavigate();
  const [providerDetails, setProviderDetails] = useState(null);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editMode, setEditMode] = useState(null);

  const providerId = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const res = await axiosInstance.get(`/service-providers/providers/${providerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProviderDetails(res.data);
      } catch (error) {
        console.error('Failed to fetch provider details:', error);
      }
    };

    const fetchServiceTypes = async () => {
      try {
        const res = await axiosInstance.get(`/service-types/${providerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServiceTypes(res.data);
      } catch (error) {
        console.error('Failed to fetch service types:', error);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get(`/bookings/provider/${providerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchProviderDetails();
    fetchServiceTypes();
    fetchBookings();
  }, [providerId, token]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout', {}, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'user-id': providerId
        }
      });
      console.log('Provider logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
    }

    localStorage.clear();
    navigate('/serviceproviderlogin');
  };

  const onSubmit = async (data) => {
    try {
      if (editMode !== null) {
        await axiosInstance.put(`/service-types/${editMode}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      } else {
        await axiosInstance.post('/service-types', { ...data, provider_id: providerId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      }

      reset();
      setEditMode(null);

      const updated = await axiosInstance.get(`/service-types/${providerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServiceTypes(updated.data);
    } catch (err) {
      console.error('Error saving service type:', err);
    }
  };

  const handleEdit = (type) => {
    setValue('service_type', type.service_type);
    setValue('company_name', type.company_name);
    setValue('model_name', type.model_name);
    setEditMode(type.service_type_id);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/service-types/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServiceTypes(serviceTypes.filter((type) => type.service_type_id !== id));
    } catch (err) {
      console.error('Error deleting service type:', err);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axiosInstance.put(`/bookings/${bookingId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const res = await axiosInstance.get(`/bookings/provider/${providerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Error updating booking status:', err);
    }
  };

  return (
    <>
    <Header /> {/* ✅ Placed the header at the top */}
    <div className="provider-dashboard">
      <header className="dashboard-header">
        <h1>    </h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <div className="top-section">
        <div className="provider-info">
          {providerDetails ? (
            <div className="info-card">
              <h2>Your Profile</h2>
              <p><strong>Username:</strong> {providerDetails.name}</p>
              <p><strong>Email:</strong> {providerDetails.email}</p>
              <p><strong>Mobile No:</strong> {providerDetails.mobile_no}</p>
              <p><strong>City:</strong> {providerDetails.location}</p>
              <p><strong> Verification Status:</strong> {providerDetails.status}</p>
              <p><strong>Registered At:</strong> {new Date(providerDetails.registered_at).toLocaleString()}</p>
            </div>
          ) : (
            <p>Loading your details...</p>
          )}
        </div>

        <div className="add-service">
          <h2>{editMode !== null ? 'Edit Service Type' : 'Add Service Type'}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="service-form">
            <select {...register('service_type')} required>
              <option value="">Select Service Type</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
              <option value="car (4-seater)">Car (4-seater)</option>
            </select>
            <input type="text" placeholder="Company Name" {...register('company_name')} required />
            <input type="text" placeholder="Model Name" {...register('model_name')} required />
            <button type="submit">{editMode !== null ? 'Update' : 'Add'}</button>
          </form>
        </div>
      </div>

      <div className="service-list">
        <h2>Your Registered Services</h2>
        <div className="service-grid">
          {serviceTypes.length > 0 ? (
            serviceTypes.map((type) => (
              <div key={type.service_type_id} className="service-card">
                <p><strong>Type:</strong> {type.service_type}</p>
                <p><strong>Company:</strong> {type.company_name}</p>
                <p><strong>Model:</strong> {type.model_name}</p>
                <button onClick={() => handleEdit(type)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(type.service_type_id)} className="delete-btn">Delete</button>
              </div>
            ))
          ) : (
            <p>No services registered yet.</p>
          )}
        </div>
      </div>

      <div className="my-bookings">
        <h2>Service Status</h2>
        {bookings.length > 0 ? (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Pickup</th>
                <th>Drop</th>
                <th>Distance</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Booked At</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.booking_id}>
                  <td>{booking.booking_id}</td>
                  <td>{booking.pickup_location}</td>
                  <td>{booking.drop_location}</td>
                  <td>{booking.distance} km</td>
                  <td>₹{booking.cost}</td>
                  <td>{booking.status}</td>
                  <td>{new Date(booking.booked_at).toLocaleString()}</td>
                  <td>
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.booking_id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
    </>
  );
}

export default ServiceProviderHome;
