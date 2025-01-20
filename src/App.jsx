import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout.jsx';
import Login from './pages/user/login/Login.jsx';
import Register from './pages/user/register/Register.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import { ToastContainer } from 'react-toastify';

export default function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
      },
    ],
  );
  return (
    <>
      <ToastContainer />  {/* To display toast messages */}
      <RouterProvider router={router} />
    </>
  )
}
