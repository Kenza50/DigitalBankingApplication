import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:8888', // Removed to use Vite proxy
});

// Add interceptor to log errors
api.interceptors.response.use(
    response => response,
    error => {
        console.error("API Call Failed:", error);
        if (error.code === "ERR_NETWORK") {
            console.error("Network Error: Check if Gateway is running on port 8888 and CORS is configured.");
        }
        return Promise.reject(error);
    }
);

export const getComptes = () => api.get('/comptes');
export const getCompte = (id) => api.get(`/comptes/${id}`);
export const getTransactions = (accountId) => api.get(`/transactions/compte/${accountId}`);
export const getReport = (accountId) => api.get(`/reporting/report/${accountId}`);
export const getCompteDetails = (id) => api.get(`/reporting/comptes/${id}`);
export const getAllTransactions = () => api.get('/transactions');

// CRUD for Accounts
export const saveAccount = (account) => api.post('/comptes', account);
export const deleteAccount = (id) => api.delete(`/comptes/${id}`);

export const createDeposit = (accountId, amount) =>
    api.post(`/transactions/depot?compteId=${accountId}&montant=${amount}`);

export const createWithdraw = (accountId, amount) =>
    api.post(`/transactions/retrait?compteId=${accountId}&montant=${amount}`);

export const createTransfer = (source, destination, amount) =>
    api.post(`/transactions/virement?source=${source}&destination=${destination}&montant=${amount}`);

export default api;
