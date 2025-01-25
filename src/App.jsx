import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout.jsx';
import Login from './pages/user/login/Login.jsx';
import Register from './pages/user/register/Register.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import { ToastContainer } from 'react-toastify';
import Categories from './pages/user/categories/Categories.jsx';
import Home from './pages/user/home/Home.jsx';
import UserLayout from './layouts/UserLayout.jsx';
import Products from './pages/user/products/Products.jsx';
import CategoryProducts from './pages/user/products/CategoryProducts.jsx';
import ProductDetails from './pages/user/products/ProductDetails.jsx';

export default function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "/auth/register",
            element: <Register />,
          },
          {
            path: "/auth/login",
            element: <Login />,
          },
        ],
      },
      {
        path: "/",
        element: <UserLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/categories",
            element: <Categories />,

          },
          {
            path: "/products",
            element: <Products />,
          },
          {
            path:"/categories/:categoryId",
            element: <CategoryProducts />,
          },
          {
            path:"/product/:productId",
            element: <ProductDetails />,
          }
        ]
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          // Add more routes here for dashboard
        ],
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
