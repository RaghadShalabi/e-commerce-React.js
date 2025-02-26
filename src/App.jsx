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
import Cart from './pages/user/cart/Cart.jsx';
import ProtectedRoute from './components/user/ProtectedRoute.jsx';
import CartContextProvider from './components/user/context/CartContext.jsx';
import Profile from './pages/user/profile/Profile.jsx';
import Info from './pages/user/profile/Info.jsx';
import Orders from './pages/user/profile/Orders.jsx';
import { UserContextProvider } from './components/user/context/UserContext.jsx';
import Image from './pages/user/profile/Image.jsx';
import AuthProtectedRouter from './components/user/AuthProtectedRouter.jsx';
import ForgotPassword from './pages/user/forgetPassword/ForgetPassword.jsx';
import SendCode from './pages/user/sendCode/SendCode.jsx';
import CreateOrder from './pages/user/order/CreateOrder.jsx';

export default function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/auth",
        element:
          <UserContextProvider>
            <CartContextProvider>

              <AuthProtectedRouter>
                <AuthLayout />
              </AuthProtectedRouter>
            </CartContextProvider>
          </UserContextProvider>
        ,
        children: [
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "send-code",
            element: <SendCode />,
          },
          {
            path: "forgot-password", // مسار جديد لصفحة "نسيت كلمة المرور"
            element: <ForgotPassword />,
          },
        ],
      },
      {
        path: "/",
        element:
          <UserContextProvider>
            <CartContextProvider>
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            </CartContextProvider>
          </UserContextProvider>
        ,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "categories/:categoryId",
            element: <CategoryProducts />,
          },
          {
            path: "product/:productId",
            element: <ProductDetails />,
          },
          {
            path: "cart",
            element: <Cart />
          },
          {
            path: "createOrder",
            element: <CreateOrder />
          },
          {
            path: "profile",
            element: <Profile />,
            children: [
              {
                path: "info",
                element: <Info />
              },
              {
                path: "orders",
                element: <Orders />
              },
              {
                path: "image",
                element: <Image />
              }
            ]
          }
        ]
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />
        , children: [
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
