import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, Form, FloatingLabel, Row, Col } from 'react-bootstrap';

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const resetPassword = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/auth/forgotPassword`, {
                email: email,
                password: data.password,
                code: data.code
            });
            if (response.status === 200) {
                toast.success('Password reset successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate('/auth/login');
            }
        } catch (error) {
            toast.error('Failed to reset password.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <div className="text-center mb-4">
                        <h2 style={{ color: '#FFCF50', fontWeight: 'bold' }}>Reset Password</h2>
                        <p style={{ color: '#6c757d' }}>Please enter your verification code and new password.</p>
                    </div>

                    <Form onSubmit={handleSubmit(resetPassword)} className="p-4 border rounded shadow-sm bg-white">
                        <FloatingLabel controlId="floatingInput" label="Verification Code" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder=""
                                {...register('code', { required: "Verification code is required" })}
                                isInvalid={!!errors.code}
                                style={{ borderRadius: '10px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.code?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingInput" label="New Password" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder=""
                                {...register('password', { required: "New password is required" })}
                                isInvalid={!!errors.password}
                                style={{ borderRadius: '10px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="d-grid mb-3">
                            <Button type="submit" size="lg" disabled={isLoading} style={{ borderRadius: '10px', border: 'none', background: '#FFCF50' }}>
                                {isLoading ? "Resetting..." : "Reset Password"}
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