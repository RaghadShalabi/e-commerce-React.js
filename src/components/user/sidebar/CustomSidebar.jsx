import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import style from './sidebar.module.css';

export default function CustomSidebar() {
    return (
        <Sidebar className={style.sidebar}>
            <Menu>
                <MenuItem component={<Link to="/profile/info" />}> Info</MenuItem>
                <MenuItem component={<Link to="/profile/orders" />}> Orders</MenuItem>
            </Menu>
        </Sidebar>
    )
}
