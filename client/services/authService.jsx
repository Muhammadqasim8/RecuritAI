import axios from 'axios';

const API_URL = 'http://localhost:8700/api/auth'; // Change this based on your backend URL

// 1. Register User
export const registerUser = async (formData) => {
  try {
    // Using FormData - Set the correct content type header
    // The browser will automatically set the correct Content-Type with boundary
    // when sending FormData (typically multipart/form-data)
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // This is actually optional as axios sets it automatically for FormData
      },
    });
    
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};


// 2. Login User
// loginUser in authService.js
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token, user } = response.data;
    console.log(token);
    console.log(user);
    
    

    if (token) {

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role); // store role from nested object
    }

    return { token, role: user.role }; // return flattened data to frontend
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

// 3. Get User Profile
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// 4. Logout User
export const logoutUser = () => {
  localStorage.removeItem('token'); // Remove token from localStorage
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending reset email:', error);
    throw error;
  }
};

// ✅ 6. Reset Password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password/${token}`, {
      newPassword,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};
