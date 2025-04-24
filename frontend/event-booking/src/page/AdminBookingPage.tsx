import  { useEffect, useState } from "react";
import { api } from "../services/api.service";
import "./css/Admin.css"; // Import this CSS file

const AdminBookingPage = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/admin/book");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  const cancelBooking = async (id: string) => {
    try {
      await api.delete(`/book/${id}`);
      setBookings((prev) => prev.filter((b) => b["id"] !== id));
    } catch (err) {
      console.error("Failed to cancel booking", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="admin-booking-container">
      <h1 className="admin-booking-heading">Admin Bookings</h1>

      <div className="grid gap-4">
        {bookings.map((booking: any) => (
          <div key={booking.id} className="booking-card">
            <p><strong>Event ID:</strong> {booking.eventId}</p>
            <p><strong>User:</strong> {booking.userId}</p>
            <button
              onClick={() => cancelBooking(booking.id)}
              className="cancel-btn"
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookingPage;
