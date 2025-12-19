import React, { useEffect, useState } from 'react';
import { getComptes, deleteAccount, saveAccount } from '../services/api';
import { Link } from 'react-router-dom';

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAccount, setNewAccount] = useState({
        balance: 0,
        type: 'CC', // CC or CE
        clientId: 1 // Default to 1 for now, as we don't have client selection yet
    });

    const fetchAccounts = () => {
        setLoading(true);
        getComptes()
            .then(res => {
                setAccounts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this account?")) {
            deleteAccount(id)
                .then(() => {
                    alert("Account deleted successfully!");
                    fetchAccounts();
                })
                .catch(err => alert("Failed to delete account: " + err.message));
        }
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const accountData = {
            solde: parseFloat(newAccount.balance),
            dateCreation: new Date(),
            state: 'ACTIVE',
            client: { id: newAccount.clientId },
            type: newAccount.type
        };

        if (newAccount.type === 'CC') {
            accountData.decouvert = 5000;
        } else {
            accountData.tauxInteret = 3.5;
        }

        saveAccount(accountData)
            .then(() => {
                alert("Account created successfully!");
                setIsModalOpen(false);
                fetchAccounts();
            })
            .catch(err => alert("Failed to create account: " + err.message));
    };

    return (
        <div>
            {error && (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444', background: 'rgba(239,68,68,0.1)', borderRadius: '1rem', marginBottom: '1rem' }}>
                    <h2>Error Loading Data</h2>
                    <p>{error.message}</p>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>My Accounts</h1>
                <button onClick={() => setIsModalOpen(true)} className="btn" style={{ background: '#10b981' }}>+ New Account</button>
            </div>

            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="glass-card" style={{ width: '400px', position: 'relative' }}>
                        <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        <h2 style={{ marginBottom: '1.5rem' }}>Create New Account</h2>
                        <form onSubmit={handleCreate}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Balance (MAD)</label>
                                <input
                                    type="number"
                                    value={newAccount.balance}
                                    onChange={e => setNewAccount({ ...newAccount, balance: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Account Type</label>
                                <select
                                    value={newAccount.type}
                                    onChange={e => setNewAccount({ ...newAccount, type: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                                >
                                    <option value="CC">Current Account (Compte Courant)</option>
                                    <option value="CE">Savings Account (Compte Epargne)</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Client ID</label>
                                <input
                                    type="number"
                                    value={newAccount.clientId}
                                    onChange={e => setNewAccount({ ...newAccount, clientId: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#222', color: 'white' }}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn" style={{ width: '100%' }}>Create Account</button>
                        </form>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {accounts.map(acc => (
                    <div key={acc.id} className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>{acc.type === 'CC' ? 'Current Account' : 'Savings Account'}</span>
                            <span style={{ color: acc.state === 'ACTIVE' ? '#10b981' : '#ef4444' }}>{acc.state}</span>
                        </div>
                        <h2 style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>{acc.solde.toFixed(2)} MAD</h2>
                        <div style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                            ID: {acc.id} <br />
                            Created: {new Date(acc.dateCreation).toLocaleDateString()}
                            {acc.client && (
                                <div>Client: {acc.client.nom} ({acc.client.email})</div>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Link to={`/accounts/${acc.id}`} className="btn" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>
                                Details
                            </Link>
                            <button onClick={() => handleDelete(acc.id)} className="btn" style={{ background: '#ef4444', flex: 1 }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Accounts;
