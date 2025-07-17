import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { User } from '../services/userApi';
import { fetchUserById, blacklistUser, activateUser } from '../services/userApi';
import { useToast } from '../components/ToastContext';
import '../styles/UserDetails.scss';
import BackArrowIcon from '../assets/UsersTable/BackArrow.svg';

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('General Details');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { showToast } = useToast();

  const userId = searchParams.get('id');

  useEffect(() => {
    const loadUser = async () => {
      if (userId) {
        setLoading(true);
        const userData = await fetchUserById(userId);
        setUser(userData);
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  const tabs = [
    'General Details',
    'Documents',
    'Bank Details',
    'Loans',
    'Savings',
    'App and System'
  ];

  const handleBackToUsers = () => {
    navigate('/dashboard/users');
  };

  const handleBlacklistUser = async () => {
    if (!user || updating) return;
    
    try {
      setUpdating(true);
      const updatedUser = await blacklistUser(user.id);
      setUser(updatedUser);
      
      showToast('User has been blacklisted successfully', 'success');
    } catch (error) {
      console.error('Error blacklisting user:', error);
      showToast('Failed to blacklist user. Please try again.', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleActivateUser = async () => {
    if (!user || updating) return;
    
    try {
      setUpdating(true);
      const updatedUser = await activateUser(user.id);
      setUser(updatedUser);
      
      showToast('User has been activated successfully', 'success');
    } catch (error) {
      console.error('Error activating user:', error);
      showToast('Failed to activate user. Please try again.', 'error');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="user-details-page">
        <div className="loading-spinner">Loading user details...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-details-page">
        <div className="error-message">User not found</div>
      </div>
    );
  }

  return (
    <div className="user-details-page">
      {/* Back Button */}
      <button className="back-button" onClick={handleBackToUsers}>
        <img src={BackArrowIcon} alt="Back Arrow" className="back-arrow-icon" />
        Back to Users
      </button>

      {/* Page Header with Tabs */}
      <div className="user-details-header">
        <div className="header-top">
          <h1 className="page-title">User Details</h1>
          <div className="action-buttons">
            <button 
              className="btn-blacklist"
              onClick={handleBlacklistUser}
              disabled={updating || user?.status === 'Blacklisted'}
            >
              {updating ? 'UPDATING...' : 'BLACKLIST USER'}
            </button>
            <button 
              className="btn-activate"
              onClick={handleActivateUser}
              disabled={updating || user?.status === 'Active'}
            >
              {updating ? 'UPDATING...' : 'ACTIVATE USER'}
            </button>
          </div>
        </div>
      </div>

      {/* User Summary Card */}
      <div className="user-summary-section">
        <div className="user-summary-top">
          <div className="user-profile">
            <div className="user-avatar">
              <img src={user.picture} alt={`${user.firstName} ${user.lastName}`} />
            </div>
            <div className="user-info">
              <div className="user-name">{user.firstName} {user.lastName}</div>
              <div className="user-id">{user.id.slice(0, 10)}</div>
            </div>
          </div>
          
          <div className="user-tier">
            <div className="tier-label">User's Tier</div>
            <div className="tier-stars">
              <span className="star filled">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
          </div>

          <div className="user-balance">
            <div className="balance-amount">₦{user.balance.toLocaleString()}.00</div>
            <div className="bank-info">{user.accountNumber}/{user.bankName}</div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="user-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* User Details Content */}
      <div className="user-details-content">
        {activeTab === 'General Details' && (
          <>
            {/* Personal Information */}
            <section className="details-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="details-grid personal-info-grid">
                <div className="detail-item">
                  <label>FULL NAME</label>
                  <span>{user.firstName} {user.lastName}</span>
                </div>
                <div className="detail-item">
                  <label>PHONE NUMBER</label>
                  <span>{user.phone}</span>
                </div>
                <div className="detail-item">
                  <label>EMAIL ADDRESS</label>
                  <span>{user.email}</span>
                </div>
                <div className="detail-item">
                  <label>BVN</label>
                  <span>{user.bvn}</span>
                </div>
                <div className="detail-item">
                  <label>GENDER</label>
                  <span>{user.gender}</span>
                </div>
                <div className="detail-item">
                  <label>MARITAL STATUS</label>
                  <span>{user.personal.maritalStatus}</span>
                </div>
                <div className="detail-item">
                  <label>CHILDREN</label>
                  <span>{user.personal.children}</span>
                </div>
                <div className="detail-item">
                  <label>TYPE OF RESIDENCE</label>
                  <span>{user.personal.residence}</span>
                </div>
              </div>
            </section>

            {/* Education and Employment */}
            <section className="details-section">
              <h3 className="section-title">Education and Employment</h3>
              <div className="details-grid education-employment-grid">
                <div className="detail-item">
                  <label>LEVEL OF EDUCATION</label>
                  <span>{user.employment.level}</span>
                </div>
                <div className="detail-item">
                  <label>EMPLOYMENT STATUS</label>
                  <span>{user.employment.status}</span>
                </div>
                <div className="detail-item">
                  <label>SECTOR OF EMPLOYMENT</label>
                  <span>{user.employment.sector}</span>
                </div>
                <div className="detail-item">
                  <label>DURATION OF EMPLOYMENT</label>
                  <span>{user.employment.duration}</span>
                </div>
                <div className="detail-item">
                  <label>OFFICE EMAIL</label>
                  <span>{user.employment.officeEmail}</span>
                </div>
                <div className="detail-item">
                  <label>MONTHLY INCOME</label>
                  <span>{user.employment.monthlyIncome}</span>
                </div>
                <div className="detail-item">
                  <label>LOAN REPAYMENT</label>
                  <span>{user.employment.loanRepayment}</span>
                </div>
              </div>
            </section>

            {/* Socials */}
            <section className="details-section">
              <h3 className="section-title">Socials</h3>
              <div className="details-grid socials-grid">
                <div className="detail-item">
                  <label>TWITTER</label>
                  <span>{user.social.twitter}</span>
                </div>
                <div className="detail-item">
                  <label>FACEBOOK</label>
                  <span>{user.social.facebook}</span>
                </div>
                <div className="detail-item">
                  <label>INSTAGRAM</label>
                  <span>{user.social.instagram}</span>
                </div>
              </div>
            </section>

            {/* Guarantor */}
            <section className="details-section">
              <h3 className="section-title">Guarantor</h3>
              <div className="guarantor-block">
                <div className="details-grid">
                  <div className="detail-item">
                    <label>FULL NAME</label>
                    <span>{user.guarantor.fullName}</span>
                  </div>
                  <div className="detail-item">
                    <label>PHONE NUMBER</label>
                    <span>{user.guarantor.phoneNumber}</span>
                  </div>
                  <div className="detail-item">
                    <label>EMAIL ADDRESS</label>
                    <span>{user.guarantor.email}</span>
                  </div>
                  <div className="detail-item">
                    <label>RELATIONSHIP</label>
                    <span>{user.guarantor.relationship}</span>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        
        {activeTab !== 'General Details' && (
          <div className="tab-placeholder">
            <p>{activeTab} content will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
