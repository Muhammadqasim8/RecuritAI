import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Function to handle user login
export const login = async (email, password) => {
    try {
        // Updated URL to use /api/auth/login
        const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        return response.data; // Returns the response data (e.g., token and role)
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

// Function to handle user signup/registration
export const signup = async (name, email, password, role) => {
    try {
        // Updated URL to use /api/auth/register and added role parameter
        const response = await axios.post(`${API_URL}/api/auth/register`, { name, email, password, role });
        return response.data; // Returns the response data (e.g., success message)
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Signup failed');
    }
};

// Function to get protected data (endpoint may need adjustment to match your backend)
export const getProtectedData = async () => {
    const token = localStorage.getItem('token'); // Get token from local storage

    if (!token) {
        throw new Error('No token found, please login');
    }

    try {
        // Adjust this endpoint if your backend provides a different route for protected data
        const response = await axios.get(`${API_URL}/api/protected-route`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Access denied');
    }
};

export const completeRecruiterProfile = async (profileData) => {
    try {
        const token = localStorage.getItem('token'); // Get auth token

        if (!token) {
            throw new Error('No token found. Please log in.');
        }

        const response = await axios.post(`${API_URL}/api/complete-profile/recruiter`, profileData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data; // Success message from backend
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to complete recruiter profile.');
    }
};

// Function to complete job seeker profile
export const completeJobSeekerProfile = async (profileData) => {
    try {
        const token = localStorage.getItem('token'); // Get auth token

        if (!token) {
            throw new Error('No token found. Please log in.');
        }

        const response = await axios.post(`${API_URL}/api/complete-profile/job-seeker`, profileData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data; // Success message from backend
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to complete job seeker profile.');
    }
};

// export default AuthService;