import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    const query = new URLSearchParams(useLocation().search);
    const categoryQuery = query.get('category');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productRes = await axios.get('/api/products');
                const categoryRes = await axios.get('/api/categories');
                setProducts(productRes.data);
                setFilteredProducts(productRes.data);
                setCategories(categoryRes.data);

                if (categoryQuery) {
                    setSelectedCategory(categoryQuery);
                    setFilteredProducts(productRes.data.filter(p => p.category === categoryQuery));
                }

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, [categoryQuery]);

    const handleCategoryChange = (catName) => {
        setSelectedCategory(catName);
        if (catName === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter((p) => p.category === catName));
        }
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-3 mb-4">
                    <div className="p-4 border border-dark border-1 sticky-top bg-white" style={{ top: '100px' }}>
                        <h5 className="brand-font fs-3 fw-bold mb-4 border-bottom border-dark pb-3 text-uppercase">CATEGORIES</h5>
                        <div className="d-flex flex-column gap-2">
                            <button
                                className={`btn btn-link text-decoration-none text-start ps-0 rounded-0 brand-font text-uppercase fs-6 py-2 border-bottom border-light ${selectedCategory === 'All' ? 'text-dark fw-bold border-dark' : 'text-secondary'}`}
                                onClick={() => handleCategoryChange('All')}
                            >
                                All Products
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat._id}
                                    className={`btn btn-link text-decoration-none text-start ps-0 rounded-0 brand-font text-uppercase fs-6 py-2 border-bottom border-light ${selectedCategory === cat.name ? 'text-dark fw-bold border-dark' : 'text-secondary'}`}
                                    onClick={() => handleCategoryChange(cat.name)}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-9 ps-lg-5">
                    <div className="d-flex justify-content-between align-items-center mb-5 border-bottom border-dark pb-3">
                        <h2 className="brand-font display-6 fw-bold text-uppercase mb-0">
                            {selectedCategory} <span className="text-secondary fs-5 fw-normal ms-2">({filteredProducts.length})</span>
                        </h2>
                    </div>
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-dark" role="status"></div>
                        </div>
                    ) : (
                        <div className="row g-5">
                            {filteredProducts.map((product) => (
                                <div key={product._id} className="col-6 col-md-4">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                            {filteredProducts.length === 0 && (
                                <div className="col-12 text-center py-5">
                                    <h5 className="text-secondary brand-font text-uppercase">NO PRODUCTS FOUND.</h5>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
