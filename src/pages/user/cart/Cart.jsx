import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, Container, Row, Col, Spinner } from 'react-bootstrap';
import { CartContext } from '../../../components/user/context/CartContext.jsx';
import { Slide, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { cartCount, setCartCount } = useContext(CartContext);

    const getCart = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart`, {
                headers: {
                    Authorization: `Tariq__${token}`,
                },
            });
            setCart(response.data.products);
            console.log(response.data.products);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const inQty = async (productId) => {
        try {
            const token = localStorage.getItem('userToken');
            await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/cart/incraseQuantity`,
                { productId },
                {
                    headers: {
                        Authorization: `Tariq__${token}`,
                    },
                }
            );
            setCart((prevCart) =>
                prevCart.map((item) => {
                    if (item.productId === productId) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                })
            );
            setCartCount(cartCount + 1);
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    const deQty = async (productId, currentQuantity) => {
        try {
            const token = localStorage.getItem('userToken');

            if (currentQuantity === 1) {
                await axios.patch(
                    `${import.meta.env.VITE_BASE_URL}/cart/removeItem`,
                    { productId },
                    {
                        headers: {
                            Authorization: `Tariq__${token}`,
                        },
                    }
                );
                setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
            } else {
                await axios.patch(
                    `${import.meta.env.VITE_BASE_URL}/cart/decraseQuantity`,
                    { productId },
                    {
                        headers: {
                            Authorization: `Tariq__${token}`,
                        },
                    }
                );
                setCart((prevCart) =>
                    prevCart.map((item) => {
                        if (item.productId === productId) {
                            return { ...item, quantity: item.quantity - 1 };
                        }
                        return item;
                    })
                );
            }
            setCartCount(cartCount - 1);
        } catch (error) {
            console.error('Error decreasing quantity:', error);
        }
    };

    const removeItem = async (productId) => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/cart/removeItem`,
                { productId },
                {
                    headers: {
                        Authorization: `Tariq__${token}`,
                    },
                }
            );
            const removedItem = cart.find((item) => item.productId === productId);
            if (removedItem) {
                setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
                setCartCount(cartCount - removedItem.quantity);
                toast.success('Item removed successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    transition: Slide,
                });
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const clearCart = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/cart/clear`,
                {},
                {
                    headers: {
                        Authorization: `Tariq__${token}`,
                    },
                }
            );
            setCart([]);
            setCartCount(0);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    useEffect(() => {
        getCart();
    }, []);

    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4" style={{ color: '#FFCF50', fontWeight: 'bold' }}>Your Cart</h2>
            {cart.length === 0 ? (
                <div className="text-center">
                    <p>Your cart is empty.</p>
                    <Link to="/products" className="btn btn-primary">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={item.details.mainImage.secure_url}
                                            alt={item.details.name}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td>{item.details.name}</td>
                                    <td>${item.details.price}</td>
                                    <td>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => deQty(item.productId, item.quantity)}
                                        >
                                            -
                                        </Button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => inQty(item.productId)}
                                        >
                                            +
                                        </Button>
                                    </td>
                                    <td>${item.quantity * item.details.finalPrice}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => removeItem(item.productId)}
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                    Total:
                                </td>
                                <td colSpan={2} style={{ fontWeight: 'bold' }}>
                                    ${cart.reduce((total, item) => total + item.quantity * item.details.finalPrice, 0)}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <Link className="btn btn-success w-25" to="/createOrder">
                            Checkout
                        </Link>
                        <Button variant="danger" onClick={clearCart}>
                            Clear Cart
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
}