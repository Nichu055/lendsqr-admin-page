import React from 'react';
import '../styles/User.scss';
// import UserSummary from '../components/UserSummary';
// 
const userSummary = [
  {
    label: 'USERS',
    value: '2,453',
    // icon: <UsersIcon />
  },
  {
    label: 'ACTIVE USERS',
    value: '2,453',
    // icon: <ActiveUsersIcon />
  },
  {
    label: 'USERS WITH LOANS',
    value: '12,453',
    // icon: <UsersWithLoansIcon />
  },
  {
    label: 'USERS WITH SAVINGS',
    value: '102,453',
    // icon: <UsersWithSavingsIcon />
  },
];

const users = [
  {
    organization: 'Lendsqr',
    username: 'Adedeji',
    email: 'adedeji@lendsqr.com',
    phone: '08078903721',
    dateJoined: 'May 15, 2020 10:00 AM',
    status: 'Inactive',
  },
  {
    organization: 'Irorun',
    username: 'Debby Ogana',
    email: 'debby2@irorun.com',
    phone: '08167080928',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Pending',
  },
  {
    organization: 'Lendsqr',
    username: 'Grace Effiom',
    email: 'grace@lendsqr.com',
    phone: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Blacklisted',
  },
  {
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phone: '07003309226',
    dateJoined: 'Apr 10, 2020 10:00 AM',
    status: 'Pending',
  },
  {
    organization: 'Lendsqr',
    username: 'Grace Effiom',
    email: 'grace@lendsqr.com',
    phone: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Active',
  },
  {
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phone: '08067080900',
    dateJoined: 'Apr 10, 2020 10:00 AM',
    status: 'Active',
  },
  {
    organization: 'Lendsqr',
    username: 'Grace Effiom',
    email: 'grace@lendsqr.com',
    phone: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Blacklisted',
  },
  {
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phone: '08067080900',
    dateJoined: 'Apr 10, 2020 10:00 AM',
    status: 'Inactive',
  },
  {
    organization: 'Lendsqr',
    username: 'Grace Effiom',
    email: 'grace@lendsqr.com',
    phone: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Inactive',
  },
];

const statusClass = (status: string) => {
  switch (status) {
    case 'Active':
      return 'status-active';
    case 'Pending':
      return 'status-pending';
    case 'Blacklisted':
      return 'status-blacklisted';
    default:
      return 'status-inactive';
  }
};

const User: React.FC = () => {
  return (
    <div className="user-page">
      <h2 className="user-title">Users</h2>
      <div className="user-summary-row">
        {userSummary.map((item, idx) => (
          <div className="user-summary-card" key={item.label}>
            <div className={`user-summary-icon user-summary-icon-${idx}`}>
              {/* Place for icon: {item.icon} */}
            </div>
            <div className="user-summary-label">{item.label}</div>
            <div className="user-summary-value">{item.value}</div>
          </div>
        ))}
      </div>
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>
                ORGANIZATION
                {/* <FilterIcon /> */}
              </th>
              <th>
                USERNAME
                {/* <FilterIcon /> */}
              </th>
              <th>
                EMAIL
                {/* <FilterIcon /> */}
              </th>
              <th>
                PHONE NUMBER
                {/* <FilterIcon /> */}
              </th>
              <th>
                DATE JOINED
                {/* <FilterIcon /> */}
              </th>
              <th>
                STATUS
                {/* <FilterIcon /> */}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={idx}>
                <td>{u.organization}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.dateJoined}</td>
                <td>
                  <span className={`user-status ${statusClass(u.status)}`}>
                    {u.status}
                  </span>
                </td>
                <td>
                  {/* <MoreMenuIcon /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="user-table-footer">
          <div>
            Showing <select className="user-table-select"><option>100</option></select> out of 100
          </div>
          <div className="user-table-pagination">
            {/* <ChevronLeftIcon /> */}
            <button className="user-table-page active">1</button>
            <button className="user-table-page">2</button>
            <button className="user-table-page">3</button>
            <span className="user-table-ellipsis">...</span>
            <button className="user-table-page">15</button>
            <button className="user-table-page">16</button>
            {/* <ChevronRightIcon /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
