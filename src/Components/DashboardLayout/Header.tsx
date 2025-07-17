import React, { useState, useRef, useEffect } from 'react';
import '../../styles/Header.scss';
import Bell from '../../assets/DashboardHeaderLogo/Bell_Notification.svg';
import Avatar from '../../assets/DashboardHeaderLogo/Avatar.svg';
import Logo from '../../assets/LoginLogo/Ledsqr_Logo.svg';
import Search from '../../assets/DashboardHeaderLogo/Search_Logo.svg';

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button 
          className="mobile-menu-toggle"
          onClick={onMobileMenuToggle}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <img
          src={Logo}
          alt="lendsqr logo"
          className="header-logo-img"
        />
      </div>
      <div className="header-search">
        <input
          type="text"
          className="header-search-input"
          placeholder="Search for anything"
        />
        <button className="header-search-btn" aria-label="Search">
          <img src={Search} alt="Search" className="header-search-icon" />
        </button>
      </div>
      <div className="header-right">
        <button className="header-bell" aria-label="Notifications">
          <img src={Bell} alt="Bell Notification" className="header-bell-img" />
        </button>
        <div className="header-user" ref={dropdownRef}>
          <img src={Avatar} alt="User Avatar" className="header-avatar" />
          <span
            className="header-username"
            onClick={() => setDropdownOpen((open) => !open)}
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            Adedeji
          </span>
          <svg
            className="header-dropdown-arrow"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              marginLeft: 2,
              cursor: 'pointer',
              transform: dropdownOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s'
            }}
            onClick={() => setDropdownOpen((open) => !open)}
          >
            <path d="M1 1L6 6L11 1" stroke="#213F7D" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {dropdownOpen && (
            <div className="header-dropdown">
              <button className="header-dropdown-item">
                Docs
              </button>
              <button className="header-dropdown-item" onClick={() => {/* handle logout here */}}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;