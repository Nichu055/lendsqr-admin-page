import React, { useState, useRef, useEffect } from 'react';
import '../styles/FilterDropdown.scss';
import Filter from '../assets/UsersTable/filterbutton.svg';

interface FilterDropdownProps {
  onFilter: (filters: FilterValues) => void;
}

interface FilterValues {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: ''
  });
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll on mobile when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (field: keyof FilterValues, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilter = () => {
    onFilter(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetFilters = {
      organization: '',
      username: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: ''
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <>
      <div className="filter-dropdown" ref={dropdownRef}>
        <button 
          className="filter-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={Filter} alt="Filter" />
        </button>
        
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <div className="filter-backdrop" onClick={() => setIsOpen(false)}></div>
            
            <div className="filter-dropdown-content">
              {/* Mobile close button */}
              <button 
                className="filter-close-mobile"
                onClick={() => setIsOpen(false)}
                aria-label="Close filter"
              >
                ×
              </button>
              
              <div className="filter-field">
                <label>Organization</label>
                <select 
                  value={filters.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Lendsqr">Lendsqr</option>
                  <option value="Irorun">Irorun</option>
                </select>
              </div>

              <div className="filter-field">
                <label>Username</label>
                <input 
                  type="text"
                  placeholder="User"
                  value={filters.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                />
              </div>

              <div className="filter-field">
                <label>Email</label>
                <input 
                  type="email"
                  placeholder="Email"
                  value={filters.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div className="filter-field">
                <label>Date</label>
                <input 
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>

              <div className="filter-field">
                <label>Phone Number</label>
                <input 
                  type="tel"
                  placeholder="Phone Number"
                  value={filters.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                />
              </div>

              <div className="filter-field">
                <label>Status</label>
                <select 
                  value={filters.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Blacklisted">Blacklisted</option>
                </select>
              </div>

              <div className="filter-actions">
                <button 
                  type="button" 
                  className="filter-reset"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button 
                  type="button" 
                  className="filter-apply"
                  onClick={handleFilter}
                >
                  Filter
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FilterDropdown;
