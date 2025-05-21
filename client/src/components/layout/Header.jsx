import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h1 className="text-2xl font-bold text-indigo-700 ml-3">Assessment Admin</h1>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/admin')}
            className="px-4 py-2 rounded-md text-indigo-700 hover:bg-indigo-50 transition-colors duration-200">
            Dashboard
          </button>
          <button className="px-4 py-2 rounded-md text-indigo-700 hover:bg-indigo-50 transition-colors duration-200">
            Reports
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;