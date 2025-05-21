// src/pages/auth/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      const { token, role } = await loginUser(formData.email, formData.password);
      
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'job_seeker') {
        navigate('/jobseeker/dashboard');
      } else if (role === 'recruiter') {
        navigate('/recruiter/dashboard');
      } else if (role === 'admin') {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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

        {/* Login Form Card */}
        <div className="bg-white shadow-lg rounded-xl p-8 border-t border-indigo-100">
          <h2 className="text-2xl font-bold mb-6 text-indigo-800 text-center">Welcome Back</h2>
          
          {error && (
            <div className="bg-rose-100 text-rose-700 p-4 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-5">
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
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-indigo-700">
                  Password
                </label>
                <button
                className="text-sm text-indigo-600 hover:text-indigo-800"
                onClick={()=> (navigate('/forgot-password'))}>
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition font-medium shadow-md flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-indigo-800">
              Don't have an account?{' '}
              <button 
               onClick={() => navigate('/register')}
               className="text-indigo-600 font-medium hover:underline">
                Sign up
              </button>
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

export default Login;