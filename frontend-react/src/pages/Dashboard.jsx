import React, { useEffect, useState } from 'react';
import { getComptes } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalBalance: 0,
        totalAccounts: 0,
        activeAccounts: 0,
        blockedAccounts: 0
    });

    useEffect(() => {
        getComptes().then(res => {
            const accounts = res.data;
            const totalBalance = accounts.reduce((acc, curr) => acc + curr.solde, 0);
            const active = accounts.filter(a => a.state === 'ACTIVE').length;
            const blocked = accounts.filter(a => a.state === 'BLOCKED' || a.state === 'SUSPENDED').length;

            setStats({
                totalBalance,
                totalAccounts: accounts.length,
                activeAccounts: active,
                blockedAccounts: blocked
            });
        }).catch(err => console.error(err));
    }, []);

    const StatCard = ({ title, value, color }) => (
        <div className="glass-card" style={{ borderLeft: `5px solid ${color}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h3>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{value}</span>
        </div>
    );

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard title="Total Balance" value={`${stats.totalBalance.toFixed(2)} MAD`} color="#3b82f6" />
                <StatCard title="Total Accounts" value={stats.totalAccounts} color="#8b5cf6" />
                <StatCard title="Active Accounts" value={stats.activeAccounts} color="#10b981" />
                <StatCard title="Suspended/Blocked" value={stats.blockedAccounts} color="#ef4444" />
            </div>

            <div className="glass-card">
                <h2>Welcome Back!</h2>
                <p>This is your banking overview. Navigate to <strong>Accounts</strong> to manage your details.</p>
            </div>
        </div>
    );
};

export default Dashboard;
