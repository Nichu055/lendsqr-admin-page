import React, { useState } from 'react';
import '../styles/Login.scss'
import Main_Logo from '../assets/LoginLogo/Ledsqr_Logo.svg'
import PIC_LOGO from '../assets/LoginLogo/pablo_signin.svg'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // logic for handling login
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="login-container">
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
            
            <button type="submit" className="login-button">
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;