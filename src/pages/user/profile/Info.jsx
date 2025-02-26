import React, { useContext } from 'react';
import { UserContext } from '../../../components/user/context/UserContext.jsx';
import { Card, Spinner, Container } from 'react-bootstrap';

export default function Info() {
    const { userInfo, loading } = useContext(UserContext);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Spinner animation="border" role="status" style={{ color: '#000000' }}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Card className="shadow-sm" style={{ borderRadius: '10px', border: 'none' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4" style={{ color: '#FFCF50', fontWeight: 'bold' }}>
                        User Profile
                    </Card.Title>
                    <Card.Text>
                        <strong>Name:</strong> {userInfo.userName}
                    </Card.Text>
                    <Card.Text>
                        <strong>Email:</strong> {userInfo.email}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}