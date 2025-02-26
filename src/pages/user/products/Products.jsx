import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products?limit=10`);
            setProducts(response.data.products);
            console.log(response.data.products);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
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
            <h2 className="text-center mb-4" style={{ color: '#FFCF50', fontWeight: 'bold' }}>All Products</h2>
            <Row>
                {products.map(product => (
                    <Col key={product._id} md={4} className="mb-4">
                        <div className="product text-center p-3 border rounded shadow-sm bg-white">
                            <Link to={`/product/${product._id}`} className="text-decoration-none">
                                <img src={product.mainImage.secure_url} alt={product.name} className="img-fluid rounded" style={{ maxHeight: '200px', objectFit: 'cover' }} />
                                <h4 className="mt-3" style={{ color: '#343a40', fontWeight: '500' }}>{product.name}</h4>
                            </Link>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}