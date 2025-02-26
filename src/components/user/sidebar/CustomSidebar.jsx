import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaUser, FaShoppingCart, FaImage } from 'react-icons/fa';

export default function CustomSidebar() {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <Sidebar
            collapsed={isCollapsed}
            style={{
                height: '100vh',
                backgroundColor: '#343a40',
                color: '#ffffff',
                boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '1rem',
                    backgroundColor: '#2c3136',
                }}
            >
                {isCollapsed ? (
                    <FaChevronRight
                        onClick={toggleCollapse}
                        style={{ cursor: 'pointer', color: '#FFCF50', fontSize: '1.5rem' }}
                    />
                ) : (
                    <FaChevronLeft
                        onClick={toggleCollapse}
                        style={{ cursor: 'pointer', color: '#FFCF50', fontSize: '1.5rem' }}
                    />
                )}
            </div>

            <Menu
                menuItemStyles={{
                    button: {
                        '&:hover': {
                            backgroundColor: '#2c3136',
                        },
                        '&.active': {
                            backgroundColor: '#FFCF50',
                            color: '#343a40',
                        },
                    },
                }}
            >
                <MenuItem
                    icon={<FaUser style={{ marginRight: isCollapsed ? '0' : '10px' }} />}
                    component={<Link to="/profile/info" />}
                >
                    {!isCollapsed && 'Info'}
                </MenuItem>
                <MenuItem
                    icon={<FaShoppingCart style={{ marginRight: isCollapsed ? '0' : '10px' }} />}
                    component={<Link to="/profile/orders" />}
                >
                    {!isCollapsed && 'Orders'}
                </MenuItem>
                <MenuItem
                    icon={<FaImage style={{ marginRight: isCollapsed ? '0' : '10px' }} />}
                    component={<Link to="/profile/image" />}
                >
                    {!isCollapsed && 'Image'}
                </MenuItem>
            </Menu>
        </Sidebar>
    );
}