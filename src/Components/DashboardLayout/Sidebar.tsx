import React from 'react';
import '../../styles/Sidebar.scss';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-switch-org">
          {/* Switch Organization Icon */}
          <span className="sidebar-icon">{/* <SwitchOrgIcon /> */}</span>
          <span className="sidebar-text">Switch Organization</span>
          <span className="sidebar-caret">{/* <CaretDownIcon /> */}</span>
        </li>
        <li className="sidebar-link">
          {/* Dashboard Icon */}
          <span className="sidebar-icon">{/* <DashboardIcon /> */}</span>
          <span className="sidebar-text">Dashboard</span>
        </li>
        <li className="sidebar-section">CUSTOMERS</li>
        <li className="sidebar-link active">
          {/* Users Icon */}
          <span className="sidebar-icon">{/* <UsersIcon /> */}</span>
          <span className="sidebar-text">Users</span>
        </li>
        <li className="sidebar-link">
          {/* Guarantors Icon */}
          <span className="sidebar-icon">{/* <GuarantorsIcon /> */}</span>
          <span className="sidebar-text">Guarantors</span>
        </li>
        <li className="sidebar-link">
          {/* Loans Icon */}
          <span className="sidebar-icon">{/* <LoansIcon /> */}</span>
          <span className="sidebar-text">Loans</span>
        </li>
        <li className="sidebar-link">
          {/* Decision Models Icon */}
          <span className="sidebar-icon">{/* <DecisionModelsIcon /> */}</span>
          <span className="sidebar-text">Decision Models</span>
        </li>
        <li className="sidebar-link">
          {/* Savings Icon */}
          <span className="sidebar-icon">{/* <SavingsIcon /> */}</span>
          <span className="sidebar-text">Savings</span>
        </li>
        <li className="sidebar-link">
          {/* Loan Requests Icon */}
          <span className="sidebar-icon">{/* <LoanRequestsIcon /> */}</span>
          <span className="sidebar-text">Loan Requests</span>
        </li>
        <li className="sidebar-link">
          {/* Whitelist Icon */}
          <span className="sidebar-icon">{/* <WhitelistIcon /> */}</span>
          <span className="sidebar-text">Whitelist</span>
        </li>
        <li className="sidebar-link">
          {/* Karma Icon */}
          <span className="sidebar-icon">{/* <KarmaIcon /> */}</span>
          <span className="sidebar-text">Karma</span>
        </li>
        <li className="sidebar-section">BUSINESSES</li>
        <li className="sidebar-link">
          {/* Organization Icon */}
          <span className="sidebar-icon">{/* <OrganizationIcon /> */}</span>
          <span className="sidebar-text">Organization</span>
        </li>
        <li className="sidebar-link">
          {/* Loan Products Icon */}
          <span className="sidebar-icon">{/* <LoanProductsIcon /> */}</span>
          <span className="sidebar-text">Loan Products</span>
        </li>
        <li className="sidebar-link">
          {/* Savings Products Icon */}
          <span className="sidebar-icon">{/* <SavingsProductsIcon /> */}</span>
          <span className="sidebar-text">Savings Products</span>
        </li>
        <li className="sidebar-link">
          {/* Fees and Charges Icon */}
          <span className="sidebar-icon">{/* <FeesChargesIcon /> */}</span>
          <span className="sidebar-text">Fees and Charges</span>
        </li>
        <li className="sidebar-link">
          {/* Transactions Icon */}
          <span className="sidebar-icon">{/* <TransactionsIcon /> */}</span>
          <span className="sidebar-text">Transactions</span>
        </li>
        <li className="sidebar-link">
          {/* Services Icon */}
          <span className="sidebar-icon">{/* <ServicesIcon /> */}</span>
          <span className="sidebar-text">Services</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
