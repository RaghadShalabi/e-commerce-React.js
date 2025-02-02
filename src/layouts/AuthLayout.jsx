import React from 'react'
import CustomNavbar from '../components/user/navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom';
import Footer from '../components/user/footer/Footer.jsx';

export default function AuthLayout() {
    return (
        <div>
            <CustomNavbar />
            <Outlet />
            <Footer/>
        </div>
    )
}
