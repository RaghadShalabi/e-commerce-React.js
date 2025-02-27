import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Spinner, Form } from 'react-bootstrap';
import { Slide, toast } from 'react-toastify';
import { CartContext } from '../../../components/user/context/CartContext.jsx';

export default function ProductDetails() {
    const navigate = useNavigate();
    const { productId } = useParams();

    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { cartCount, setCartCount } = useContext(CartContext);

    const getDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${productId}`);
            console.log(response.data.product);
            setProduct(response.data.product);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const addProductToCart = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/cart`,
                { productId: product._id },
                {
                    headers: {
                        Authorization: `Tariq__${token}`,
                    },
                }
            );
            if (response.status === 201) {
                toast.success('Product added successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    transition: Slide,
                });
                setCartCount(cartCount + 1);
                navigate('/cart');
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const submitReview = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/products/${productId}/review`,
                { comment, rating },
                {
                    headers: {
                        Authorization: `Tariq__${token}`,
                    },
                }
            );
            if (response.status === 201) {
                toast.success('Review submitted successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'dark',
                });
                // تحديث تفاصيل المنتج بعد إضافة التقييم
                getDetails();
            }
        } catch (error) {
            toast.error('Failed to submit review', {
                position: 'top-right',
                autoClose: 3000,
                theme: 'dark',
            });
            console.error(error);
        }
    };

    useEffect(() => {
        getDetails();
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
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="p-4 border rounded shadow-sm bg-white">
                        <Row>
                            <Col md={6}>
                                <Card.Img
                                    variant="top"
                                    src={product.mainImage.secure_url}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                                />
                            </Col>
                            <Col md={6}>
                                <Card.Body>
                                    <Card.Title style={{ color: '#343a40', fontWeight: 'bold', fontSize: '2rem' }}>
                                        {product.name}
                                    </Card.Title>
                                    <Card.Text style={{ color: '#6c757d', fontSize: '1.1rem' }}>
                                        {product.description}
                                    </Card.Text>
                                    <Button
                                        onClick={addProductToCart}
                                        style={{
                                            backgroundColor: '#FFCF50',
                                            border: 'none',
                                            color: '#343a40',
                                            fontWeight: '500',
                                            padding: '10px 20px',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>

                    {/* قسم إضافة التقييم */}
                    <Card className="mt-4 p-4 border rounded shadow-sm bg-white">
                        <Card.Title style={{ color: '#343a40', fontWeight: 'bold' }}>Add a Review</Card.Title>
                        <Form>
                            <Form.Group className="mb-3" controlId="formRating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    placeholder="Enter rating (1-5)"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formComment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Enter your comment"
                                />
                            </Form.Group>
                            <Button
                                onClick={submitReview}
                                style={{
                                    backgroundColor: '#FFCF50',
                                    border: 'none',
                                    color: '#343a40',
                                    fontWeight: '500',
                                    padding: '10px 20px',
                                    borderRadius: '10px',
                                }}
                            >
                                Submit Review
                            </Button>
                        </Form>
                    </Card>

                    {/* عرض التقييمات الحالية */}
                    <Card className="mt-4 p-4 border rounded shadow-sm bg-white">
                        <Card.Title style={{ color: '#343a40', fontWeight: 'bold' }}>Reviews: </Card.Title>
                        {product.reviews && product.reviews.length > 0 ? (
                            product.reviews.map((review, index) => (
                                <Card key={index} className="mb-3">
                                    <Card.Body>
                                        <Card.Text>
                                           <strong>Rating:</strong> {review.rating}
                                        </Card.Text>
                                        <Card.Text>
                                      <strong>  {review.createdBy.userName}: </strong> {review.comment}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <Card.Text>No reviews yet.</Card.Text>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}