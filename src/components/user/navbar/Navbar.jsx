import { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserContext } from '../context/UserContext.jsx';
import { FaShoppingCart } from 'react-icons/fa';

export default function CustomNavbar() {
    const { userInfo, setUserInfo, getUser } = useContext(UserContext);
    const { cartCount, getCart } = useContext(CartContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('userToken');
        setUserInfo(null);
        navigate('/auth/login');
    };

    useEffect(() => {
        getUser();
        getCart();
    }, []);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/" style={{ color: '#FFCF50', fontWeight: 'bold' }}>
                    Raghad Shop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to={'/'} style={{ color: '#343a40', fontWeight: '500' }}>
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to={'/categories'} style={{ color: '#343a40', fontWeight: '500' }}>
                            Categories
                        </Nav.Link>
                        <Nav.Link as={Link} to={'/products'} style={{ color: '#343a40', fontWeight: '500' }}>
                            Products
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {userInfo ? (
                            <>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        variant="success"
                                        id="dropdown-basic"
                                        style={{
                                            background: '#FFCF50',
                                            border: 'none',
                                            color: '#343a40',
                                            fontWeight: '500',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                        }}
                                    >
                                        Welcome {userInfo.image?.secure_url && (
                                            <img
                                                src={userInfo.image.secure_url}
                                                alt="User"
                                                style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        )}
                                        {userInfo?.userName}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={'/profile'} style={{ color: '#343a40' }}>
                                            Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={logout} style={{ color: '#343a40' }}>
                                            Log out
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Nav.Link as={Link} to={'/cart'} style={{ color: '#343a40', fontWeight: '500', position: 'relative' }}>
                                    <FaShoppingCart />
                                    {cartCount > 0 && (
                                        <span
                                            style={{
                                                position: 'absolute',
                                                top: '-1px',
                                                right: '-10px',
                                                backgroundColor: 'red',
                                                color: 'white',
                                                borderRadius: '54%',
                                                padding: '2px 8px',
                                                fontSize: '12px',
                                            }}
                                        >
                                            {cartCount}
                                        </span>
                                    )}
                                </Nav.Link>
                            </>
                        ) : (
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="success"
                                    id="dropdown-basic"
                                    style={{ background: '#FFCF50', border: 'none', color: '#343a40', fontWeight: '500' }}
                                >
                                    Account
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={'/auth/login'} style={{ color: '#343a40' }}>
                                        Login
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to={'/auth/register'} style={{ color: '#343a40' }}>
                                        Register
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}