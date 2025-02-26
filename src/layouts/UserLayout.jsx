import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomNavbar from '../components/user/navbar/Navbar.jsx'
import Footer from '../components/user/footer/Footer.jsx'

export default function UserLayout() {
    return (
        <>
            <CustomNavbar />
            <Outlet />
            <Footer/>
        </>
    )
}
