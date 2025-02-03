import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    const getProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products?limit=10`);
            setProducts(response.data.products);
            console.log(response.data.products);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getProducts();
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <section className='products'>
            <h2>all products</h2>
            <div className='row'>
                {products.map(product =>
                    <div key={product._id} className='col-md-4'>
                        <div className='product'>
                            <Link to={`/product/${product._id}`}>
                                <img src={product.mainImage.secure_url} />
                            </Link>
                            <h4>{product.name}</h4>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
