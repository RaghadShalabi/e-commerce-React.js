import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react';

export const UserContext = createContext();

export const UserContextProvider =  ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
                headers: {
                    Authorization: `Tariq__${localStorage.getItem('userToken')}`
                }
            });
            setUserInfo(response.data.user);
            console.log(response.data.user)
        } catch (error) {
            console.error(error);
            setUserInfo(null);
        }finally{
            setLoading(false);
        }
    } 

    useEffect(()=>{
        getUser();
    }, [])


    return (
        <UserContext.Provider value={{ userInfo, loading }}>
            {children}
        </UserContext.Provider>
    )
}