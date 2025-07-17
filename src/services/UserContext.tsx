import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUsers } from './userApi';
import type { User } from './userApi';

interface UserContextType {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      const userData = await fetchUsers(100);
      setUsers(userData);
      setLoading(false);
    };
    loadUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, selectedUser, setSelectedUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
