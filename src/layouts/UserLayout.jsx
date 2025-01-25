import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomNavbar from '../components/user/navbar/Navbar.jsx'

export default function UserLayout() {
    return (
        <>
            <CustomNavbar />
            <Outlet />
        </>
    )
}
