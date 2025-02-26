import React from 'react';
import PopularCategories from './PopularCategories';
import FeaturedProducts from './FeaturedProducts';
import SomeCategory from '../someCategory/SomeCategory';
import Footer from '../../../components/user/footer/Footer.jsx';
import Newsletter from './Newsletter.jsx';
import { MdShoppingCart } from 'react-icons/md';
import { GiAmpleDress, GiClothes } from 'react-icons/gi';
import { AiFillShopping } from 'react-icons/ai';

export default function Home() {
    return (
        <div>
            {/* العنوان والأيقونات */}
            <div className="text-center py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <h1 className="pt-5 pb-3" style={{ color: '#343a40', fontWeight: 'bold' }}>Welcome to Raghad Shop</h1>
                <div className="icons d-flex justify-content-center gap-4">
                    <MdShoppingCart style={{ fontSize: '2rem', color: '#FFCF50' }} />
                    <AiFillShopping style={{ fontSize: '2rem', color: '#FFCF50' }} />
                    <GiClothes style={{ fontSize: '2rem', color: '#FFCF50' }} />
                    <GiAmpleDress style={{ fontSize: '2rem', color: '#FFCF50' }} />
                </div>
            </div>
            <SomeCategory />
            <PopularCategories />
            <FeaturedProducts />
            <Newsletter />
        </div>
    );
}