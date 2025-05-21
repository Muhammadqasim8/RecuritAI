import axios from 'axios';

const API_URL = 'http://localhost:8700/api/admin'; // Your admin endpoint base URL
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 1. Create a new test
export const createTest = async (title, technology) => {
  try {
    const response = await axios.post(`${API_URL}/test`, { title, technology }, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error creating test:', error);
    throw error;
  }
};

// 4. Get all MCQs for a specific test
export const getMcqsForTest = async (testId) => {
  try {
    const response = await axios.get(`${API_URL}/test/${testId}/mcqs`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(`Error fetching MCQs for test ID ${testId}:`, error);
    throw error;
  }
};


// 2. Update a test by ID
export const updateTest = async (id, title, technology) => {
  try {
    const response = await axios.put(`${API_URL}/test/${id}`, { title, technology }, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error updating test:', error);
    throw error;
  }
};

// 3. Delete a test by ID
export const deleteTest = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/test/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error deleting test:', error);
    throw error;
  }
};

// 4. Add an MCQ to a test
export const addMCQ = async (testId, {
  question_text,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/test/${testId}/mcq`,
      {
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option
      },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error adding MCQ:', error);
    throw error;
  }
};

// 5. Update an MCQ
export const updateMCQ = async (id, {
  question_text,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option
}) => {
  try {
    const response = await axios.put(
      `${API_URL}/mcq/${id}`,
      {
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option
      },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error updating MCQ:', error);
    throw error;
  }
};

// 6. Delete an MCQ
export const deleteMCQ = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/mcq/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error deleting MCQ:', error);
    throw error;
  }
};

// 7. Get all tests with their MCQs
export const getAllTests = async () => {
  try {
    const response = await axios.get(`${API_URL}/tests`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching tests:', error);
    throw error;
  }
};