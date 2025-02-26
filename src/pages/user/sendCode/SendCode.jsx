import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, Form, FloatingLabel, Row, Col } from 'react-bootstrap';

export default function SendCode() {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const handleSendCode = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/auth/sendcode`, {
                email: data.email
            });
            if (response.status === 200) {
                toast.success('Verification code sent successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate('/auth/forgot-password', { state: { email: data.email } });
            }
        } catch (error) {
            toast.error('Failed to send verification code.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <div className="text-center mb-4">
                        <h2 style={{ color: '#FFCF50', fontWeight: 'bold' }}>Send Verification Code</h2>
                        <p style={{ color: '#6c757d' }}>Please enter your email to receive a verification code.</p>
                    </div>

                    <Form onSubmit={handleSubmit(handleSendCode)} className="p-4 border rounded shadow-sm bg-white">
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder=""
                                {...register('email', { required: "Email address is required" })}
                                isInvalid={!!errors.email}
                                style={{ borderRadius: '10px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="d-grid mb-3">
                            <Button type="submit" size="lg" disabled={isLoading} style={{ borderRadius: '10px', border: 'none', background: '#FFCF50' }}>
                                {isLoading ? "Sending..." : "Send Code"}
                            </Button>
                        </div>

                        <div className="text-center mt-3">
                            <p style={{ color: '#6c757d' }}>Remember your password?{' '}
                                <Button variant="link" onClick={() => navigate('/auth/login')} className="text-decoration-none" style={{ color: '#FFCF50', padding: '0' }}>
                                    Log in here
                                </Button>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}