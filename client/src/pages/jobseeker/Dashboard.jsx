// dmik cpcv tlho xdty

import React, { useEffect, useState, useCallback } from 'react';
import { FaUserCircle, FaClipboardList, FaChartLine, FaRegLightbulb, FaTasks, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  getUserProfile,
} from '../../../services/authService';
import {
  getAvailableTests,
  getPerformanceSummary,
  getMyResults
} from '../../../services/jobSeekerService';


const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  // const [applications, setApplications] = useState([]);
  const [results, setResults] = useState([]);
  const [tests, setTests] = useState([]);
  const [summary, setSummary] = useState(null);
  const [attemptedTestIds, setAttemptedTestIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Function to check if a test has been attempted
  const hasAttemptedTest = useCallback((testId) => {
    return attemptedTestIds.includes(testId);
  }, [attemptedTestIds]);
  
  const handletest = (testId) => {
    // Check if the test has been attempted before
    if (hasAttemptedTest(testId)) {
      // If test was already attempted, show a message to the user
      alert("You have already attempted this test. Each test can only be taken once.");
      return;
    }
    
    // If not attempted, navigate to the test
    navigate(`/jobseeker/tests/${testId}`);
  };
  
  const handleLogout = () => {
    // Remove token or any auth data from localStorage/sessionStorage
    localStorage.removeItem('token'); // Adjust based on your actual key
    localStorage.removeItem('user');

    // Redirect to homepage
    navigate('/');
  };

  // Function to aggregate all attempted test IDs from different sources
  const updateAttemptedTests = useCallback(() => {
    const attemptedIds = new Set();
    
    // Get test IDs from summary attempts
    if (summary?.attempts?.length > 0) {
      summary.attempts.forEach(attempt => {
        if (attempt.testId) {
          attemptedIds.add(attempt.testId);
        }
      });
    }
    
    // Get test IDs from results
    if (results?.length > 0) {
      results.forEach(result => {
        if (result.testId) {
          attemptedIds.add(result.testId);
        }
      });
    }
    
    // Also check for test names if IDs are not available
    if (summary?.attempts?.length > 0) {
      const testNameMap = {};
      tests.forEach(test => {
        testNameMap[test.title] = test.id;
      });
      
      summary.attempts.forEach(attempt => {
        if (attempt.testName && testNameMap[attempt.testName]) {
          attemptedIds.add(testNameMap[attempt.testName]);
        }
      });
    }
    
    setAttemptedTestIds(Array.from(attemptedIds));
  }, [summary, results, tests]);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Define all data loading promises
    const loadProfile = getUserProfile().then(setProfile).catch(err => {
      // console.log(typeof(profile));
      
      
      console.error("Failed to load profile:", err);

      return null;
    });
    
    const loadTests = getAvailableTests().then(setTests).catch(err => {
      console.error("Failed to load tests:", err);
      return [];
    });
    
    const loadSummary = getPerformanceSummary().then(setSummary).catch(err => {
      console.error("Failed to load performance summary:", err);
      return null;
    });
    
    const loadResults = getMyResults().then(setResults).catch(err => {
      console.error("Failed to load test results:", err);
      return [];
    });

    
    
    // Wait for all data to be loaded
    Promise.all([loadProfile, loadTests, loadSummary, loadResults])
      .then(() => {
        setIsLoading(false);
      });
  }, []);
  
  // Update attempted tests whenever relevant data changes
  useEffect(() => {
    if (!isLoading) {
      updateAttemptedTests();
    }
  }, [summary, results, tests, isLoading, updateAttemptedTests]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Top Navigation Bar with Logout */}
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-900 flex items-center">
    {/* Profile picture */}
   <img 
  src={profile?.profilePic ? `${profile.profilePic}` : '/default-profile.png'} 
  alt="s" 
  className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-indigo-600"
