import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { ShoppingBag, Users, DollarSign, Package, TrendingUp } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
            return;
        }

        const fetchStats = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('/api/admin/stats', config);
                setStats(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchStats();
    }, [user, navigate]);

    if (loading) return (
        <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
        </div>
    );

    const chartData = {
        labels: stats.salesData.map((d) => d._id),
        datasets: [
            {
                label: 'Daily Sales ($)',
                data: stats.salesData.map((d) => d.total),
                backgroundColor: 'rgba(79, 70, 229, 0.2)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="fw-bold d-flex align-items-center">
                    <TrendingUp size={32} className="me-3 text-primary" /> Admin Dashboard
                </h2>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm rounded-pill px-4 fw-bold">Export Report</button>
                    <button className="btn btn-primary btn-sm rounded-pill px-4 fw-bold">+ Add Product</button>
                </div>
            </div>

            <div className="row g-4 mb-5">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 p-4 bg-primary text-white">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="small fw-semibold opacity-75">Total Revenue</span>
                            <DollarSign size={20} />
                        </div>
                        <h2 className="fw-bold mb-0">${stats.totalSales.toFixed(2)}</h2>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="small fw-semibold text-muted">Total Orders</span>
                            <ShoppingBag size={20} className="text-primary" />
                        </div>
                        <h2 className="fw-bold mb-0">{stats.numOrders}</h2>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="small fw-semibold text-muted">Active Users</span>
                            <Users size={20} className="text-primary" />
                        </div>
                        <h2 className="fw-bold mb-0">{stats.numUsers}</h2>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 p-4 text-dark">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="small fw-semibold text-muted">Inventory</span>
                            <Package size={20} className="text-primary" />
                        </div>
                        <h2 className="fw-bold mb-0">{stats.numProducts}</h2>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-8 mb-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5">
                        <h5 className="fw-bold mb-5">Sales Overview</h5>
                        <div style={{ height: '350px' }}>
                            <Line
                                data={chartData}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: { y: { beginAtZero: true } }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 mb-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                        <h5 className="fw-bold mb-4">Recent Notifications</h5>
                        <div className="d-flex flex-column gap-3">
                            <div className="p-3 bg-light rounded-3 border-start border-4 border-success">
                                <p className="small fw-bold mb-1 text-dark">Order #4421 Paid</p>
                                <span className="xsmall text-muted">2 mins ago</span>
                            </div>
                            <div className="p-3 bg-light rounded-3 border-start border-4 border-primary">
                                <p className="small fw-bold mb-1 text-dark">New User Registered</p>
                                <span className="xsmall text-muted">15 mins ago</span>
                            </div>
                            <div className="p-3 bg-light rounded-3 border-start border-4 border-warning">
                                <p className="small fw-bold mb-1 text-dark">Low Stock: Headphones</p>
                                <span className="xsmall text-muted">1 hour ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
