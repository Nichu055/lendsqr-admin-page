import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, blacklistUser, activateUser } from '../services/userApi';
import type { User as UserType } from '../services/userApi';
import { useToast } from '../components/ToastContext';
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
  const [updating, setUpdating] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(100);
  const { showToast } = useToast();

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      // Load more users for pagination (500 total)
      const userData = await fetchUsers(500);
      setUsers(userData);
      setFilteredUsers(userData);
      setLoading(false);
    };

    loadUsers();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setActiveDropdown(null); // Close any open dropdowns
    }
  };

  const handleUsersPerPageChange = (count: number) => {
    setUsersPerPage(count);
    setCurrentPage(1); // Reset to first page
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

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
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleViewUserDetails = (userId: string) => {
    navigate(`/dashboard/users/userdetails?id=${userId}`);
  };

  const handleBlacklistUser = async (userId: string) => {
    try {
      setUpdating(userId);
      await blacklistUser(userId);
      
      // Get the user name for toast message
      const user = users.find(u => u.id === userId);
      const userName = user ? `${user.firstName} ${user.lastName}` : 'User';
      
      // Refresh the users list
      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, status: 'Blacklisted' } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setActiveDropdown(null);
      
      showToast(`${userName} has been blacklisted successfully`, 'success');
    } catch (error) {
      console.error('Error blacklisting user:', error);
      showToast('Failed to blacklist user. Please try again.', 'error');
    } finally {
      setUpdating(null);
    }
  };

  const handleActivateUser = async (userId: string) => {
    try {
      setUpdating(userId);
      await activateUser(userId);
      
      // Get the user name for toast message
      const user = users.find(u => u.id === userId);
      const userName = user ? `${user.firstName} ${user.lastName}` : 'User';
      
      // Refresh the users list
      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, status: 'Active' } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setActiveDropdown(null);
      
      showToast(`${userName} has been activated successfully`, 'success');
    } catch (error) {
      console.error('Error activating user:', error);
      showToast('Failed to activate user. Please try again.', 'error');
    } finally {
      setUpdating(null);
    }
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
            {currentUsers.map((user, idx) => (
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
                    disabled={updating === user.id}
                  >
                    {updating === user.id ? '...' : '⋮'}
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
                      <div 
                        className="user-dropdown-item"
                        onClick={() => handleBlacklistUser(user.id)}
                      >
                        <span className="dropdown-icon">
                          <img src={BlacklistUser} alt="Blacklist User" />
                        </span>
                        Blacklist User
                      </div>
                      <div 
                        className="user-dropdown-item"
                        onClick={() => handleActivateUser(user.id)}
                      >
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
          <div className="table-info">
            Showing{' '}
            <select 
              className="user-table-select"
              value={usersPerPage}
              onChange={(e) => handleUsersPerPageChange(Number(e.target.value))}
            >
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={150}>150</option>
              <option value={200}>200</option>
            </select>{' '}
            out of {filteredUsers.length}
          </div>
          <div className="user-table-pagination">
            <button 
              className="pagination-nav"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            
            {generatePageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="user-table-ellipsis">...</span>
                ) : (
                  <button 
                    className={`user-table-page ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page as number)}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
            
            <button 
              className="pagination-nav"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;