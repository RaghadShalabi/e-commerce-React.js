import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export default function ProductDetails() {
    const { productId } = useParams();

    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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
                    </Card.Text>
                </Card.Body>
            </Card>
        </section>
    )
}
