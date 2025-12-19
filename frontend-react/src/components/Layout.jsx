import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();

    return (
        <>
            <nav className="navbar">
                <div style={{ fontWeight: 'bold', fontSize: '1.25rem', background: 'linear-gradient(to right, #4f46e5, #ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                    DigitalBank
                </div>
                <div className="nav-links">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Dashboard</Link>
                    <Link to="/accounts" className={`nav-link ${location.pathname === '/accounts' ? 'active' : ''}`}>Accounts</Link>
                    <Link to="/operations" className={`nav-link ${location.pathname === '/operations' ? 'active' : ''}`}>Operations</Link>
                </div>
            </nav>
            <main className="container">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
