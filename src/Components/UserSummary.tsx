import React, { useState, useEffect } from 'react';
import { getUserStatistics } from '../services/userApi';
import '../styles/UserSummary.scss';
import UsersIcon from '../assets/UserSummary/Users.svg';
import ActiveUserIcon from '../assets/UserSummary/ActiveUsers.svg';
import UsersLoans from '../assets/UserSummary/UsersLoans.svg';
import UsersSavingIcons from '../assets/UserSummary/UserSavings.svg';

const UserSummary: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    usersWithLoans: 0,
    usersWithSavings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserStatistics = async () => {
      try {
        setLoading(true);
        const statistics = await getUserStatistics();
        setStats(statistics);
      } catch (error) {
        console.error('Error loading user statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserStatistics();
  }, []);

  const userSummaryData = [
    {
      label: 'USERS',
      value: loading ? '...' : stats.totalUsers.toLocaleString(),
      icon: UsersIcon,
    },
    {
      label: 'ACTIVE USERS',
      value: loading ? '...' : stats.activeUsers.toLocaleString(),
      icon: ActiveUserIcon,
    },
    {
      label: 'USERS WITH LOANS',
      value: loading ? '...' : stats.usersWithLoans.toLocaleString(),
      icon: UsersLoans,
    },
    {
      label: 'USERS WITH SAVINGS',
      value: loading ? '...' : stats.usersWithSavings.toLocaleString(),
      icon: UsersSavingIcons,
    },
  ];

  return (
    <div className="user-summary-row">
      {userSummaryData.map((item, idx) => (
        <div className="user-summary-card" key={item.label}>
          <div className={`user-summary-icon user-summary-icon-${idx}`}>
            <img src={item.icon} alt={item.label} />
          </div>
          <div className="user-summary-content">
            <div className="user-summary-label">{item.label}</div>
            <div className="user-summary-value">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserSummary;
