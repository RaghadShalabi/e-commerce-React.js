import { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserContext } from '../context/UserContext.jsx';

export default function CustomNavbar() {
    const { userInfo, setUserInfo, getUser } = useContext(UserContext);

    const { cartCount, getCart } = useContext(CartContext);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('userToken');
        setUserInfo(null);
        navigate('auth/login');
    }

    useEffect(() => {
        getUser();
        getCart();
    }, []);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Raghad Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to={'/'} >Home</Nav.Link>
                        <Nav.Link as={Link} to={'/categories'} >Categories</Nav.Link>
                        <Nav.Link as={Link} to={'/products'} >Products</Nav.Link>
                        {userInfo ? (
                            <>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Welcome {userInfo?.userName}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={'/profile'}>Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Nav.Link as={Link} to={'/cart'} >Cart {cartCount}</Nav.Link>
                            </>
                        ) : (
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Account
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={'/auth/login'}>Login</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={'/auth/register'}>Register</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
