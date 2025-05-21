import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="font-semibold ml-3">Assessment Admin</span>
        </div>
        <div className="text-sm text-indigo-200">
          © 2025 Assessment Admin. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;