// src/pages/auth/Register.jsx
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    role: '' 
  });
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setProfilePic(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear any previous errors
      setError('');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.role) {
      setError('Please select a role');
      return;
    }

    setIsLoading(true);
    try {
      // Create FormData object to handle file upload
      const registerData = new FormData();
      registerData.append('name', formData.name);
      registerData.append('email', formData.email);
      registerData.append('password', formData.password);
      registerData.append('role', formData.role);
      
      // Append profile picture if selected
      if (profilePic) {
        registerData.append('profile_picture', profilePic);
      }

      // Note: You'll need to modify your registerUser function to handle FormData
      const response = await registerUser(registerData);
      console.log(response);

      const { token, user } = response;

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userId', user.id); // optional

      if (user.role === 'job_seeker') {
        navigate('/jobseeker/complete-profile');
      } else if (user.role === 'recruiter') {
        navigate('/recruiter/complete-profile');
      } else {
        navigate('/login');
      }

    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 p-4 font-sans">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/logo.png" 
            alt="Recruit AI Logo" 
            className="h-20 mb-2"
          />
          <h1 className="text-3xl font-bold text-indigo-800">Recruit<span className="text-indigo-600">AI</span></h1>
          <p className="text-indigo-600 mt-1 text-sm">Smart recruitment solutions</p>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white shadow-lg rounded-xl p-8 border-t border-indigo-100">
          <h2 className="text-2xl font-bold mb-6 text-indigo-800 text-center">Create Account</h2>
          
          {error && (
            <div className="bg-rose-100 text-rose-700 p-4 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-2">
              <label className="block text-sm font-medium text-indigo-700 mb-3 text-center">
                Profile Picture
              </label>
              <div 
                className="w-32 h-32 rounded-full border-2 border-dashed border-indigo-300 flex items-center justify-center cursor-pointer overflow-hidden bg-indigo-50 hover:bg-indigo-100 transition"
                onClick={triggerFileInput}
              >
                {profilePicPreview ? (
                  <img 
                    src={profilePicPreview} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-xs text-indigo-500 mt-1 block">Upload Photo</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
              <p className="text-xs text-indigo-500 mt-2">
                {profilePic ? profilePic.name : 'JPG, PNG or GIF (Max. 5MB)'}
              </p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-indigo-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-indigo-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-indigo-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-indigo-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-indigo-700 mb-1">
                Select Your Role
              </label>
              <select
                id="role"
                name="role"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-indigo-800"
                onChange={handleChange}
                defaultValue=""
                required
              >
                <option value="" disabled>I am a...</option>
                <option value="job_seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition font-medium shadow-md flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-indigo-800">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        
        <div className="text-center mt-6 text-indigo-500 text-sm">
          &copy; {new Date().getFullYear()} RecruitAI. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Register;