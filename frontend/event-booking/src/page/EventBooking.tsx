// src/pages/EventBooking.tsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookEvent, cancelBooking } from '../services/api.service';

const EventBooking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBook = async () => {
    try {
      const data = await bookEvent(Number(id));
      setMessage(data.message || 'Event booked successfully!');
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to book event.');
      setMessage(null);
    }
  };

  const handleCancel = async () => {
    try {
      const data = await cancelBooking(Number(id));
      setMessage(data.message || 'Booking cancelled successfully!');
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to cancel booking.');
      setMessage(null);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Event Booking</h2>
      <p>Event ID: {id}</p>

      <button onClick={handleBook} style={{ marginRight: '10px' }}>Book Event</button>
      <button onClick={handleCancel}>Cancel Booking</button>

      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default EventBooking;
