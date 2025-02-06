import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserContext } from '../context/UserContext.jsx';

export default function CustomNavbar() {
    const { userInfo } = useContext(UserContext);

    const { cartCount } = useContext(CartContext);

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
                                <Dropdown.Item href="#/action-2">Log out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
