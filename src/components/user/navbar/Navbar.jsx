import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserContext } from '../context/UserContext.jsx';

export default function CustomNavbar() {
    const { userInfo, setUserInfo } = useContext(UserContext);

    const { cartCount } = useContext(CartContext);

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('userToken');
        setUserInfo(null);
        navigate('auth/login');
    }

    return (

        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Raghad Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to={'/categories'} >Categories</Nav.Link>
                        <Nav.Link as={Link} to={'/products'} >Products</Nav.Link>
                        <Nav.Link as={Link} to={'/cart'} >Cart {cartCount}</Nav.Link>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Welcome {userInfo?.userName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={'/profile'}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
