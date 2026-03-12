import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Star, Shield, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [activeImage, setActiveImage] = useState('');
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
                setActiveImage(data.image);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
        </div>
    );

    if (!product) return (
        <div className="container py-5 text-center">
            <h3>Product not found</h3>
            <Link to="/shop" className="btn btn-primary mt-3">Back to Shop</Link>
        </div>
    );

    return (
        <div className="container py-5">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb small">
                    <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/shop" className="text-decoration-none text-muted">Shop</Link></li>
                    <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">{product.name}</li>
                </ol>
            </nav>

            <div className="row g-5 align-items-start">
                <div className="col-lg-6">
                    <div className="bg-light overflow-hidden p-5 d-flex justify-content-center align-items-center mb-4 border border-secondary border-opacity-25" style={{ minHeight: '500px' }}>
                        <img src={activeImage} alt={product.name} className="img-fluid mix-blend-multiply transition-scale" style={{ maxHeight: '400px', objectFit: 'contain' }} />
                    </div>
                    {/* Thumbnail Gallery */}
                    {product.images && product.images.length > 0 && (
                        <div className="d-flex gap-3 overflow-auto pb-2">
                            <div
                                className={`border ${activeImage === product.image ? 'border-dark border-2' : 'border-secondary border-opacity-25'} p-2 bg-light cursor-pointer transition-hover`}
                                style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                                onClick={() => setActiveImage(product.image)}
                            >
                                <img src={product.image} alt="Thumbnail main" className="w-100 h-100 object-fit-contain mix-blend-multiply" />
                            </div>
                            {product.images.map((img, index) => (
                                <div
                                    key={index}
                                    className={`border ${activeImage === img ? 'border-dark border-2' : 'border-secondary border-opacity-25'} p-2 bg-light cursor-pointer transition-hover flex-shrink-0`}
                                    style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                                    onClick={() => setActiveImage(img)}
                                >
                                    <img src={img} alt={`Thumbnail ${index}`} className="w-100 h-100 object-fit-contain mix-blend-multiply" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="col-lg-6">
                    <div className="ps-lg-5">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <span className="badge bg-dark text-white px-3 py-2 rounded-0 fs-6 brand-font tracking-widest text-uppercase">
                                {product.category}
                            </span>
                            {product.brand && product.brand !== 'Unbranded' && (
                                <span className="badge border border-dark text-dark px-3 py-2 rounded-0 fs-6 brand-font tracking-widest text-uppercase">
                                    {product.brand}
                                </span>
                            )}
                        </div>
                        <h1 className="display-4 brand-font fw-bold mb-3 text-uppercase">{product.name}</h1>
                        <div className="d-flex align-items-center mb-4">
                            <div className="text-dark me-2 d-flex">
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="none" />
                            </div>
                            <span className="text-secondary small fw-bold">({product.numReviews} REVIEWS)</span>
                        </div>

                        <h2 className="display-6 fw-bold mb-4 text-dark">${product.price}</h2>

                        <p className="text-secondary mb-5 lead lh-base">{product.description}</p>

                        <div className="mb-5 p-4 bg-light border border-secondary border-opacity-25">
                            <div className="row g-4">
                                <div className="col-md-6 border-end border-secondary border-opacity-25">
                                    <div className="d-flex align-items-center">
                                        <div className="me-3 text-dark"><Truck size={24} strokeWidth={1.5} /></div>
                                        <span className="small fw-bold text-uppercase tracking-widest brand-font">Free Delivery</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center ps-md-3">
                                        <div className="me-3 text-dark"><RotateCcw size={24} strokeWidth={1.5} /></div>
                                        <span className="small fw-bold text-uppercase tracking-widest brand-font">{product.returnPolicy || '14 Days Return'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex align-items-stretch gap-3 mb-5" style={{ height: '60px' }}>
                            <div className="d-flex align-items-center border border-dark bg-white">
                                <button
                                    className="btn btn-link text-dark text-decoration-none fw-bold"
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                    disabled={qty <= 1}
                                > - </button>
                                <span className="px-3 fw-bold">{qty}</span>
                                <button
                                    className="btn btn-link text-dark text-decoration-none fw-bold"
                                    onClick={() => setQty(qty + 1)}
                                    disabled={qty >= product.stock}
                                > + </button>
                            </div>
                            <button
                                className="btn btn-dark flex-grow-1 rounded-0 d-flex align-items-center justify-content-center brand-font fs-5 text-uppercase tracking-widest"
                                onClick={() => addToCart(product, qty)}
                                disabled={product.stock === 0}
                            >
                                <ShoppingCart size={24} className="me-3" />
                                {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
                            </button>
                        </div>

                        <div className="border-top pt-4">
                            <div className="d-flex align-items-center text-muted small mb-2">
                                <Shield size={16} className="me-2" />
                                <span>Guaranteed Safe & Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-5 pt-5 border-top border-dark border-4">
                <h3 className="brand-font display-6 fw-bold text-uppercase mb-5">Customer Reviews</h3>
                {product.reviews && product.reviews.length > 0 ? (
                    <div className="row g-4">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="col-md-6">
                                <div className="p-4 bg-light border border-secondary border-opacity-25 h-100">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <h6 className="brand-font fs-5 text-uppercase fw-bold mb-1">{review.reviewerName}</h6>
                                            <div className="d-flex text-dark">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-secondary small fw-bold tracking-widest">{new Date(review.date).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-secondary mb-0 fw-medium">"{review.comment}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-5 bg-light border border-secondary border-opacity-25 text-center">
                        <h5 className="brand-font fs-4 text-uppercase text-secondary mb-0 tracking-widest">No Reviews Yet. Be the first to rule the streets.</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
