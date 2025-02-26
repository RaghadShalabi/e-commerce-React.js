import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // استيراد Link للروابط الداخلية
import './Footer.css'; // ملف CSS مخصص للتعديلات

export default function Footer() {
    return (
        <footer className="footer bg-dark text-white py-5">
            <Container>
                <Row>
                    {/* About Us Section */}
                    <Col md={4} className="mb-4">
                        <h5 className="footer-title">About Us</h5>
                        <p className="footer-text">
                            We are a leading e-commerce platform offering a wide range of products to meet your needs.
                        </p>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </Col>

                    {/* Quick Links Section */}
                    <Col md={4} className="mb-4">
                        <h5 className="footer-title">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/" className="footer-link">Home</Link>
                            </li>
                            <li>
                                <Link to="/categories" className="footer-link">Categories</Link>
                            </li>
                            <li>
                                <Link to="/products" className="footer-link">Products</Link>
                            </li>
                        </ul>
                    </Col>

                    {/* Contact Us Section */}
                    <Col md={4} className="mb-4">
                        <h5 className="footer-title">Contact Us</h5>
                        <p className="footer-text">Email: raghad@rshop.com</p>
                        <p className="footer-text">Phone: +123 456 7890</p>
                        <p className="footer-text">Address: 123 Tulkarm, Palestine</p>
                    </Col>
                </Row>
            </Container>

            {/* Footer Bottom */}
            <div className="footer-bottom text-center py-3 bg-secondary">
                <p className="mb-0">&copy; {new Date().getFullYear()} Raghad Shop. All rights reserved.</p>
            </div>
        </footer>
    );
}