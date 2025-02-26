import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, Form, FloatingLabel, Row, Col } from 'react-bootstrap';

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const loginUser = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signin`, data);
            if (response.status === 200) {
                localStorage.setItem("userToken", response.data.token);
                toast.success('Login successful!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred', {
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
            setServerError(error.response?.data?.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPasswordClick = () => {
        navigate('/auth/send-code');
    };

    const handleCreateAccountClick = () => {
        navigate('/auth/register');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <div className="text-center mb-4">
                        <h2 style={{ color: '#FFCF50', fontWeight: 'bold' }}>Log in to your account</h2>
                        <p style={{ color: '#6c757d' }}>Please enter your credentials to login.</p>
                    </div>

                    <Form onSubmit={handleSubmit(loginUser)} className="p-4 border rounded shadow-sm bg-white">
                        {serverError && <div className='text-danger mb-3 text-center'>{serverError}</div>}

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

                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder=""
                                {...register('password', { required: "Password is required" })}
                                isInvalid={!!errors.password}
                                style={{ borderRadius: '10px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="d-grid mb-3">
                            <Button type="submit" size="lg" disabled={isLoading} style={{ borderRadius: '10px', border: 'none', background: '#FFCF50' }}>
                                {isLoading ? "Loading..." : "Login"}
                            </Button>
                        </div>

                        <div className="text-center">
                            <Button variant="link" onClick={handleForgotPasswordClick} className="text-decoration-none" style={{ color: '#FFCF50' }}>
                                Forgot Your Password?
                            </Button>
                        </div>

                        <div className="text-center mt-3">
                            <p style={{ color: '#6c757d' }}>No account?{' '}
                                <Button variant="link" onClick={handleCreateAccountClick} className="text-decoration-none" style={{ color: '#FFCF50', padding: '0' }}>
                                    Create one here
                                </Button>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}