import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Newsletter() {
    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <h2 style={{ color: '#FFCF50', fontWeight: 'bold' }}>Subscribe to Our Newsletter</h2>
                    <p style={{ color: '#6c757d' }}>Get the latest updates and special offers.</p>
                    <form>
                        <input type="email" placeholder="Enter your email" className="form-control mb-3" />
                        <button type="submit" className="btn" style={{ backgroundColor: '#FFCF50', color: '#343a40', fontWeight: '500' }}>
                            Subscribe
                        </button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}