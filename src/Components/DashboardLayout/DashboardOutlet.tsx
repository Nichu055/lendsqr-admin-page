import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Header from './Header';
import '../../styles/Sidebar.scss';

const sidebarLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { section: 'CUSTOMERS' },
  { label: 'Users', to: '/users' },
  { label: 'Guarantors', to: '/guarantors' },
  { label: 'Loans', to: '/loans' },
  { label: 'Decision Models', to: '/decision-models' },
  { label: 'Savings', to: '/savings' },
  { label: 'Loan Requests', to: '/loan-requests' },
  { label: 'Whitelist', to: '/whitelist' },
  { label: 'Karma', to: '/karma' },
  { section: 'BUSINESSES' },
  { label: 'Organization', to: '/organization' },
  { label: 'Loan Products', to: '/loan-products' },
  { label: 'Savings Products', to: '/savings-products' },
  { label: 'Fees and Charges', to: '/fees-charges' },
  { label: 'Transactions', to: '/transactions' },
  { label: 'Services', to: '/services' },
];

const DashboardOutlet: React.FC = () => (
  <div className="dashboard-layout">
    <Header />
    <div className="dashboard-main">
      <aside className="sidebar">
        <ul className="sidebar-list">
          <li className="sidebar-switch-org">
            {/* Switch Organization Icon */}
            <span className="sidebar-icon">{/* <SwitchOrgIcon /> */}</span>
            <span className="sidebar-text">Switch Organization</span>
            <span className="sidebar-caret">{/* <CaretDownIcon /> */}</span>
          </li>
          {sidebarLinks.map((item, idx) =>
            item.section ? (
              <li className="sidebar-section" key={item.section + idx}>{item.section}</li>
            ) : (
              <li key={item.label} className="sidebar-link">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? 'sidebar-text active' : 'sidebar-text'
                  }
                  end
                >
                  {/* <SidebarIcon /> */}
                  {item.label}
                </NavLink>
              </li>
            )
          )}
        </ul>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  </div>
);

export default DashboardOutlet;
