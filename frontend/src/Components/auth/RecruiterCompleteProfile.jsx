import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { completeRecruiterProfile } from '../../services/authService';

const RecruiterCompleteProfile = () => {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await completeRecruiterProfile(companyName, industry, website, location);
      navigate('/join-recruitai');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl w-full mt-32">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Complete Your Recruiter Profile</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your company name"
            />
          </div>
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
            <input
              id="industry"
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your industry"
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
            <input
              id="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://your-company-website.com"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your location"
            />
          </div>
          <div className='flex justify-center items-center'>
            <button
              type="submit"
              className="bg-[#0f172a] text-white hover:text-[#0f172a] hover:bg-transparent border-2 border-[#0f172a] px-4 py-2 rounded-full transition-colors duration-300"
            >
              Submit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecruiterCompleteProfile;
