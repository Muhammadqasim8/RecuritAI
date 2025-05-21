import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTechnologyById, getTestsByTechnology, deleteTest, addMCQToTest } from '../services/adminService';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TestCard from '../components/tests/TestCard';

const TechnologyTests = () => {
  const { techId } = useParams();
  const navigate = useNavigate();
  
  const [technology, setTechnology] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddTestForm, setShowAddTestForm] = useState(false);
  const [newTestTitle, setNewTestTitle] = useState('');

  // Map of all technologies for reference
  const TECHNOLOGIES = {
    1: { id: 1, name: 'ReactJS' },
    2: { id: 2, name: 'Node.js' },
    3: { id: 3, name: 'Flutter' },
    4: { id: 4, name: 'Logical' }
  };

  // Function to get technology name by id
  const getTechNameById = (id) => {
    return TECHNOLOGIES[id]?.name || 'Unknown Technology';
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Get technology details
        const techData = await getTechnologyById(techId);
        setTechnology(techData);
        
        // Get tests for this technology
        const testsData = await getTestsByTechnology(techId);
        setTests(testsData);
        
        setLoading(false);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load technology data. Please try again later.");
        setLoading(false);
      }
    };
    
    loadData();
  }, [techId]);

  const handleDeleteTest = async (testId) => {
    if (window.confirm("Are you sure you want to delete this test? This action cannot be undone.")) {
      try {
        await deleteTest(testId);
        setTests(tests.filter(test => test.id !== testId));
      } catch (err) {
        console.error("Failed to delete test:", err);
        alert("Failed to delete test. Please try again.");
      }
    }
  };

  const handleAddTest = async () => {
    if (!newTestTitle.trim()) {
      alert("Please enter a test title.");
      return;
    }

    try {
      // This would typically be an API call
      const newTest = {
        id: Date.now(), // Simulating an ID for demo
        title: newTestTitle,
        technology: parseInt(techId),
        mcqs: []
      };
      
      setTests([...tests, newTest]);
      setNewTestTitle('');
      setShowAddTestForm(false);
    } catch (err) {
      console.error("Failed to add test:", err);
      alert("Failed to add test. Please try again.");
    }
  };

  const handleAddMCQ = async (testId, mcqData) => {
    try {
      // Add an ID to the MCQ
      const mcqWithId = {
        ...mcqData,
        id: Date.now() // Simulating an ID for demo
      };
      
      await addMCQToTest(testId, mcqWithId);
      
      // Update the tests state
      setTests(tests.map(test => {
        if (test.id === testId) {
          return {
            ...test,
            mcqs: [...(test.mcqs || []), mcqWithId]
          };
        }
        return test;
      }));
    } catch (err) {
      console.error("Failed to add MCQ:", err);
      alert("Failed to add question. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50">
        <div className="text-center p-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div>
          <p className="text-indigo-800 font-medium">Loading tests...</p>
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
          <div>
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center text-indigo-600 hover:text-indigo-800 mb-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-indigo-900">
              {technology?.name || getTechNameById(parseInt(techId))} Tests
            </h1>
          </div>
          
          <button
            onClick={() => setShowAddTestForm(!showAddTestForm)}
            className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {showAddTestForm ? 'Cancel' : 'Add Test'}
          </button>
        </div>

        {/* Add Test Form */}
        {showAddTestForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold text-indigo-800 mb-4">Add New Test</h2>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="text"
                placeholder="Enter test title"
                value={newTestTitle}
                onChange={(e) => setNewTestTitle(e.target.value)}
                className="flex-grow p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
              />
              <button
                onClick={handleAddTest}
                className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-md flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Create Test
              </button>
            </div>
          </div>
        )}

        {/* Tests List */}
        {tests.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Tests Found</h3>
            <p className="text-gray-600 mb-6">There are no tests available for this technology yet.</p>
            <button
              onClick={() => setShowAddTestForm(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-md inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create First Test
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {tests.map(test => (
              <TestCard 
                key={test.id} 
                test={test} 
                onDelete={handleDeleteTest} 
                onAddMCQ={handleAddMCQ}
                getTechNameById={getTechNameById}
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default TechnologyTests;