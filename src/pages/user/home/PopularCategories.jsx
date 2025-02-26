import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function PopularCategories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch active categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://ecommerce-node4.onrender.com/categories/active?page=1&limit=3');
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
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

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4" style={{ color: '#FFCF50', fontWeight: 'bold' }}>Popular Categories</h2>
            <Row>
                {categories.map(category => (
                    <Col key={category._id} md={4} className="mb-4">
                        <Card className="text-center p-3 border rounded shadow-sm bg-white">
                            <Link to={`/categories/${category._id}`} className="text-decoration-none">
                                <img
                                    src={category.image.secure_url}
                                    alt={category.name}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: '150px', objectFit: 'cover' }}
                                />
                                <h4 className="mt-3" style={{ color: '#343a40', fontWeight: '500' }}>{category.name}</h4>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}