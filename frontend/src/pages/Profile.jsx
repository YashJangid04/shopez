import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Package, User as UserIcon, MapPin, Clock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('/api/orders/myorders', config);
                setOrders(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        if (user) fetchOrders();
    }, [user]);

    if (!user) return <div className="container py-5 text-center">Please login to view profile</div>;

    return (
        <div className="container py-5">
            <div className="row g-4">
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 text-center p-5 mb-4 border-top border-5 border-primary">
                        <div className="bg-light d-inline-block p-4 rounded-circle mb-4 mx-auto border shadow-sm">
                            <UserIcon size={64} className="text-primary" />
                        </div>
                        <h3 className="fw-bold">{user.name}</h3>
                        <p className="text-muted mb-4">{user.email}</p>
                        <div className="badge bg-secondary-subtle text-secondary rounded-pill px-3 py-2 text-uppercase fw-bold xsmall">
                            {user.role} Account
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <h5 className="fw-bold mb-3 d-flex align-items-center"><MapPin size={20} className="me-2 text-primary" /> Default Shipping</h5>
                        <p className="small text-muted mb-0">No primary address saved yet.</p>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5">
                        <h2 className="fw-bold mb-5 d-flex align-items-center">
                            <Package size={32} className="me-3 text-primary" /> My Orders
                        </h2>

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center bg-light rounded-4 py-5 border border-dashed">
                                <p className="text-muted mb-0">You haven't placed any orders yet.</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle border-0">
                                    <thead>
                                        <tr className="small text-uppercase text-muted">
                                            <th className="border-0">ID</th>
                                            <th className="border-0">Date</th>
                                            <th className="border-0">Total</th>
                                            <th className="border-0">Paid</th>
                                            <th className="border-0">Delivered</th>
                                            <th className="border-0"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id}>
                                                <td className="small text-muted">#{order._id.substring(0, 10)}</td>
                                                <td className="small fw-semibold">{order.createdAt.substring(0, 10)}</td>
                                                <td className="fw-bold">${order.totalPrice}</td>
                                                <td>
                                                    {order.isPaid ? (
                                                        <span className="badge bg-success-subtle text-success px-3 rounded-pill xsmall">Paid</span>
                                                    ) : (
                                                        <span className="badge bg-danger-subtle text-danger px-3 rounded-pill xsmall">Pending</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {order.isDelivered ? (
                                                        <span className="badge bg-info-subtle text-info px-3 rounded-pill xsmall">Delivered</span>
                                                    ) : (
                                                        <span className="badge bg-warning-subtle text-warning px-3 rounded-pill xsmall">Shipping</span>
                                                    )}
                                                </td>
                                                <td className="text-end">
                                                    <button className="btn btn-light btn-sm rounded-pill px-3 xsmall fw-bold">Details</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
