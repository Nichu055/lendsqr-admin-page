import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import '../styles/Login.scss'
import Main_Logo from '../assets/LoginLogo/Ledsqr_Logo.svg'
import PIC_LOGO from '../assets/LoginLogo/pablo_signin.svg'
import Toast from '../components/Toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  // Email validation
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password validation (min 6 chars)
  const isValidPassword = (password: string) =>
    password.length >= 6;

  // logic for handling login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setToast({ message: 'Please enter both email and password.', type: 'error' });
      return;
    }
    if (!isValidEmail(email)) {
      setToast({ message: 'Please enter a valid email address.', type: 'error' });
      return;
    }
    if (!isValidPassword(password)) {
      setToast({ message: 'Password must be at least 6 characters.', type: 'error' });
      return;
    }
    
    try {
      await login({ email, password });
      setToast({ message: 'Login successful!', type: 'success' });
      setTimeout(() => {
        navigate('/dashboard/users');
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setToast({ message: errorMessage, type: 'error' });
    }
  };

  return (
    <div className="login-container">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="login-left">
        <div className="logo">
          <img src={Main_Logo} alt="Logo" className="logo-image" />
        </div>
        <div className="hero-image">
          <img src={PIC_LOGO} alt="Login" className="hero-img" />
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-form-container">
          <h1 className="welcome-title">Welcome!</h1>
          <p className="login-subtitle">Enter details to login.</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            {/* {error && <div className="error-message">{error}</div>} */}
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
            
            <a href="#" className="forgot-password">FORGOT PASSWORD?</a>
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Signing in...' : 'LOG IN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;