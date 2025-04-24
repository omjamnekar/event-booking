// src/App.tsx

// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
import HomePage from './page/HomePage'; 
import RegisterPage from './page/RegisterPage';
import EventBooking from './page/EventBooking'; 
import LoginPage from './page/LoginPage';
import AuthGate from "./components/AuthGate";
import UserDashboardPage from './page/DashboardPage';
import ProtectedRoute from "./components/ProtectedRoute";
import CreateEventPage from './page/CreateEvent';
import AdminBookingPage from './page/AdminBookingPage';
import EventList from './page/EventList';


const App = () => {
  
  return (
    <Router>
    <Routes>
  <Route path="/" element={<AuthGate />} />
  <Route path="/login" element={<LoginPage />} />
  {/* <Route path="/register" element={<RegisterPage />} /> */}
  <Route path="/create-event" element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>} />

<Route path="/register" element={<RegisterPage />} />
<Route path="/admin/bookings" element={<AdminBookingPage />} />
<Route path="/events" element={<EventList />} />


  <Route path="/dashboard" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
  <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
  <Route path="/event/:id" element={<ProtectedRoute><EventBooking /></ProtectedRoute>} />
</Routes>

    </Router>
  );
};

export default App;
