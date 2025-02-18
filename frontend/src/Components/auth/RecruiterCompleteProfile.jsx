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
      // Navigate to the next page after successful profile completion
      navigate('/join-recruitai');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="recruiter-profile">
      <h2>Complete Your Recruiter Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            id="companyName"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="industry">Industry:</label>
          <input
            id="industry"
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="website">Website:</label>
          <input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Profile</button>
      </form>
    </div>
  );
};

export default RecruiterCompleteProfile;
