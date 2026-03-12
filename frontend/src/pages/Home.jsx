import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productRes = await axios.get('/api/products');
                const categoryRes = await axios.get('/api/categories');
                setProducts(productRes.data.slice(0, 8)); // Show 8 featured
                setCategories(categoryRes.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="home-page bg-light">
            {/* Hero Section */}
            <section className="hero bg-light py-5 mb-5 overflow-hidden position-relative border-bottom border-dark border-5">
                <div className="container py-lg-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0 z-1">
                            <span className="badge bg-dark text-white rounded-0 px-3 py-2 mb-3 fw-bold fs-6">LATEST DROP</span>
                            <h1 className="display-2 brand-font fw-bold mb-4 text-dark lh-1" style={{ letterSpacing: '-2px' }}>
                                RULE THE <br /><span className="text-primary">STREETS.</span>
                            </h1>
                            <p className="lead text-muted mb-5 fw-medium">
                                Gear up with the latest performance tech and streetwear essentials. Handpicked curated collections.
                            </p>
                            <div className="d-flex gap-3">
                                <Link to="/shop" className="btn btn-dark btn-lg px-5 rounded-0 d-flex align-items-center fw-bold fs-5">
                                    SHOP NOW <ArrowRight size={24} className="ms-2" />
                                </Link>
                                <a href="#categories" className="btn btn-outline-dark btn-lg px-4 rounded-0 fw-bold fs-5">EXPLORE</a>
                            </div>
                        </div>
                        <div className="col-lg-6 position-relative">
                            <div className="hero-img-container overflow-hidden">
                                <img
                                    src="https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt="Hero"
                                    className="img-fluid w-100"
                                    style={{ objectFit: 'cover', height: '600px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section id="categories" className="py-5 bg-light">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-end mb-5 border-bottom border-dark pb-3">
                        <div>
                            <h2 className="brand-font fs-1 fw-bold mb-0 text-uppercase">The Collections</h2>
                        </div>
                        <Link to="/shop" className="text-dark text-decoration-none fw-bold text-uppercase d-flex align-items-center">
                            View All <ArrowRight size={20} className="ms-1" />
                        </Link>
                    </div>
                    <div className="row g-4">
                        {categories.slice(0, 8).map((cat) => (
                            <div key={cat._id} className="col-6 col-md-3">
                                <Link to={`/shop?category=${cat.name}`} className="category-card text-decoration-none group d-block bg-white border border-secondary shadow-sm transition-hover">
                                    <div className="overflow-hidden position-relative bg-light" style={{ height: '250px' }}>
                                        <img src={cat.image} alt={cat.name} className="img-fluid w-100 h-100 object-fit-cover transition-scale mix-blend-multiply p-2" />
                                    </div>
                                    <div className="p-3 bg-white text-center border-top border-secondary">
                                        <h6 className="mb-0 brand-font fs-5 text-dark text-uppercase fw-bold">{cat.name}</h6>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-end mb-5 border-bottom border-dark pb-3">
                        <h2 className="brand-font fs-1 fw-bold mb-0 text-uppercase">Trending Now</h2>
                    </div>
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-dark" role="status"></div>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {products.map((product) => (
                                <div key={product._id} className="col-6 col-md-4 col-lg-3">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="text-center mt-5">
                        <Link to="/shop" className="btn btn-outline-dark btn-lg px-5 rounded-0 brand-font fs-4">VIEW FULL CATALOG</Link>
                    </div>
                </div>
            </section>

            {/* Why Use Us */}
            <section className="py-5 bg-dark text-white my-5 rounded-0 overflow-hidden position-relative">
                <div className="container py-5">
                    <div className="row text-center g-4">
                        <div className="col-md-4">
                            <div className="p-4 transition-up">
                                <Zap size={48} className="mb-3 text-white" strokeWidth={1} />
                                <h4 className="brand-font fs-4 mb-3 text-uppercase">Lightning Speed</h4>
                                <p className="small mb-0 text-secondary">Premium express shipping for all orders. Get your gear when you need it.</p>
                            </div>
                        </div>
                        <div className="col-md-4 border-start border-end border-secondary">
                            <div className="p-4 transition-up">
                                <ShieldCheck size={48} className="mb-3 text-white" strokeWidth={1} />
                                <h4 className="brand-font fs-4 mb-3 text-uppercase">Ironclad Security</h4>
                                <p className="small mb-0 text-secondary">State-of-the-art encryption ensures your data and payments are locked down.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 transition-up">
                                <CheckCircle size={48} className="mb-3 text-white" strokeWidth={1} />
                                <h4 className="brand-font fs-4 mb-3 text-uppercase">100% Authentic</h4>
                                <p className="small mb-0 text-secondary">Every single item is verified authentic and undergoes rigorous quality control.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
