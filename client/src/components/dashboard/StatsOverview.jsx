import React from 'react';

const StatsOverview = ({ testsCount, technologiesCount, activeAssessmentsCount = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Tests</p>
            <p className="text-2xl font-bold text-gray-800">{testsCount}</p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Technologies</p>
            <p className="text-2xl font-bold text-gray-800">{technologiesCount}</p>
          </div>
          <div className="bg-amber-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rose-500">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Active Assessments</p>
            <p className="text-2xl font-bold text-gray-800">{activeAssessmentsCount}</p>
          </div>
          <div className="bg-rose-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;