import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Register() {

    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const registerUser = async (value) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signup`, value);
            if (response.status === 201) {
                toast.info('Please check your email', {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
                navigate(`/login`);
            } else {
                alert('Failed to register user');
            }
            console.log(value);
        } catch (error) {
            if (error.response.status == 409) {
                setServerError('Email address already exists');
            } else {
                setServerError('server error, , please try again later!');
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col xs={12} md={6} className="mx-auto">
                    <h2 className="text-center mb-4">Create an account</h2>
                    <Form onSubmit={handleSubmit(registerUser)} className="p-4 border rounded shadow-sm bg-light">
                        {serverError ? <div className='text-danger mb-3 text-center'>{serverError}</div> : null}
                        <FloatingLabel
                            controlId="floatingInput"
                            label="User Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="" {...register('userName', { required: "User Name is required" })} isInvalid={!!errors.userName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.userName?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control type="email" placeholder="" {...register('email', { required: "Email address is required" })} isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Password"
                            className="mb-3"
                        >
                            <Form.Control type="password" placeholder="" {...register('password', { required: "Password is required" })} isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <div className="d-grid">
                            <Button type="submit" variant="primary" size="lg" disabled={isLoading}>
                                {isLoading ? "Loading..." : "Register"}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
