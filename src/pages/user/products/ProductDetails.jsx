import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Slide, toast } from 'react-toastify';
import { CartContext } from '../../../components/user/context/CartContext.jsx';

export default function ProductDetails() {
    const navigate = useNavigate();
    const { productId } = useParams();

    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { cartCount, setCartCount } = useContext(CartContext)


    const getDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${productId}`);
            console.log(response.data.product);
            setProduct(response.data.product);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const addProductToCart = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/cart`,
                {//body
                    productId: product._id,
                },
                {//headers
                    headers: {
                        'Authorization': `Tariq__${token}`
                    }
                }
            );
            if (response.status == 201) {
                toast.success('product added succesfully!', {
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
                setCartCount(cartCount + 1);
                navigate('/cart');
            }
        } catch (error) {
            console.log("error: ", error);
        }
    }

    useEffect(() => {
        getDetails();
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <section className="product-details">
            <Card>
                <Card.Img variant="top" src={product.mainImage.secure_url} className='w-25' />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        {product.description}
                        <Button onClick={() => addProductToCart(product._id)} variant="primary">add to cart</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </section>
    )
}
