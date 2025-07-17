import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../services/userApi';
import type { User as UserType } from '../services/userApi';
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

const User: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const userData = await fetchUsers(100);
      setUsers(userData);
      setFilteredUsers(userData);
      setLoading(false);
    };

    loadUsers();
  }, []);

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

  const handleViewUserDetails = (userId: string) => {
    navigate(`/dashboard/users/userdetails?id=${userId}`);
  };

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

  if (loading) {
    return (
      <div className="user-page">
        <div className="loading-spinner">Loading users...</div>
      </div>
    );
  }

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
            {filteredUsers.map((user, idx) => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>
                  <span 
                    className="clickable-text"
                    onClick={() => handleViewUserDetails(user.id)}
                  >
                    {user.username}
                  </span>
                </td>
                <td>
                  <span 
                    className="clickable-text"
                    onClick={() => handleViewUserDetails(user.id)}
                  >
                    {user.email}
                  </span>
                </td>
                <td>{user.phone}</td>
                <td>{user.dateJoined}</td>
                <td>
                  <span className={`user-status ${statusClass(user.status)}`}>
                    {user.status}
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
                      <div 
                        className="user-dropdown-item"
                        onClick={() => handleViewUserDetails(user.id)}
                      >
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