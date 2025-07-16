import React, { useState } from 'react';
import '../styles/User.scss';
import UserSummary from '../components/UserSummary';
import FilterDropdown from '../components/FilterDropdown';
import ViewDetails from '../assets/UsersTable/ViewDetails.svg'
import BlacklistUser from '../assets/UsersTable/BlacklistUser.svg'
import ActivateUser from '../assets/UsersTable/ActivateUser.svg'

interface FilterValues {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

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
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleFilter = (filters: FilterValues) => {
    let filtered = users;
    
    if (filters.organization) {
      filtered = filtered.filter(user => 
        user.organization.toLowerCase().includes(filters.organization.toLowerCase())
      );
    }
    
    if (filters.username) {
      filtered = filtered.filter(user => 
        user.username.toLowerCase().includes(filters.username.toLowerCase())
      );
    }
    
    if (filters.email) {
      filtered = filtered.filter(user => 
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    
    if (filters.status) {
      filtered = filtered.filter(user => user.status === filters.status);
    }
    
    if (filters.phoneNumber) {
      filtered = filtered.filter(user => 
        user.phone.includes(filters.phoneNumber)
      );
    }
    
    setFilteredUsers(filtered);
  };

  return (
    <div className="user-page">
      <h2 className="user-title">Users</h2>
      <UserSummary />
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>
                ORGANIZATION
                <FilterDropdown onFilter={handleFilter} />
              </th>
              <th>
                USERNAME
                <FilterDropdown onFilter={handleFilter} />
              </th>
              <th>
                EMAIL
                <FilterDropdown onFilter={handleFilter} />
              </th>
              <th>
                PHONE NUMBER
                <FilterDropdown onFilter={handleFilter} />
              </th>
              <th>
                DATE JOINED
                <FilterDropdown onFilter={handleFilter} />
              </th>
              <th>
                STATUS
                <FilterDropdown onFilter={handleFilter} />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, idx) => (
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
                <td className="user-actions">
                  <button
                    className="user-menu-button"
                    onClick={() => toggleDropdown(idx)}
                  >
                    ⋮
                  </button>
                  {activeDropdown === idx && (
                    <div className="user-dropdown">
                      <div className="user-dropdown-item">
                        <span className="dropdown-icon">
                          <img src={ViewDetails} alt="View Details" />
                        </span>
                        View Details
                      </div>
                      <div className="user-dropdown-item">
                        <span className="dropdown-icon">
                          <img src={BlacklistUser} alt="Blacklist User" />
                        </span>
                        Blacklist User
                      </div>
                      <div className="user-dropdown-item">
                        <span className="dropdown-icon">
                          <img src={ActivateUser} alt="Activate User" />
                        </span>
                        Activate User
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="user-table-footer">
          <div>
            Showing{' '}
            <select className="user-table-select">
              <option>100</option>
            </select>{' '}
            out of 100
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