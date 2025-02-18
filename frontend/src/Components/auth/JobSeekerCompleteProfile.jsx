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
      navigate('/join-recruitai');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl w-full mt-32">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Complete Your Job Seeker Profile</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700">Resume Link</label>
            <input
              id="resumeLink"
              type="url"
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://your-resume-link.com"
            />
          </div>
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
            <textarea
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="List your skills here..."
            />
          </div>
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
            <textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your experience..."
            />
          </div>
          <div>
            <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</label>
            <textarea
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Mention your educational background..."
            />
          </div>
          <div className='flex justify-center items-center'>
          <button
            type="submit"
            className=" bg-[#0f172a] text-white hover:text-[#0f172a] hover:bg-transparent border-2 border-[#0f172a] px-4 py-2 rounded-full transition-colors duration-300"
          >
            Submit Profile
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerCompleteProfile;
