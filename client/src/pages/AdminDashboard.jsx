import React, { useEffect, useState } from 'react';
import { getAllTests } from '../services/adminService';
import { useNavigate } from 'react-router-dom';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import StatsOverview from '../components/dashboard/StatsOverview';
import TechCard from '../components/dashboard/TechCard';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Technologies list
  const TECHNOLOGIES = [
    { id: 1, name: 'ReactJS', testsCount: 0 },
    { id: 2, name: 'Node.js', testsCount: 0 },
    { id: 3, name: 'Flutter', testsCount: 0 },
    { id: 4, name: 'Logical', testsCount: 0 }
  ];


// Continued from AdminDashboard.jsx
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const testsData = await getAllTests();
        
        // Count tests per technology
        const techWithCounts = TECHNOLOGIES.map(tech => {
          const testsForTech = testsData.filter(test => test.technology === tech.id);
          return {
            ...tech,
            testsCount: testsForTech.length
          };
        });
        
        setTechnologies(techWithCounts);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch tests:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchTests();
  }, []);

  // Calculate statistics
  const getTotalTests = () => {
    return technologies.reduce((sum, tech) => sum + tech.testsCount, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50">
        <div className="text-center p-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div>
          <p className="text-indigo-800 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-rose-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-indigo-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-4 md:mb-0">
            Admin Dashboard
          </h1>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === 'dashboard' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('technologies')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === 'technologies' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              Technologies
            </button>
          </div>
        </div>
        
        {activeTab === 'dashboard' && (
          <>
            <StatsOverview 
              testsCount={getTotalTests()} 
              technologiesCount={technologies.length}
            />
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-indigo-800">Recent Activities</h2>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">Node.js Test Created</p>
                    <p className="text-gray-500 text-sm">Node.js Advanced Concepts test added with 15 questions</p>
                    <p className="text-gray-400 text-xs mt-1">Today, 10:30 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">ReactJS Test Updated</p>
                    <p className="text-gray-500 text-sm">React Hooks test updated with new questions</p>
                    <p className="text-gray-400 text-xs mt-1">Yesterday, 4:15 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
                  <div className="bg-red-100 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">Test Deleted</p>
                    <p className="text-gray-500 text-sm">Flutter Basic Concepts test has been removed</p>
                    <p className="text-gray-400 text-xs mt-1">May 18, 2025, 11:20 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'technologies' && (
          <>
            <div className="flex mb-6">
              <button
                onClick={() => navigate('/admin/create-tech')}
                className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-md flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Technology
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technologies.map(tech => (
                <TechCard key={tech.id} technology={tech} />
              ))}
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
