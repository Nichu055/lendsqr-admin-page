import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import '../../styles/DashboardOutlet.scss';

const DashboardOutlet: React.FC = () => {
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const orgDropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (orgDropdownRef.current && !orgDropdownRef.current.contains(event.target as Node)) {
        setOrgDropdownOpen(false);
      }
    }
    if (orgDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [orgDropdownOpen]);

  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-main">
        <aside className="sidebar">
          <ul className="sidebar-list">
            <li
              className="sidebar-switch-org"
              ref={orgDropdownRef}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <span className="sidebar-icon">{/* <SwitchOrgIcon /> */}</span>
              <span className="sidebar-text">Switch Organization</span>
              <button
                className="sidebar-caret"
                style={{
                  display: 'inline-block',
                  background: 'none',
                  border: 'none',
                  marginLeft: 'auto',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  transform: orgDropdownOpen ? 'rotate(180deg)' : 'none'
                }}
                aria-label="Toggle organization dropdown"
                onClick={e => {
                  e.stopPropagation();
                  setOrgDropdownOpen(open => !open);
                }}
                tabIndex={0}
              >
                {/* <CaretDownIcon /> */}
                ▼
              </button>
            </li>
            {orgDropdownOpen && (
              <li className="sidebar-dashboard">
                <span className="sidebar-icon">{/* <HomeIcon /> */}</span>
                <span className="sidebar-text">Dashboard</span>
              </li>
            )}
            <li className="sidebar-section">CUSTOMERS</li>
            <li className="sidebar-link active">
              <span className="sidebar-icon">{/* <UsersIcon /> */}</span>
              <span className="sidebar-text">Users</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">{/* <GuarantorsIcon /> */}</span>
              <span className="sidebar-text">Guarantors</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">{/* <LoansIcon /> */}</span>
              <span className="sidebar-text">Loans</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">{/* <DecisionModelsIcon /> */}</span>
              <span className="sidebar-text">Decision Models</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">{/* <SavingsIcon /> */}</span>
              <span className="sidebar-text">Savings</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">{/* <LoanRequestsIcon /> */}</span>
              <span className="sidebar-text">Loan Requests</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">{/* <WhitelistIcon /> */}</span>
              <span className="sidebar-text">Whitelist</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">{/* <KarmaIcon /> */}</span>
              <span className="sidebar-text">Karma</span>
            </li>
            <li className="sidebar-section">BUSINESSES</li>
            <li className="sidebar-link">
              <span className="sidebar-icon">{/* <OrganizationIcon /> */}</span>
              <span className="sidebar-text">Organization</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">{/* <LoanProductsIcon /> */}</span>
              <span className="sidebar-text">Loan Products</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">{/* <SavingsProductsIcon /> */}</span>
              <span className="sidebar-text">Savings Products</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">{/* <FeesChargesIcon /> */}</span>
              <span className="sidebar-text">Fees and Charges</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">{/* <TransactionsIcon /> */}</span>
              <span className="sidebar-text">Transactions</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">{/* <ServicesIcon /> */}</span>
              <span className="sidebar-text">Services</span>
            </li>
          </ul>
        </aside>
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardOutlet;
