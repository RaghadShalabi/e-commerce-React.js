// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Row, Col, Spinner } from 'react-bootstrap';

// export default function Products() {
//     const [products, setProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const getProducts = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products?limit=10`);
//             setProducts(response.data.products);
//             console.log(response.data.products);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         getProducts();
//     }, []);

//     if (isLoading) {
//         return (
//             <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//                 <Spinner animation="border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </Spinner>
//             </Container>
//         );
//     }

//     return (
//         <Container className="my-5">
//             <h2 className="text-center mb-4" style={{ color: '#FFCF50', fontWeight: 'bold' }}>All Products</h2>
//             <Row>
//                 {products.map(product => (
//                     <Col key={product._id} md={4} className="mb-4">
//                         <div className="product text-center p-3 border rounded shadow-sm bg-white">
//                             <Link to={`/product/${product._id}`} className="text-decoration-none">
//                                 <img src={product.mainImage.secure_url} alt={product.name} className="img-fluid rounded" style={{ maxHeight: '200px', objectFit: 'cover' }} />
//                                 <h4 className="mt-3" style={{ color: '#343a40', fontWeight: '500' }}>{product.name}</h4>
//                             </Link>
//                         </div>
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );
// }


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Row, Col, Spinner, Form, Button } from 'react-bootstrap';

// export default function Products() {
//     const [products, setProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortOrder, setSortOrder] = useState('');
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(12);

