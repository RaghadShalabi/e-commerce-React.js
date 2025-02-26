import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch products
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://ecommerce-node4.onrender.com/products?page=3&limit=3');
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
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
            <h2 className="text-center mb-4" style={{ color: '#FFCF50', fontWeight: 'bold' }}>Featured Products</h2>
            <Row>
                {products.map(product => (
                    <Col key={product._id} md={4} className="mb-4">
                        <Card className="text-center p-3 border rounded shadow-sm bg-white">
                            <Link to={`/product/${product._id}`} className="text-decoration-none">
                                <img
                                    src={product.mainImage.secure_url}
                                    alt={product.name}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: '150px', objectFit: 'cover' }}
                                />
                                <h4 className="mt-3" style={{ color: '#343a40', fontWeight: '500' }}>{product.name}</h4>
                                <p style={{ color: '#6c757d' }}>${product.price}</p>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}