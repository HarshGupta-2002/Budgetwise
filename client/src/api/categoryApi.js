import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

// Get the token from local storage
const getAuthToken = () => localStorage.getItem('token');

export const getCategories = () => {
    return axios.get(`${API_BASE_URL}/api/categories`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
};

export const addCategory = (formData) => {
    return axios.post(`${API_BASE_URL}/api/categories`, formData, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
};

export const updateCategory = (id, formData) => {
    return axios.put(`${API_BASE_URL}/api/categories/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
};

export const deleteCategory = (id) => {
    return axios.delete(`${API_BASE_URL}/api/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
};