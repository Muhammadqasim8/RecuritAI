// src/pages/auth/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../../services/authService';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    setIsLoading(true);
    try {
      const response = await resetPassword(token, password);
      setMessage(response.message || 'Password reset successfully.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Reset failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 p-4 font-sans">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="Recruit AI Logo" className="h-20 mb-2" />
          <h1 className="text-3xl font-bold text-indigo-800">Recruit<span className="text-indigo-600">AI</span></h1>
          <p className="text-indigo-600 mt-1 text-sm">Smart recruitment solutions</p>
        </div>

        {/* Card */}
        <div className="bg-white shadow-lg rounded-xl p-8 border-t border-indigo-100">
          <h2 className="text-2xl font-bold mb-6 text-indigo-800 text-center">Reset Your Password</h2>

          {error && <div className="bg-rose-100 text-rose-700 p-4 rounded-lg mb-4 text-sm">{error}</div>}
          {message && <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4 text-sm">{message}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-indigo-700 mb-1">New Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter new password"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-indigo-700 mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition font-medium shadow-md flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6 text-indigo-500 text-sm">
          &copy; {new Date().getFullYear()} RecruitAI. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
