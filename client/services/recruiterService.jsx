import axios from 'axios';

const API_URL = 'http://localhost:8700/api/recruiter'; // Change this based on your backend URL

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Assuming you're storing JWT in localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// http://localhost:8700/api/recruiter/recommended

export const getRecommendedones = async () => {
  try{
    const response = await axios.get(`${API_URL}/recommended`, getAuthHeaders());
    return response.data;
  }catch(error){
    console.error('Error fetching job applications:', error);
    throw error;s

  }

}

// 1. Post a Job
export const postJob = async (title, technology, description) => {
  try {
    const response = await axios.post(
      `${API_URL}/jobs`,
      { title, technology, description },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error posting job:', error);
    throw error;
  }
};

export const totaljobseekers = async () => {
  try {
    const response = await axios.get(`${API_URL}/totalcandidates`, getAuthHeaders());
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching job applications:', error);
    throw error;
  }
};


// 2. Get All Job Applications
export const getJobApplications = async () => {
  try {
    const response = await axios.get(`${API_URL}/applications`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching job applications:', error);
    throw error;
  }
};
// 8. Create Recruiter Profile
export const createRecruiterProfile = async (profileData) => {
  try {
    const response = await axios.post(`${API_URL}/completeprofile`, profileData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error creating recruiter profile:', error);
    throw error;
  }
};

// 9. Get Recruiter Profile
export const getRecruiterProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/completeprofile`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching recruiter profile:', error);
    throw error;
  }
};


// 3. Review Test Results for Candidates
export const getTestResults = async () => {
  try {
    const response = await axios.get(`${API_URL}/test-results`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching test results:', error);
    throw error;
  }
};
