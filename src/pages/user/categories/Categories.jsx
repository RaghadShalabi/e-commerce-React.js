import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Categories() {

  const [categories, setCategories] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

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
    <section className='categories'>
      <h2>Categoris</h2>
      <div className='row'>
        {categories.map(category =>
          <div key={category._id} className='col-md-4'>
            <div className='category'>
              <Link to={`/categories/${category._id}`}>
                <img src={category?.image.secure_url} />
              </Link>
              <h3>{category.name}</h3>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
