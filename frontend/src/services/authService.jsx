import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Function to handle user login
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password }); // Updated URL
        return response.data;  // Return the response data (e.g., token)
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

// Function to handle user signup
export const signup = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password }); // Updated URL
        return response.data;  // Return the response data (e.g., success message)
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Signup failed');
    }
};

// Function to get protected data
export const getProtectedData = async () => {
    const token = localStorage.getItem('token'); // Get token from local storage

    if (!token) {
        throw new Error('No token found, please login');
    }

    try {
        const response = await axios.get(`${API_URL}/protected-route`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Access denied');
    }
};
