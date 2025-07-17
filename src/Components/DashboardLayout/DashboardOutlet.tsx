import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import '../../styles/DashboardOutlet.scss';
import SwitchOrganizationIcon from '../../assets/SidebarLogo/Switch_organization.svg';
import DashboardIcon from '../../assets/SidebarLogo/Dashboard.svg';
import UsersIcon from '../../assets/SidebarLogo/Users.svg';
import GuarantorsIcon from '../../assets/SidebarLogo/Guarantors.svg';
import LoansIcon from '../../assets/SidebarLogo/Loans.svg';
import DecisionModelsIcon from '../../assets/SidebarLogo/Decision_Models.svg';
import SavingsIcon from '../../assets/SidebarLogo/Savings.svg';
import LoanRequestsIcon from '../../assets/SidebarLogo/Loan_Requests.svg';
import WhitelistIcon from '../../assets/SidebarLogo/Whitelist.svg';
import KarmaIcon from '../../assets/SidebarLogo/Karma.svg';
import SystemDmIcon from '../../assets/SidebarLogo/SystemsMessages.svg';
import LogOut from '../../assets/SidebarLogo/Logout.svg';


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
              <span className="sidebar-icon">
                <img src={SwitchOrganizationIcon} alt="Switch Organization" />
              </span>
              <span className="sidebar-text">Switch Organization</span>
              <button
                className="sidebar-caret"
                style={{
                  display: 'inline-block',
                  background: 'none',
                  border: 'none',
                  marginLeft: '0',
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
                ▼
              </button>
            </li>
            {/* {orgDropdownOpen && ()} */}
          
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={DashboardIcon} alt="Dashboard" />
              </span>
              <span className="sidebar-text">Dashboard</span>
            </li>
            <li className="sidebar-section">CUSTOMERS</li>
            <li className="sidebar-link active">
              <span className="sidebar-icon">
                <img src={UsersIcon} alt="Users" />
              </span>
              <span className="sidebar-text">Users</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={GuarantorsIcon} alt="Guarantors" />
              </span>
              <span className="sidebar-text">Guarantors</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={LoansIcon} alt="Loans" />
              </span>
              <span className="sidebar-text">Loans</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={DecisionModelsIcon} alt="Decision Models" />
              </span>
              <span className="sidebar-text">Decision Models</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={SavingsIcon} alt="Savings" />
              </span>
              <span className="sidebar-text">Savings</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={LoanRequestsIcon} alt="Loan Requests" />
              </span>
              <span className="sidebar-text">Loan Requests</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={WhitelistIcon} alt="Whitelist" />
              </span>
              <span className="sidebar-text">Whitelist</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={KarmaIcon} alt="Karma" />
              </span>
              <span className="sidebar-text">Karma</span>
            </li>
            <li className="sidebar-section">BUSINESSES</li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={SwitchOrganizationIcon} alt="Organization" />
              </span>
              <span className="sidebar-text">Organization</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={LoansIcon} alt="Loan Products" />
              </span>
              <span className="sidebar-text">Loan Products</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={SavingsIcon} alt="Savings Products" />
              </span>
              <span className="sidebar-text">Savings Products</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={KarmaIcon} alt="Fees and Charges" />
              </span>
              <span className="sidebar-text">Fees and Charges</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={DecisionModelsIcon} alt="Transactions" />
              </span>
              <span className="sidebar-text">Transactions</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={WhitelistIcon} alt="Services" />
              </span>
              <span className="sidebar-text">Services</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={UsersIcon} alt="Service Account" />
              </span>
              <span className="sidebar-text">Service Account</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={DashboardIcon} alt="Settlements" />
              </span>
              <span className="sidebar-text">Settlements</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={LoansIcon} alt="Reports" />
              </span>
              <span className="sidebar-text">Reports</span>
            </li>
            <li className="sidebar-section">SETTINGS</li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={SwitchOrganizationIcon} alt="Preferences" />
              </span>
              <span className="sidebar-text">Preferences</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={KarmaIcon} alt="Fees and Pricing" />
              </span>
              <span className="sidebar-text">Fees and Pricing</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={DecisionModelsIcon} alt="Audit Logs" />
              </span>
              <span className="sidebar-text">Audit Logs</span>
            </li>
            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={SystemDmIcon} alt="Systems Messages" />
              </span>
              <span className="sidebar-text">Systems Messages</span>
            </li>

            <li className="sidebar-line"></li>

            <li className="sidebar-link">
              <span className="sidebar-icon">
                <img src={LogOut} alt="Logout" />
              </span>
              <span className="sidebar-text">Logout</span>
            </li>
            <li className="sidebar-link" style={{ marginTop: '1em' }}>
              <span className="sidebar-text">v1.2.0</span>
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
