import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { CartContext } from '../../../components/user/context/CartContext.jsx';

export default function Cart() {

    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { cartCount, setCartCount } = useContext(CartContext)


    const getCart = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart`,
                {
                    headers: {
                        "Authorization": `Tariq__${token}`
                    }
                }
            )
            setCart(response.data.products);
            console.log(response.data.products);
        } catch (error) {
            console.error("error: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCart();
    }, [])

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    const inQty = async (productId) => {
        const token = localStorage.getItem('userToken');
        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/cart/incraseQuantity`, { productId: productId },
            {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });
        setCartCount(cartCount + 1)
    }

    const deQty = async (productId) => {
        const token = localStorage.getItem('userToken');
        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/cart/decraseQuantity`, { productId: productId },
            {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });

        setCartCount(cartCount - 1)
    }

    return (
        <section className='cart'>
            <h2>Your Cart</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Product name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item =>
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td><img src={item.details.mainImage.secure_url} alt={item.details.name} width='50px' /></td>
                            <td>{item.details.name}</td>
                            <td>{item.details.price}</td>
                            <td>
                                <Button onClick={() => inQty(item.productId)}>+</Button>
                                {item.quantity}
                                <Button onClick={() => deQty(item.productId)}>-</Button>
                            </td>
                            <td>{item.quantity * item.details.finalPrice}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </section>
    )
}
