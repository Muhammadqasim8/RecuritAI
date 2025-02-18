import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { completeJobSeekerProfile } from '../../services/authService';

const JobSeekerCompleteProfile = () => {
  const [resumeLink, setResumeLink] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await completeJobSeekerProfile(resumeLink, skills, experience, education);
      // Navigate to the next page after successful profile completion
      navigate('/join-recruitai');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="jobseeker-profile">
      <h2>Complete Your Job Seeker Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="resumeLink">Resume Link:</label>
          <input
            id="resumeLink"
            type="url"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="skills">Skills:</label>
          <textarea
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="experience">Experience:</label>
          <textarea
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="education">Education:</label>
          <textarea
            id="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Profile</button>
      </form>
    </div>
  );
};

export default JobSeekerCompleteProfile;
