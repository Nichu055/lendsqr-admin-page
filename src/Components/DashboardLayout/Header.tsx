import React from 'react';
import '../../styles/Header.scss';
import Bell from '../../assets/DashboardHeaderLogo/Bell_Notification.svg';
import Avatar from '../../assets/DashboardHeaderLogo/Avatar.svg';
import Logo from '../../assets/LoginLogo/Ledsqr_Logo.svg';

const Header: React.FC = () => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <img src={Logo} alt="lendsqr logo" className="header-logo-img" />
      </div>
      <div className="header-right">
        <span className="header-docs">Docs</span>
        <button className="header-bell" aria-label="Notifications">
          <img src={Bell} alt="Bell Notification" className="header-bell-img" />
        </button>
        <div className="header-user">
          <img src={Avatar} alt="User Avatar" className="header-avatar" />
          <span className="header-username">AdeDeji</span>
        </div>
      </div>
    </header>
  );
};

export default Header;