/>
    <span>Jobseeker Dashboard</span>
  </h2>


        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl font-semibold text-gray-600">Loading dashboard data...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            {profile && (
              <div className="bg-white rounded-xl shadow-lg p-6 transition transform hover:scale-105 duration-300">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Welcome, {profile.name}</h3>
                <p className="text-gray-600 mb-1">📧 {profile.email}</p>
                <p className="text-black">🏆 <span className="font-semibold">{profile.rank}</span></p>
                {/* <img src={profile.profile_pic} alt="" /> */}
              </div>
            )}

            {/* Performance Summary */}
            {summary && (
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl shadow-lg p-6 transition transform hover:scale-105 duration-300">
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  <FaChartLine className="mr-2" /> Performance
                </h3>
                <p>📊 Average Score: <strong>{summary.averageScore}</strong></p>
                <p>🔢 Tests Attempted: <strong>{summary.testsAttempted}</strong></p>
              </div>
            )}

            {/* Available Tests Icon */}
            <div className="bg-gradient-to-br from-green-400 to-teal-500 text-white rounded-xl shadow-lg p-6 transition transform hover:scale-105 duration-300 flex flex-col justify-between">
              <h3 className="text-2xl font-bold flex items-center">
                <FaTasks className="mr-2" /> Available Tests
              </h3>
              <p className="mt-2">📚 {tests.length} tests available</p>
              <p>🔓 {tests.length - attemptedTestIds.length} tests unlocked</p>
              <p>🔒 {attemptedTestIds.length} tests completed</p>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-teal-500 text-white rounded-xl shadow-lg p-6 transition transform hover:scale-105 duration-300 flex flex-col justify-between"
            onClick={() => navigate('/jobseeker/check-ats')}
            >
              <h3 className="text-2xl font-bold flex items-center">
                <FaTasks className="mr-2" /> Check Your Resume ATS
              </h3>
              {/* <p className="mt-2">📚 {tests.length} tests available</p> */}
              {/* <p>🔓 {tests.length - attemptedTestIds.length} tests unlocked</p> */}
              {/* <p>🔒 {attemptedTestIds.length} tests completed</p> */}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Available Tests List */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaClipboardList className="mr-2 text-blue-500" /> Available Tests
              </h3>
              {tests.length > 0 ? (
                <ul className="space-y-3">
                  {tests.map((test) => {
                    const isAttempted = hasAttemptedTest(test.id);
                    return (
                      <li 
                        key={test.id} 
                        className={`p-3 border-l-4 rounded-md transition-all ${
                          isAttempted 
                            ? 'border-gray-400 bg-gray-100 opacity-75' 
                            : 'border-blue-500 bg-gray-50 hover:shadow-md'
                        }`}
                        onClick={() => !isAttempted && handletest(test.id)}
                        style={{ cursor: isAttempted ? 'not-allowed' : 'pointer' }}
                      >
                        <div className="flex justify-between items-center">
                          <h4 className={`font-medium ${isAttempted ? 'text-gray-500' : ''}`}>{test.title}</h4>
                          {isAttempted && <FaLock className="text-gray-500" title="Test locked - already attempted" />}
                        </div>
                        <p className={`text-sm ${isAttempted ? 'text-gray-500' : 'text-gray-600'} mt-1`}>
                          {test.description}
                        </p>
                        {isAttempted && (
                          <div className="mt-2 py-1 px-2 bg-gray-200 text-gray-600 rounded text-xs inline-block">
                            Test completed - each test can only be taken once
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No tests available.</p>
              )}
            </div>

            {/* Performance Details */}
            {summary?.attempts && summary.attempts.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Performance Breakdown</h3>
                <ul className="space-y-2">
                  {summary.attempts.map((a, i) => (
                    <li key={i} className="p-3 border rounded-md bg-gray-50">
                      <h4 className="font-medium">{a.testName}</h4>
                      <p className="text-sm text-gray-600">Score: <strong>{a.score}</strong> | Date: {a.date}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

