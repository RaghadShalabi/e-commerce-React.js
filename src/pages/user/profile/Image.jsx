import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
        console.log(data);

        const formData = new FormData();
        formData.append('image', data.image[0]);
        console.log(formData);

        formData.forEach((value, key) => {
            console.log(value);
        })
        try {
            setIsLoading(true);
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/user/update-image`, formData,
                {
                    headers: {
                        Authorization: `Tariq__${localStorage.getItem('userToken')}`,
                    }
                }
            );
            if (response.status == 200) {
                toast.success("Image updated successfully")
            }
            console.log(response);
        } catch (e) {
            console.log(e);

            toast.error("Error updating image")
        } finally {
            setIsLoading(false);
        }
    }

    const handleImageChange = (e) => {
        console.log(e);
        const file = e.target.files[0];
        console.log(file);
        setImagePreview(URL.createObjectURL(file));
    }
    if (isLoading) return <div>Loading...</div>

    return (
        <Form onSubmit={handleSubmit(updateImage)} encType='multipart/form-data'>
            <Form.Group className="mb-3" controlId="UpdateImage">
                <Form.Label>Update Your Profile Image</Form.Label>
                <Form.Control type="file" {...register('image')} onChange={handleImageChange} placeholder="profile_image" />
            </Form.Group>
            {imagePreview ? <img src={imagePreview} width={200} /> : <img src={userInfo.image.secure_url} width={200} />
            }
            <Button type='submit'>Update</Button>
        </Form>
    )
}
