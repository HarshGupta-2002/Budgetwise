import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export const login = (formData) => {
    return axios.post(`${API_BASE_URL}/api/users/login`, formData);
};

export const register = (formData) => {
    return axios.post(`${API_BASE_URL}/api/users/register`, formData);
};

export const dashboard = (formData) => {
    return axios.post(`${API_BASE_URL}/api/users/dashboard`, formData);
};