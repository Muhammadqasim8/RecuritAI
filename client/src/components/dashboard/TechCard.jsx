import React from 'react';
import { useNavigate } from 'react-router-dom';

const TechCard = ({ technology }) => {
  const navigate = useNavigate();
  
  const getIconForTech = (techName) => {
    switch(techName.toLowerCase()) {
      case 'reactjs':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 4.75C7.99 4.75 4.75 7.99 4.75 12S7.99 19.25 12 19.25 19.25 16.01 19.25 12 16.01 4.75 12 4.75z" />
          </svg>
        );
      case 'node.js':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case 'flutter':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v8.5m0 0l-3-3m3 3l3-3M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'logical':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <div 
      onClick={() => navigate(`/admin/technology/${technology.id}`)}
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl border-t-4 border-indigo-500"
    >
      <div className="p-4 rounded-full bg-indigo-50 mb-4">
        {getIconForTech(technology.name)}
      </div>
      <h3 className="text-xl font-bold text-indigo-800 mb-2">{technology.name}</h3>
      <p className="text-indigo-600 font-medium">{technology.testsCount || 0} Tests</p>
      <div className="mt-4 pt-4 border-t border-indigo-100 w-full text-center">
        <p className="text-gray-500 text-sm">Click to manage tests</p>
      </div>
    </div>
  );
};

export default TechCard;