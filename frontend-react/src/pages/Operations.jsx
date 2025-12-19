import React, { useState, useEffect } from 'react';
import { getComptes, createDeposit, createWithdraw, createTransfer } from '../services/api';

const Operations = () => {
    const [accounts, setAccounts] = useState([]);
    const [type, setType] = useState('DEPOT');
    const [accountId, setAccountId] = useState('');
    const [amount, setAmount] = useState('');
    const [destId, setDestId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        getComptes().then(res => setAccounts(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            if (type === 'DEPOT') {
                await createDeposit(accountId, amount);
            } else if (type === 'RETRAIT') {
                await createWithdraw(accountId, amount);
            } else if (type === 'VIREMENT') {
                await createTransfer(accountId, destId, amount);
            }
            setMessage('Operation successful!');
        } catch (err) {
            console.error(err);
            setMessage('Operation failed. Check inputs.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Operations</h1>
            <div className="glass-card">
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <button className={`btn ${type !== 'DEPOT' ? 'btn-outline' : ''}`} onClick={() => setType('DEPOT')}>Deposit</button>
                    <button className={`btn ${type !== 'RETRAIT' ? 'btn-outline' : ''}`} onClick={() => setType('RETRAIT')}>Withdraw</button>
                    <button className={`btn ${type !== 'VIREMENT' ? 'btn-outline' : ''}`} onClick={() => setType('VIREMENT')}>Transfer</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Source Account</label>
                        <select className="form-input" value={accountId} onChange={e => setAccountId(e.target.value)} required>
                            <option value="">Select Account</option>
                            {accounts.map(acc => (
                                <option key={acc.id} value={acc.id}>{acc.id} - {acc.type} ({acc.solde} MAD)</option>
                            ))}
                        </select>
                    </div>

                    {type === 'VIREMENT' && (
                        <div className="form-group">
                            <label className="form-label">Destination Account ID</label>
                            <input type="number" className="form-input" value={destId} onChange={e => setDestId(e.target.value)} required />
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Amount</label>
                        <input type="number" className="form-input" value={amount} onChange={e => setAmount(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn" style={{ width: '100%' }}>Execute Operation</button>
                </form>

                {message && (
                    <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: '0.5rem', background: message.includes('success') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Operations;
