import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserDetails.scss';

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('General Details');

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

  return (
    <div className="user-details-page">
      {/* Back Button */}
      <button className="back-button" onClick={handleBackToUsers}>
        ← Back to Users
      </button>

      {/* Page Header with Tabs */}
      <div className="user-details-header">
        <div className="header-top">
          <h1 className="page-title">User Details</h1>
          <div className="action-buttons">
            <button className="btn-blacklist">BLACKLIST USER</button>
            <button className="btn-activate">ACTIVATE USER</button>
          </div>
        </div>
      </div>

      {/* User Summary Card */}
      <div className="user-summary-section">
        <div className="user-summary-top">
          <div className="user-profile">
            <div className="user-avatar">
              <span>GE</span>
            </div>
            <div className="user-info">
              <div className="user-name">Grace Effiom</div>
              <div className="user-id">LSQFf587g90</div>
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
            <div className="balance-amount">₦200,000.00</div>
            <div className="bank-info">9912345678/Providus Bank</div>
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
              <div className="details-grid">
                <div className="detail-item">
                  <label>FULL NAME</label>
                  <span>Grace Effiom</span>
                </div>
                <div className="detail-item">
                  <label>PHONE NUMBER</label>
                  <span>07060780922</span>
                </div>
                <div className="detail-item">
                  <label>EMAIL ADDRESS</label>
                  <span>grace@lendsqr.com</span>
                </div>
                <div className="detail-item">
                  <label>BVN</label>
                  <span>07060780922</span>
                </div>
                <div className="detail-item">
                  <label>GENDER</label>
                  <span>Female</span>
                </div>
                <div className="detail-item">
                  <label>MARITAL STATUS</label>
                  <span>Single</span>
                </div>
                <div className="detail-item">
                  <label>CHILDREN</label>
                  <span>None</span>
                </div>
                <div className="detail-item">
                  <label>TYPE OF RESIDENCE</label>
                  <span>Parent's Apartment</span>
                </div>
              </div>
            </section>

            {/* Education and Employment */}
            <section className="details-section">
              <h3 className="section-title">Education and Employment</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>LEVEL OF EDUCATION</label>
                  <span>B.Sc</span>
                </div>
                <div className="detail-item">
                  <label>EMPLOYMENT STATUS</label>
                  <span>Employed</span>
                </div>
                <div className="detail-item">
                  <label>SECTOR OF EMPLOYMENT</label>
                  <span>FinTech</span>
                </div>
                <div className="detail-item">
                  <label>DURATION OF EMPLOYMENT</label>
                  <span>2 years</span>
                </div>
                <div className="detail-item">
                  <label>OFFICE EMAIL</label>
                  <span>grace@lendsqr.com</span>
                </div>
                <div className="detail-item">
                  <label>MONTHLY INCOME</label>
                  <span>₦200,000.00- ₦400,000.00</span>
                </div>
                <div className="detail-item">
                  <label>LOAN REPAYMENT</label>
                  <span>40,000</span>
                </div>
              </div>
            </section>

            {/* Socials */}
            <section className="details-section">
              <h3 className="section-title">Socials</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>TWITTER</label>
                  <span>@grace_effiom</span>
                </div>
                <div className="detail-item">
                  <label>FACEBOOK</label>
                  <span>Grace Effiom</span>
                </div>
                <div className="detail-item">
                  <label>INSTAGRAM</label>
                  <span>@grace_effiom</span>
                </div>
              </div>
            </section>

            {/* Guarantor */}
            <section className="details-section">
              <h3 className="section-title">Guarantor</h3>
              
              {/* First Guarantor */}
              <div className="guarantor-block">
                <div className="details-grid">
                  <div className="detail-item">
                    <label>FULL NAME</label>
                    <span>Debby Ogana</span>
                  </div>
                  <div className="detail-item">
                    <label>PHONE NUMBER</label>
                    <span>07060780922</span>
                  </div>
                  <div className="detail-item">
                    <label>EMAIL ADDRESS</label>
                    <span>debby@gmail.com</span>
                  </div>
                  <div className="detail-item">
                    <label>RELATIONSHIP</label>
                    <span>Sister</span>
                  </div>
                </div>
              <div className="line"></div>
              </div>
              {/* Second Guarantor */}
              <div className="guarantor-block">
                <div className="details-grid">
                  <div className="detail-item">
                    <label>FULL NAME</label>
                    <span>Debby Ogana</span>
                  </div>
                  <div className="detail-item">
                    <label>PHONE NUMBER</label>
                    <span>07060780922</span>
                  </div>
                  <div className="detail-item">
                    <label>EMAIL ADDRESS</label>
                    <span>debby@gmail.com</span>
                  </div>
                  <div className="detail-item">
                    <label>RELATIONSHIP</label>
                    <span>Sister</span>
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
