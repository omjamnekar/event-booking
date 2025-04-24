import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, setToken } from '../services/api.service';
import './css/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('omjamn@gmail.com');
  const [password, setPassword] = useState('test123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);
      localStorage.setItem('token', res.token);
      setToken(res.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
