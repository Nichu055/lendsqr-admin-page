import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import DashboardOutlet from './components/DashboardLayout/DashboardOutlet';
import User from './pages/User';
import NotFound from './pages/NotFound';
import UserDetails from './pages/UserDetails';

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
    <RouterProvider router={routes}></RouterProvider>
  );
};

export default App;
