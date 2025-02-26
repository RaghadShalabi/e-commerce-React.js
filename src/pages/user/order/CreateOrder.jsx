import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, Form, FloatingLabel, Row, Col, Spinner } from 'react-bootstrap';
import { CartContext } from '../../../components/user/context/CartContext.jsx';

export default function CreateOrder() {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { setCartCount } = useContext(CartContext);

    const createOrder = async (data) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('userToken'); // جلب التوكن من التخزين المحلي
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/order`,
                data,
                { headers: { Authorization: `Tariq__${token}` } }
            );
            setCartCount(0);

            if (response.status === 201) {
                toast.success('Order created successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'dark',
                });
                navigate('/profile/orders'); // توجيه المستخدم بعد إنشاء الطلب
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred', {
                position: 'top-right',
                autoClose: 3000,
                theme: 'dark',
            });
            setServerError(error.response?.data?.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <h2 className="text-center mb-4" style={{ color: '#FFCF50', fontWeight: 'bold' }}>Create Order</h2>

                    {/* نموذج إنشاء الطلب */}
                    <Form onSubmit={handleSubmit(createOrder)} className="p-4 border rounded shadow-sm bg-white">
                        {serverError && <div className='text-danger mb-3 text-center'>{serverError}</div>}

                        <FloatingLabel controlId="floatingAddress" label="Address" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder=""
                                {...register('address', { required: 'Address is required' })}
                                isInvalid={!!errors.address}
                                style={{ borderRadius: '10px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.address?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingCoupon" label="Coupon Name" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder=""
                                {...register('couponName')}
                                isInvalid={!!errors.couponName}
                                style={{ borderRadius: '10px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.couponName?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPhone" label="Phone Number" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder=""
                                {...register('phone', { required: 'Phone number is required' })}
                                isInvalid={!!errors.phone}
                                style={{ borderRadius: '10px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="d-grid mb-3">
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isLoading}
                                style={{
                                    backgroundColor: '#FFCF50',
                                    border: 'none',
                                    color: '#343a40',
                                    fontWeight: '500',
                                    borderRadius: '10px',
                                }}
                            >
                                {isLoading ? (
                                    <Spinner animation="border" size="sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                ) : (
                                    'Create Order'
                                )}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}