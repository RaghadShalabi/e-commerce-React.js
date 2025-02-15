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
        // حساب العدد الكلي للقطع (الكميات)
        const totalQuantity = response.data.products.reduce((total, product) => {
            return total + product.quantity;
        }, 0);

        setCartCount(totalQuantity); // تحديث العدد الكلي للقطع
        // setCartCount(response.data.count);
        console.log(response.data.count);
    };

    useEffect(() => {
        getCart();
    }, [])

    return (
        <CartContext.Provider value={{ cartCount, setCartCount, getCart }}>
            {children}
        </CartContext.Provider>
    )

}

export default CartContextProvider;