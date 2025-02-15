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
                toast.success('Password reset successfully!');
                navigate('/auth/login');
            }
        } catch (error) {
            toast.error('Failed to reset password.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col xs={12} md={6} className="mx-auto">
                    <h2 className="text-center mb-4">Reset Password</h2>
                    <Form onSubmit={handleSubmit(resetPassword)} className="p-4 border rounded shadow-sm bg-light">
                        <FloatingLabel controlId="floatingInput" label="Verification Code" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder=""
                                {...register('code', { required: "Verification code is required" })}
                                isInvalid={!!errors.code}
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
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <div className="d-grid">
                            <Button type="submit" variant="primary" size="lg" disabled={isLoading}>
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}