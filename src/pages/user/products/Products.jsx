import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [expandedProductId, setExpandedProductId] = useState(null);

    const getProducts = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`, {
                params: {
                    search: searchTerm,
                    sort: sortOrder,
                    page: page,
                    limit: limit,
                },
                headers: {
                    Authorization: `Tariq__${token}`,
                },
            });
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
    }, [searchTerm, sortOrder, page, limit]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
    };

    const toggleProductDetails = (productId) => {
        if (expandedProductId === productId) {
            setExpandedProductId(null); // Collapse if the same product is clicked again
        } else {
            setExpandedProductId(productId); // Expand the clicked product
        }
    };

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

            <Row className="mb-4">
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Col>
                <Col md={4}>
                    <Form.Select value={sortOrder} onChange={handleSortChange}>
                        <option value="">Sort by</option>
                        <option value="price">Price: Low to High</option>
                        <option value="-price">Price: High to Low</option>
                        <option value="name">Name: A to Z</option>
                        <option value="-name">Name: Z to A</option>
                        <option value="discount">Discount</option>
                        <option value="-discount">-Discount</option>
                    </Form.Select>
                </Col>
                <Col md={4}>
                    <Form.Select value={limit} onChange={handleLimitChange}>
                        <option value={12}>12 per page</option>
                        <option value={24}>24 per page</option>
                        <option value={50}>50 per page</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row>
                {products.map((product) => (
                    <Col key={product._id} md={4} className="mb-4">
                        <div className="product text-center p-3 border rounded shadow-sm bg-white">
                            <div onClick={() => toggleProductDetails(product._id)} style={{ cursor: 'pointer' }}>
                                <img
                                    src={product.mainImage.secure_url}
                                    alt={product.name}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                                />
                                <h4 className="mt-3" style={{ color: '#343a40', fontWeight: '500' }}>
                                    {product.name}
                                </h4>
                                <p style={{ color: '#6c757d' }}>
                                    {/* Old Price with Strikethrough and Red Color */}
                                    <span style={{ textDecoration: 'line-through', color: 'red', marginRight: '10px' }}>
                                        ${product.price}
                                    </span>
                                    {/* New Price (After Discount) in Black */}
                                    <span style={{ color: 'black', fontWeight: 'bold' }}>
                                        ${product.finalPrice}
                                    </span>
                                </p>
                            </div>

                            {/* Expanded Details */}
                            {expandedProductId === product._id && (
                                <div className="mt-3">
                                    <p style={{ color: '#6c757d' }}>Discount: {product.discount}%</p>
                                    <p style={{ color: '#6c757d' }}>Stock: {product.stock}</p>
                                    <Link to={`/product/${product._id}`} className="btn btn-secondary mt-3">
                                        View Details
                                    </Link>
                                </div>
                            )}
                        </div>
                    </Col>
                ))}
            </Row>

            <Row className="mt-4">
                <Col className="d-flex justify-content-center">
                    <Button
                        variant="outline-primary"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <span className="mx-3 d-flex align-items-center">Page {page}</span>
                    <Button
                        variant="outline-primary"
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}