import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {

        try {
            const token = localStorage.getItem('userToken');
            if (token) {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
                    headers: {
                        Authorization: `Tariq__${token}`,
                    },
                });
                setUserInfo(response.data.user);
                console.log(response.data.user);
            } else {
                setUserInfo(null);
            }
        } catch (error) {
            console.error(error);
            setUserInfo(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, loading, setLoading, getUser }}>
            {children}
        </UserContext.Provider>
    )
}