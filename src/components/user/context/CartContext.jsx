import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

    const [cartCount, setCartCount] = useState(0);

    const getCart = async () => {
        const token = localStorage.getItem('userToken')
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart`,
            {
                headers: {
                    "Authorization": `Tariq__${token}`
                }
            }
        )
        setCartCount(response.data.count);
        console.log(response.data.count);
    };

    useEffect(() => {
        getCart();
    }, [])

    return (
        <CartContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    )

}

export default CartContextProvider;