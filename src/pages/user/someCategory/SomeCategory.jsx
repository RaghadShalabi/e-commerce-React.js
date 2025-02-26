import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate
import './SomeCategory.css'; // ملف CSS مخصص للتعديلات

export default function SomeCategory() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // تهيئة useNavigate

    const getCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories/active?limit=7`);
            setCategories(response.data.categories);
            console.log(response.data.categories);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    if (isLoading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (categories.length === 0) {
        return <div className="text-center py-5">No categories found.</div>;
    }

    return (
        <div className="some-category-container py-5">
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                spaceBetween={30}
                slidesPerView={3.3}
                breakpoints={{
                    320: { slidesPerView: 1.3 },
                    768: { slidesPerView: 2.3 },
                    1024: { slidesPerView: 3.3 },
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {categories.map((category) => (
                    <SwiperSlide key={category._id}>
                        <div
                            className="category-card text-center p-3 border rounded shadow-sm bg-white"
                            onClick={() => navigate(`/categories/${category._id}`)} // التنقل إلى صفحة الفئة
                            style={{ cursor: 'pointer' }} // تغيير شكل المؤشر إلى يد
                        >
                            <img
                                src={category?.image.secure_url}
                                alt={category.name}
                                className="img-fluid rounded"
                                style={{ maxHeight: '150px', objectFit: 'cover' }}
                            />
                            <h3 className="mt-3" style={{ color: '#343a40', fontWeight: '500' }}>{category.name}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}