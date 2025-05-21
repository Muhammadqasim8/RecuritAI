// JobSeekerProfileForm.jsx
import React, { useState, useEffect } from 'react';
import { createJobSeekerProfile, getJobSeekerProfile } from '../../../services/jobSeekerService';
import { useNavigate } from 'react-router-dom';

const skillsOptions = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'AWS', 'Docker', 'Machine Learning'
];

const JobSeekerProfileForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: [],
    bio: '',
    experience: ''
  });

  useEffect(() => {
    getJobSeekerProfile()
      .then((data) => {
        // Ensure 'skills' is always an array
        setFormData({ ...data, skills: data.skills || [] });
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter(skill => skill !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJobSeekerProfile(formData);
      navigate('/jobseeker/dashboard');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Complete Your Profile</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="border p-3 w-full rounded"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        className="border p-3 w-full rounded"
        required
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="border p-3 w-full rounded"
        required
      />

      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Short Bio"
        rows={3}
        className="border p-3 w-full rounded"
      />

      <input
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        placeholder="Years of Experience"
        className="border p-3 w-full rounded"
        type="number"
        min="0"
      />

      <div>
        <label className="block font-medium text-indigo-700 mb-2">Select Your Skills:</label>
        <div className="grid grid-cols-2 gap-2">
          {skillsOptions.map((skill) => (
            <label key={skill} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={skill}
                checked={formData.skills.includes(skill)}
                onChange={handleSkillChange}
                className="accent-indigo-600"
              />
              <span>{skill}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
        Save Profile
      </button>
    </form>
  );
};

export default JobSeekerProfileForm;
