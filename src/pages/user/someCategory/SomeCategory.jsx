import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


export default function SomeCategory() {
    const [categories, setCategories] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    const getCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories/active`);
            setCategories(response.data.categories);
            console.log(response.data.categories);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getCategories();
    }, [])

    if (categories.length === 0) {
        return <div>No categories found.</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <Swiper
            modules={[Navigation]}
            navigation
            loop={true}
            spaceBetween={50}
            slidesPerView={3.3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {categories.map((category) =>
                <SwiperSlide key={category._id}>
                    <img src={category?.image.secure_url} alt={category.name} />
                    <h3>{category.name}</h3>
                </SwiperSlide>)}
        </Swiper>
    )
}