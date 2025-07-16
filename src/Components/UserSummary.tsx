import React from 'react';

interface UserSummaryItem {
  label: string;
  value: string;
  // icon?: React.ReactNode;
}

interface UserSummaryProps {
  items: UserSummaryItem[];
}

const UserSummary: React.FC<UserSummaryProps> = ({ items }) => (
  <div className="user-summary-row">
    {items.map((item, idx) => (
      <div className="user-summary-card" key={item.label}>
        <div className={`user-summary-icon user-summary-icon-${idx}`}>
          {/* Place for icon: {item.icon} */}
        </div>
        <div className="user-summary-label">{item.label}</div>
        <div className="user-summary-value">{item.value}</div>
      </div>
    ))}
  </div>
);

export default UserSummary;
