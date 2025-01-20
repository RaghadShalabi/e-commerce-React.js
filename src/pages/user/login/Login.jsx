import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';

export default function login() {

    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const loginUser = async (value) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signin`, value);
            if (response.status === 200) {
                localStorage.setItem("userToken", response.data.token);
                navigate(`/`);
            } else {
                alert('Failed to login user');
            }
            console.log(response);
            console.log(value);
        } catch (error) {
            console.error(error);
            setServerError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <Form onSubmit={handleSubmit(loginUser)}>
                {serverError ? <div className='text-danger'>{serverError}</div> : null}
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
                    {isLoading ? "Loading..." : "Login"}
                </Button>
            </Form>
        </>
    )
}