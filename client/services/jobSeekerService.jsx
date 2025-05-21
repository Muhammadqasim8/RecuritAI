import axios from 'axios';

const API_URL = 'http://localhost:8700/api/jobseeker'; // Change this based on your backend URL

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Assuming you're storing JWT in localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 10. Create Job Seeker Profile
export const createJobSeekerProfile = async (profileData) => {
  try {
    const response = await axios.post(`${API_URL}/completeprofile`, profileData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error creating job seeker profile:', error);
    throw error;
  }
};

// 11. Get Job Seeker Profile
export const getJobSeekerProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/completeprofile`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching job seeker profile:', error);
    throw error;
  }
};


// 1. Fetch Available Tests
export const getAvailableTests = async () => {
  try {
    const response = await axios.get(`${API_URL}/tests`, getAuthHeaders());
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching tests:', error);
    throw error;
  }
};

// 2. Fetch Test Questions
export const getTestQuestions = async (testId) => {
  try {
    const response = await axios.get(`${API_URL}/tests/${testId}/questions`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching test questions:', error);
    throw error;
  }
};

// 3. Submit Test Results
export const submitTest = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/submit`,
      data,  // Now sending { testId, score }
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting test:', error);
    throw error;
  }
};



// 8. Get Performance Summary
export const getPerformanceSummary = async () => {
  try {
    const response = await axios.get(`${API_URL}/performance`, getAuthHeaders());
    console.log(response.data);    
    return response.data;
  } catch (error) {
    console.error('Error fetching performance summary:', error);
    throw error;
  }
};


// 4. Fetch All Jobs
// export const getAllJobs = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/jobs`, getAuthHeaders());
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     throw error;
//   }
// };

// 5. Apply to a Job
// export const applyToJob = async (jobId) => {
//   try {
//     const response = await axios.post(`${API_URL}/apply/${jobId}`, {}, getAuthHeaders());
//     return response.data;
//   } catch (error) {
//     console.error('Error applying to job:', error);
//     throw error;
//   }
// };

// // 6. Get My Job Applications
// export const getMyApplications = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/applications`, getAuthHeaders());
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching job applications:', error);
//     throw error;
//   }
// };

// 7. Get My Test Results
export const getMyResults = async () => {
  try {
    const response = await axios.get(`${API_URL}/results`, getAuthHeaders());
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching results:', error);
    throw error;
  }
};
