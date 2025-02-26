import React, { useContext, useState } from 'react';
import { Form, Button, Container, Card, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserContext } from '../../../components/user/context/UserContext.jsx';

export default function Image() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { userInfo, loading } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const updateImage = async (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);

        try {
            setIsLoading(true);
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/user/update-image`, formData, {
                headers: {
                    Authorization: `Tariq__${localStorage.getItem('userToken')}`,
                },
            });
            if (response.status === 200) {
                toast.success('Image updated successfully', {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'dark',
                });
            }
        } catch (error) {
            toast.error('Error updating image', {
                position: 'top-right',
                autoClose: 3000,
                theme: 'dark',
            });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file));
    };

    return (
        <Container className="my-5">
            <Card className="shadow-sm" style={{ borderRadius: '10px', border: 'none' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4" style={{ color: '#FFCF50', fontWeight: 'bold' }}>
                        Update Profile Image
                    </Card.Title>
                    {isLoading ? (
                        <div className="text-center">
                            <Spinner animation="border" role="status" style={{ color: '#000000' }}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <Form onSubmit={handleSubmit(updateImage)} encType="multipart/form-data">
                            <Form.Group className="mb-3" controlId="UpdateImage">
                                <Form.Label>Choose a new profile image</Form.Label>
                                <Form.Control
                                    type="file"
                                    {...register('image', { required: 'Image is required' })}
                                    onChange={handleImageChange}
                                    isInvalid={!!errors.image}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.image?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="text-center mb-4">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <img
                                        src={userInfo.image?.secure_url}
                                        alt="Profile"
                                        style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                )}
                            </div>
                            <div className="text-center">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={isLoading}
                                    style={{
                                        backgroundColor: '#FFCF50',
                                        border: 'none',
                                        color: '#343a40',
                                        fontWeight: '500',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                    }}
                                >
                                    {isLoading ? 'Updating...' : 'Update Image'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}