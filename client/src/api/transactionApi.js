import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

// Get the token from local storage
const getAuthToken = () => localStorage.getItem('token');

export const getTransactions = () => {
    return axios.get(`${API_BASE_URL}/api/transactions`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
};

export const addTransaction = (formData) => {
    return axios.post(`${API_BASE_URL}/api/transactions`, formData, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
};

export const updateTransaction = (id, formData) => {
    return axios.put(`${API_BASE_URL}/api/transactions/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
};

export const deleteTransaction = (id) => {
    return axios.delete(`${API_BASE_URL}/api/transactions/${id}`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
};