import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./css/dashboard.css";

import { useNavigate } from "react-router-dom"

const UserDashboardPage: React.FC = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/book/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, []);

return (
  <div className="container">
    <h2>Your Bookings</h2>
    {bookings.length > 0 ? (
      bookings.map((booking: any) => (
        <div key={booking.id} className="booking-card">
          <h3 className="booking-title">{booking.event.title}</h3>
          <p className="booking-details">Date: {new Date(booking.event.date).toLocaleDateString()}</p>
          <button
            className="view-event-btn"
            onClick={() => navigate(`/event/${booking.event.id}`)}
          >
            View Event
          </button>
        </div>
      ))
    ) : (
      <p className="no-bookings">No bookings yet.</p>
    )}
    <button onClick={() => navigate("/create-event")} className="create-event-btn">
      Create New Event
    </button>
  </div>
);

};

export default UserDashboardPage;
