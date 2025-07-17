import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import { ToastProvider } from './components/ToastContext';
import Login from './pages/Login';
import DashboardOutlet from './components/DashboardLayout/DashboardOutlet';
import User from './pages/User';
import NotFound from './pages/NotFound';
import UserDetails from './pages/UserDetails';
import './App.css';

const App: React.FC = () => {
  const routes = createBrowserRouter([
    { path: "/",
      element: <Login />
    },
    {
      path: "/dashboard",
      element: <DashboardOutlet />,
      children: [
        {
          path: "users",
          element: <User />
        },
        {
          path: "users/userdetails",
          element: <UserDetails />
        }
      ],
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);
  
  return (
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={routes}></RouterProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
