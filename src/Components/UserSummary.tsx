import React from 'react';
import '../styles/UserSummary.scss';
import UsersIcon from '../assets/UserSummary/Users.svg';
import ActiveUserIcon from '../assets/UserSummary/ActiveUsers.svg';
import UsersLoans from '../assets/UserSummary/UsersLoans.svg';
import UsersSavingIcons from '../assets/UserSummary/UserSavings.svg';

const userSummaryData = [
  {
    label: 'USERS',
    value: '2,453',
    icon: UsersIcon,
  },
  {
    label: 'ACTIVE USERS',
    value: '2,453',
    icon: ActiveUserIcon,
  },
  {
    label: 'USERS WITH LOANS',
    value: '12,453',
    icon: UsersLoans,
  },
  {
    label: 'USERS WITH SAVINGS',
    value: '102,453',
    icon: UsersSavingIcons,
  },
];

const UserSummary: React.FC = () => (
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

export default UserSummary;
