import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { totaljobseekers,  getRecommendedones,  } from '../../../services/recruiterService';

const Dashboard = () => {
  const navigate = useNavigate();
  const[totalCandidates, setTotalCandidates] = useState('');
  useEffect(() => {
    const fetchTotalJobSeekers = async () => {
      try {
        const res = await totaljobseekers();
        console.log(res);
        setTotalCandidates(res.count);
      } catch (err) {
        console.error('Failed to fetch total job seekers:', err);
      }
    };

    const talent = () => {
      const talented = getRecommendedones();
      console.log(talented);
      
    }

    fetchTotalJobSeekers();
    talent();
  }, []);
    const handleLogout = () => {
    // Remove token or any auth data from localStorage/sessionStorage
    localStorage.removeItem('token'); // Adjust based on your actual key
    localStorage.removeItem('user');

    // Redirect to homepage
    navigate('/');
  };

  const handleOptionClick = (path) => {
    navigate(path);
  };

  const options = [
    {
      id: 1,
      title: "Match Resumes",
      description: "Get matched resumes according to job requirements",
      path: "/get-matched-resumes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Talented Candidates",
      description: "Get talented candidates recommended by RecruitAI",
      path: "/get-talented-candidates",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    // {
    //   id: 3,
    //   title: "Create New Job",
    //   description: "Post a new job position and start recruiting",
    //   path: "/create-job",
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    //     </svg>
    //   ),
    // },
    // {
    //   id: 4,
    //   title: "Manage Candidates",
    //   description: "Review and manage your candidate pipeline",
    //   path: "/manage-candidates",
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    //     </svg>
    //   ),
    // },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-indigo-50">
      <header className="bg-white shadow-md py-4 px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center">
            <img src="/logo.png" alt="Recruit AI" className="h-10 w-auto mr-3" />
            <h1 className="text-2xl font-bold text-indigo-700">RecruitAI</h1>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 rounded-md text-indigo-700 hover:bg-indigo-50 transition-colors duration-200">
              Notifications
            </button>
            <button className="px-4 py-2 rounded-md text-indigo-700 hover:bg-indigo-50 transition-colors duration-200">
              Profile
            </button>
                  <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
          </div>
        </div>
      </header>

      <main className="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-indigo-800">Recruiter Dashboard</h2>
          <p className="text-gray-600 mt-2">Welcome back! Here's what you can do today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
          
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-800">{totalCandidates}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rose-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Interviews This Week</p>
                <p className="text-2xl font-bold text-gray-800">8</p>
              </div>
              <div className="bg-rose-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => handleOptionClick(option.path)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex justify-center mb-4">{option.icon}</div>
                  <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
                    {option.description}
                  </p>
                </div>
                <div className="bg-indigo-500 group-hover:bg-indigo-600 h-2 w-full transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              <div className="p-4 hover:bg-indigo-50 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">New candidate application</p>
                    <p className="text-sm text-gray-500">John Doe applied for Senior Developer position</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-500">2h ago</span>
                </div>
              </div>
              
              <div className="p-4 hover:bg-indigo-50 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Job posting updated</p>
                    <p className="text-sm text-gray-500">Marketing Manager job description modified</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-500">5h ago</span>
                </div>
              </div>
              
              <div className="p-4 hover:bg-indigo-50 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="bg-rose-100 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Interview scheduled</p>
                    <p className="text-sm text-gray-500">Interview with Sarah Parker for UX Designer position</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-500">1d ago</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right">
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                View all activity →
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-indigo-600 text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="/logo.svg" alt="Recruit AI" className="h-8 w-auto mr-3" />
            <span className="font-semibold">RecruitAI</span>
          </div>
          <div className="text-sm text-indigo-200">
            © 2025 RecruitAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;