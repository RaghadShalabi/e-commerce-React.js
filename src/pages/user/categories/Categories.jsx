import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`);
            setCategories(response.data.categories);
            console.log(response.data.categories);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (categories.length === 0) {
        return (
            <Container className="text-center py-5">
                <h2>No categories found.</h2>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4" style={{ color: '#FFCF50', fontWeight: 'bold' }}>Categories</h2>
            <Row>
                {categories.map(category => (
                    <Col key={category._id} md={4} className="mb-4">
                        <Card
                            className="text-center p-3 border rounded shadow-sm bg-white"
                            style={{
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <Link to={`/categories/${category._id}`} className="text-decoration-none">
                                <img
                                    src={category?.image.secure_url}
                                    alt={category.name}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                                />
                                <h3 className="mt-3" style={{ color: '#343a40', fontWeight: '500' }}>{category.name}</h3>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}