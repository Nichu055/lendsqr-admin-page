import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import DashboardOutlet from './components/DashboardLayout/DashboardOutlet';
import User from './pages/User';

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
      ],
    },
  ]);
  return (
    <RouterProvider router={routes}></RouterProvider>
  );
};

export default App;
