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
                <Col xs={12} md={6} className="mx-auto">
                    <h2 className="text-center mb-4">Send Verification Code</h2>
                    <Form onSubmit={handleSubmit(handleSendCode)} className="p-4 border rounded shadow-sm bg-light">
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder=""
                                {...register('email', { required: "Email address is required" })}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <div className="d-grid">
                            <Button type="submit" variant="primary" size="lg" disabled={isLoading}>
                                {isLoading ? "Sending..." : "Send Code"}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}