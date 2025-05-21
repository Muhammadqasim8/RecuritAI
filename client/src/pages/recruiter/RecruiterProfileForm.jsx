import React, { useState, useEffect } from 'react';
import { createRecruiterProfile, getRecruiterProfile } from '../../../services/recruiterService';
import { useNavigate } from 'react-router-dom';

const RecruiterProfileForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company_name: '',
    company_website: '',
    contact_number: ''
  });

  useEffect(() => {
    getRecruiterProfile()
      .then((data) => {
        setFormData(data);
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRecruiterProfile(formData);
      navigate('/recruiter/dashboard');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Complete Your Company Profile</h2>

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
        name="company_name"
        value={formData.company_name}
        onChange={handleChange}
        placeholder="Company Name"
        className="border p-3 w-full rounded"
        required
      />
      <input
        name="company_website"
        value={formData.company_website}
        onChange={handleChange}
        placeholder="Company Website"
        className="border p-3 w-full rounded"
      />
      <input
        name="contact_number"
        value={formData.contact_number}
        onChange={handleChange}
        placeholder="Contact Number"
        className="border p-3 w-full rounded"
        required
      />

      <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
        Save Profile
      </button>
    </form>
  );
};

export default RecruiterProfileForm;
