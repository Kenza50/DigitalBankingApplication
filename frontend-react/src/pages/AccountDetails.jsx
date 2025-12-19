import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCompteDetails } from '../services/api';

const AccountDetails = () => {
    const { id } = useParams();
    const [compte, setCompte] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCompteDetails(id)
            .then(res => {
                setCompte(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load account details. Please try again later.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid var(--accent-primary)', borderRadius: '50%', margin: '0 auto' }}></div>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading account details...</p>
        </div>
    );

    if (error) return (
        <div style={{ textAlign: 'center', color: '#ef4444', marginTop: '2rem' }}>
            <h2>Error</h2>
            <p>{error}</p>
            <Link to="/accounts" className="btn btn-outline" style={{ marginTop: '1rem', display: 'inline-block' }}>Back to Accounts</Link>
        </div>
    );

    if (!compte) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Account not found</div>;

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <Link to="/accounts" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: '1rem' }}>
                &larr; Back to Accounts
            </Link>

            {/* Account Summary Card */}
            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <span style={{
                            background: compte.type === 'CC' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(168, 85, 247, 0.2)',
                            color: compte.type === 'CC' ? '#60a5fa' : '#c084fc',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '999px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                        }}>
                            {compte.type === 'CC' ? 'Current Account' : 'Savings Account'}
                        </span>
                        <h1 style={{ fontSize: '2.5rem', margin: '1rem 0 0.5rem 0' }}>{compte.solde ? compte.solde.toFixed(2) : '0.00'} MAD</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Account ID: {compte.id}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{
                            color: compte.state === 'ACTIVE' ? '#10b981' : '#ef4444',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            justifyContent: 'flex-end'
                        }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: compte.state === 'ACTIVE' ? '#10b981' : '#ef4444' }}></span>
                            {compte.state}
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Created: {new Date(compte.dateCreation).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>

            <h2 style={{ marginBottom: '1.5rem' }}>Transaction History</h2>

            {/* Transactions Table */}
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)' }}>ID</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)' }}>Date & Time</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)' }}>Type</th>
                                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)' }}>Source/Destination</th>
                                <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-muted)' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compte.transactions && compte.transactions.length > 0 ? (
                                compte.transactions.map(transaction => (
                                    <tr key={transaction.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem' }}>#{transaction.id}</td>
                                        <td style={{ padding: '1rem' }}>{new Date(transaction.date).toLocaleString()}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '0.25rem',
                                                fontSize: '0.8rem',
                                                background: transaction.type === 'DEPOT' ? 'rgba(16, 185, 129, 0.1)' :
                                                    transaction.type === 'RETRAIT' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                                                color: transaction.type === 'DEPOT' ? '#34d399' :
                                                    transaction.type === 'RETRAIT' ? '#f87171' : '#60a5fa'
                                            }}>
                                                {transaction.type}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            {transaction.type === 'VIREMENT' ?
                                                (transaction.compteDestinationId === compte.id ?
                                                    `From Account #${transaction.compteSourceId}` :
                                                    `To Account #${transaction.compteDestinationId}`)
                                                : '-'}
                                        </td>
                                        <td style={{
                                            padding: '1rem', textAlign: 'right', fontWeight: '500',
                                            color: (transaction.type === 'RETRAIT' || (transaction.type === 'VIREMENT' && transaction.compteSourceId === compte.id)) ? '#f87171' : '#34d399'
                                        }}>
                                            {(transaction.type === 'RETRAIT' || (transaction.type === 'VIREMENT' && transaction.compteSourceId === compte.id)) ? '-' : '+'}
                                            {transaction.montant.toFixed(2)} MAD
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No transactions found for this account.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;