//     const getProducts = async () => {
//         try {
//             const token = localStorage.getItem('userToken')
//             const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`, {
//                 params: {
//                     search: searchTerm,
//                     sort: sortOrder,
//                     page: page,
//                     limit: limit
//                 },
//                 headers: {
//                     Authorization: `Tariq__${token}`
//                 }
//             });
//             setProducts(response.data.products);
//             console.log(response.data.products);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         getProducts();
//     }, [searchTerm, sortOrder, page, limit]);

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleSortChange = (e) => {
//         setSortOrder(e.target.value);
//     };

//     const handlePageChange = (newPage) => {
//         setPage(newPage);
//     };

//     const handleLimitChange = (e) => {
//         setLimit(Number(e.target.value));
//     };

//     if (isLoading) {
//         return (
//             <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//                 <Spinner animation="border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </Spinner>
//             </Container>
//         );
//     }

//     return (
//         <Container className="my-5">
//             <h2 className="text-center mb-4" style={{ color: '#FFCF50', fontWeight: 'bold' }}>All Products</h2>
            
//             <Row className="mb-4">
//                 <Col md={4}>
//                     <Form.Control
//                         type="text"
//                         placeholder="Search products..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                     />
//                 </Col>
//                 <Col md={4}>
//                     <Form.Select value={sortOrder} onChange={handleSortChange}>
//                         <option value="">Sort by</option>
//                         <option value="price">Price: Low to High</option>
//                         <option value="-price">Price: High to Low</option>
//                         <option value="name">Name: A to Z</option>
//                         <option value="-name">Name: Z to A</option>
//                         <option value="discount">Discount</option>
//                         <option value="-discount">-Discount</option>
//                     </Form.Select>
//                 </Col>
//                 <Col md={4}>
//                     <Form.Select value={limit} onChange={handleLimitChange}>
//                         <option value={12}>12 per page</option>
//                         <option value={24}>24 per page</option>
//                         <option value={50}>50 per page</option>
//                     </Form.Select>
//                 </Col>
//             </Row>

//             <Row>
//                 {products.map(product => (
//                     <Col key={product._id} md={4} className="mb-4">
//                         <div className="product text-center p-3 border rounded shadow-sm bg-white">
//                             <Link to={`/product/${product._id}`} className="text-decoration-none">
//                                 <img src={product.mainImage.secure_url} alt={product.name} className="img-fluid rounded" style={{ maxHeight: '200px', objectFit: 'cover' }} />
//                                 <h4 className="mt-3" style={{ color: '#343a40', fontWeight: '500' }}>{product.name}</h4>
//                                 <p className="mt-2" style={{ color: '#6c757d', fontWeight: '500' }}>Price: ${product.price}</p>
//                             </Link>
//                         </div>
//                     </Col>
//                 ))}
//             </Row>

//             <Row className="mt-4">
//                 <Col className="d-flex justify-content-center">
//                     <Button
//                         variant="outline-primary"
//                         onClick={() => handlePageChange(page - 1)}
//                         disabled={page === 1}
//                     >
//                         Previous
//                     </Button>
//                     <span className="mx-3 d-flex align-items-center">Page {page}</span>
//                     <Button
//                         variant="outline-primary"
//                         onClick={() => handlePageChange(page + 1)}
//                     >
//                         Next
//                     </Button>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }




import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Form, Button } from 'react-bootstrap';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [expandedProductId, setExpandedProductId] = useState(null);

    const getProducts = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`, {
                params: {
                    search: searchTerm,
                    sort: sortOrder,
                    page: page,
                    limit: limit,
                },
                headers: {
                    Authorization: `Tariq__${token}`,
                },
            });
            setProducts(response.data.products);
            console.log(response.data.products);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, [searchTerm, sortOrder, page, limit]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
    };

    const toggleProductDetails = (productId) => {
        if (expandedProductId === productId) {
            setExpandedProductId(null); // Collapse if the same product is clicked again
        } else {
            setExpandedProductId(productId); // Expand the clicked product
        }
    };

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
            <h2 className="text-center mb-4" style={{ color: '#FFCF50', fontWeight: 'bold' }}>All Products</h2>

            <Row className="mb-4">
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Col>
                <Col md={4}>
                    <Form.Select value={sortOrder} onChange={handleSortChange}>
                        <option value="">Sort by</option>
                        <option value="price">Price: Low to High</option>
                        <option value="-price">Price: High to Low</option>
                        <option value="name">Name: A to Z</option>
                        <option value="-name">Name: Z to A</option>
                        <option value="discount">Discount</option>
                        <option value="-discount">-Discount</option>
                    </Form.Select>
                </Col>
                <Col md={4}>
                    <Form.Select value={limit} onChange={handleLimitChange}>
                        <option value={12}>12 per page</option>
                        <option value={24}>24 per page</option>
                        <option value={50}>50 per page</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row>
                {products.map((product) => (
                    <Col key={product._id} md={4} className="mb-4">
                        <div className="product text-center p-3 border rounded shadow-sm bg-white">
                            <div onClick={() => toggleProductDetails(product._id)} style={{ cursor: 'pointer' }}>
                                <img
                                    src={product.mainImage.secure_url}
                                    alt={product.name}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                                />
                                <h4 className="mt-3" style={{ color: '#343a40', fontWeight: '500' }}>
                                    {product.name}
                                </h4>
                                <p className="mt-2" style={{ color: '#6c757d', fontWeight: '500' }}>
                                    Price: ${product.price}
                                </p>
                            </div>

                            {/* Expanded Details */}
                            {expandedProductId === product._id && (
                                <div className="mt-3">
                                    <p style={{ color: '#6c757d' }}>{product.description}</p>
                                    <p style={{ color: '#6c757d' }}>Discount: {product.discount}%</p>
                                    <p style={{ color: '#6c757d' }}>Final Price: ${product.finalPrice}</p>
                                    <p style={{ color: '#6c757d' }}>Stock: {product.stock}</p>

                                </div>
                            )}
                        </div>
                    </Col>
                ))}
            </Row>

            <Row className="mt-4">
                <Col className="d-flex justify-content-center">
                    <Button
                        variant="outline-primary"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <span className="mx-3 d-flex align-items-center">Page {page}</span>
                    <Button
                        variant="outline-primary"
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}




// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Row, Col, Spinner, Form, Pagination } from 'react-bootstrap';

// export default function Products() {
//     const [products, setProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [sortOption, setSortOption] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [limit, setLimit] = useState(6);

//     const getProducts = async (query = '', sort = '', page = 1, limit = 6) => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`, {
//                 params: {
//                     page,
//                     limit,
//                     search: query,
//                     sort,
//                 },
//             });
//             setProducts(response.data.products);
//             setTotalPages(response.data.totalPages);
//             console.log(response.data.products);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         getProducts(searchQuery, sortOption, currentPage, limit);
//     }, [searchQuery, sortOption, currentPage, limit]);

//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//         setCurrentPage(1); // Reset to first page when searching
//     };

//     const handleSortChange = (e) => {
//         setSortOption(e.target.value);
//         setCurrentPage(1); // Reset to first page when sorting
//     };

//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     const handleLimitChange = (e) => {
//         setLimit(Number(e.target.value));
//         setCurrentPage(1); // Reset to first page when changing limit
//     };

//     if (isLoading) {
//         return (
//             <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//                 <Spinner animation="border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </Spinner>
//             </Container>
//         );
//     }

//     return (
//         <Container className="my-5">
//             <h2 className="text-center mb-4" style={{ color: '#FFCF50', fontWeight: 'bold' }}>All Products</h2>

//             {/* قسم البحث والترتيب */}
//             <Row className="mb-4">
//                 <Col md={4}>
//                     <Form.Control
//                         type="text"
//                         placeholder="Search products..."
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                         style={{ borderRadius: '10px' }}
//                     />
//                 </Col>
//                 <Col md={4}>
//                     <Form.Select
//                         value={sortOption}
//                         onChange={handleSortChange}
//                         style={{ borderRadius: '10px' }}
//                     >
//                         <option value="">Sort by</option>
//                         <option value="price_asc">Price: Low to High</option>
//                         <option value="price_desc">Price: High to Low</option>
//                     </Form.Select>
//                 </Col>
//                 <Col md={4}>
//                     <Form.Select
//                         value={limit}
//                         onChange={handleLimitChange}
//                         style={{ borderRadius: '10px' }}
//                     >
//                         <option value={6}>6 per page</option>
//                         <option value={12}>12 per page</option>
//                         <option value={50}>50 per page</option>
//                     </Form.Select>
//                 </Col>
//             </Row>

//             {/* عرض المنتجات */}
//             <Row>
//                 {products.map(product => (
//                     <Col key={product._id} md={4} className="mb-4">
//                         <div className="product text-center p-3 border rounded shadow-sm bg-white">
//                             <Link to={`/product/${product._id}`} className="text-decoration-none">
//                                 <img
//                                     src={product.mainImage.secure_url}
//                                     alt={product.name}
//                                     className="img-fluid rounded"
//                                     style={{ maxHeight: '200px', objectFit: 'cover' }}
//                                 />
//                                 <h4 className="mt-3" style={{ color: '#343a40', fontWeight: '500' }}>{product.name}</h4>
//                                 <p style={{ color: '#6c757d' }}>${product.finalPrice}</p>
//                             </Link>
//                         </div>
//                     </Col>
//                 ))}
//             </Row>

//             {/* Pagination */}
//             <Row className="justify-content-center mt-4">
//                 <Pagination>
//                     <Pagination.Prev
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                     />
//                     {Array.from({ length: totalPages }, (_, index) => (
//                         <Pagination.Item
//                             key={index + 1}
//                             active={index + 1 === currentPage}
//                             onClick={() => handlePageChange(index + 1)}
//                         >
//                             {index + 1}
//                         </Pagination.Item>
//                     ))}
//                     <Pagination.Next
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                     />
//                 </Pagination>
//             </Row>
//         </Container>
//     );
// }