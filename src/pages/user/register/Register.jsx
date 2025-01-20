import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';

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
                setServerError('server error');
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <Form onSubmit={handleSubmit(registerUser)}>
                {serverError ? <div className='text-danger'>{serverError}</div> : null}
                <FloatingLabel
                    controlId="floatingInput"
                    label="User Name"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="" {...register('userName', { required: "User Name is required" })} />
                    {errors.userName ? <div className='text-danger'>{errors.userName.message}</div> : null}
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="" {...register('email', { required: "Email address is required" })} />
                    {errors.email ? <div className='text-danger'>{errors.email.message}</div> : null}
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Password"
                    className="mb-3"
                >
                    <Form.Control type="password" placeholder="" {...register('password', { required: "Password is required" })} />
                    {errors.password ? <div className='text-danger'>{errors.password.message}</div> : null}
                </FloatingLabel>
                <Button type='submit' variant="primary" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Register"}
                </Button>
            </Form>
        </>
    )
}
