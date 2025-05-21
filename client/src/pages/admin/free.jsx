
import React, { useEffect, useState } from 'react';
import {
  getAllTests,
  createTest,
  deleteTest,
  addMCQ
} from '../../../services/adminService';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tests');
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Form states
  const [newTestTitle, setNewTestTitle] = useState('');
  const [newTestTechnology, setNewTestTechnology] = useState('');

  // Technologies list (static based on your backend)
  const TECHNOLOGIES = [
    { id: 1, name: 'ReactJS' },
    { id: 2, name: 'Node.js' },
    { id: 3, name: 'Flutter' },
    { id: 4, name: 'Logical' }
  ];

  // Load all tests on mount
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const data = await getAllTests();
        setTests(data);
      } catch (err) {
        setError('Failed to load tests.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'tests') fetchTests();
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const getTechNameById = (id) => {
    const tech = TECHNOLOGIES.find((t) => t.id === Number(id));
    return tech ? tech.name : 'Unknown';
  };

  const handleCreateTest = async () => {
    if (!newTestTitle || !newTestTechnology) {
      alert('Please fill in both fields.');
      return;
    }

    try {
      const result = await createTest(newTestTitle, newTestTechnology);
      setTests([
        ...tests,
        {
          id: result.testId,
          title: newTestTitle,
          technology: Number(newTestTechnology),
          mcqs: []
        },
      ]);
      setNewTestTitle('');
      setNewTestTechnology('');
    } catch (err) {
      alert('Error creating test.');
    }
  };

  const handleDeleteTest = async (testId) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;
    try {
      await deleteTest(testId);
      setTests(tests.filter((t) => t.id !== testId));
    } catch (err) {
      alert('Error deleting test.');
    }
  };

  const handleAddMCQ = async (testId, mcqData) => {
    try {
      const result = await addMCQ(testId, mcqData);

      setTests(
        tests.map((test) =>
          test.id === testId
            ? {
                ...test,
                mcqs: [...(test.mcqs || []), result.mcq],
              }
            : test
        )
      );
    } catch (err) {
      alert('Error adding MCQ.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-2xl font-bold text-indigo-700 ml-3">Assessment Admin</h1>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 rounded-md text-indigo-700 hover:bg-indigo-50 transition-colors duration-200">
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

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-indigo-800">Assessment Dashboard</h2>
          <p className="text-gray-600 mt-2">Create and manage technical assessment tests.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Tests</p>
                <p className="text-2xl font-bold text-gray-800">{tests.length}</p>
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
                <p className="text-2xl font-bold text-gray-800">{TECHNOLOGIES.length}</p>
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
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
              <div className="bg-rose-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex space-x-4 border-b border-indigo-200 mb-6 bg-white p-2 rounded-t-lg shadow-md">
          <button
            onClick={() => setActiveTab('tests')}
            className={`py-3 px-6 font-medium rounded-t-lg transition-colors duration-200 ${
              activeTab === 'tests'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-indigo-600 hover:bg-indigo-100'
            }`}
          >
            Tests & Questions
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`py-3 px-6 font-medium rounded-t-lg transition-colors duration-200 ${
              activeTab === 'results'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-indigo-600 hover:bg-indigo-100'
            }`}
          >
            Results Analysis
          </button>
        </div>

        {/* Content Area with Loading & Error States */}
        {loading && (
          <div className="flex justify-center items-center bg-white p-10 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-indigo-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-indigo-600 text-lg font-medium">Loading tests...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-rose-100 p-4 border-l-4 border-rose-600">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-rose-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-rose-700 font-medium">{error}</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right">
              <button
                onClick={() => window.location.reload()}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Tests Tab Content */}
        {activeTab === 'tests' && !loading && !error && (
          <div className="space-y-8">
            {/* Add New Test Form */}
            <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-indigo-600">
              <h2 className="text-xl font-bold mb-4 text-indigo-800">Create New Test</h2>
              <div className="flex flex-wrap gap-4">
                <input
                  value={newTestTitle}
                  onChange={(e) => setNewTestTitle(e.target.value)}
                  placeholder="Test Title"
                  className="flex-1 p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <select
                  value={newTestTechnology}
                  onChange={(e) => setNewTestTechnology(e.target.value)}
                  className="flex-1 p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">Select Technology</option>
                  {TECHNOLOGIES.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleCreateTest}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md font-medium"
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Test
                  </div>
                </button>
              </div>
            </div>

            {/* List of Tests */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Tests</h3>
              
              {tests.length > 0 ? (
                tests.map((test) => (
                  <TestCard
                    key={test.id}
                    test={test}
                    onDelete={handleDeleteTest}
                    onAddMCQ={handleAddMCQ}
                    getTechNameById={getTechNameById}
                  />
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-10 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-indigo-500 text-lg mb-2">No tests found</p>
                  <p className="text-gray-500">Create your first technical assessment test using the form above.</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Results Tab Content (placeholder) */}
        {activeTab === 'results' && !loading && !error && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-amber-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Results Analysis</h3>
            <p className="text-gray-600">Assessment results and analytics will appear here.</p>
          </div>
        )}
      </main>

      {/* Footer */}
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
    </div>
  );
};

/// Two key fixes:
// 1. Ensure that test.mcqs always exists before trying to access its properties
// 2. Add a null check when mapping through mcqs 

const TestCard = ({ test, onDelete, onAddMCQ, getTechNameById }) => {
  const [showForm, setShowForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const navigate = useNavigate();

  const handleSubmitMCQ = () => {
    // Validate form
    if (!newQuestion || !optionA || !optionB || !optionC || !optionD || !correctOption) {
      alert('Please fill in all fields.');
      return;
    }

    onAddMCQ(test.id, {
      question_text: newQuestion,
      option_a: optionA,
      option_b: optionB,
      option_c: optionC,
      option_d: optionD,
      correct_option: correctOption.toUpperCase()
    });

    // Reset form
    setShowForm(false);
    setNewQuestion('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setCorrectOption('');
  };

  // Ensure mcqs exists
  const mcqs = test.mcqs || [];

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Test Header */}
      <div className="p-6 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-indigo-800">
              {test.title}
            </h3>
            <div className="flex items-center mt-2">
              <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {getTechNameById(test.technology)}
              </span>
              <span className="text-gray-500 text-sm ml-4">
                {mcqs.length} questions
              </span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowForm(!showForm)}
              className={`px-4 py-2 rounded-lg font-medium shadow-sm transition-colors duration-200 flex items-center ${
                showForm 
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {showForm ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                )}
              </svg>
              {showForm ? 'Cancel' : 'Add MCQ'}
            </button>
            <button
              onClick={() => navigate(`/admin/test/${test.id}/questions`)}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 font-medium shadow-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </button>
            <button
              onClick={() => onDelete(test.id)}
              className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200 font-medium shadow-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* MCQ Form */}
      {showForm && (
        <div className="p-6 bg-indigo-50 space-y-4">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="text-lg font-medium text-indigo-800">Add New Question</h4>
          </div>
          
          <input
            placeholder="Enter question text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center bg-white p-3 rounded-lg border border-indigo-200 shadow-sm">
              <span className="font-bold text-indigo-700 mr-3 bg-indigo-100 w-6 h-6 flex items-center justify-center rounded-full">A</span>
              <input
                placeholder="Option A"
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
                className="flex-1 focus:outline-none"
              />
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg border border-indigo-200 shadow-sm">
              <span className="font-bold text-indigo-700 mr-3 bg-indigo-100 w-6 h-6 flex items-center justify-center rounded-full">B</span>
              <input
                placeholder="Option B"
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
                className="flex-1 focus:outline-none"
              />
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg border border-indigo-200 shadow-sm">
              <span className="font-bold text-indigo-700 mr-3 bg-indigo-100 w-6 h-6 flex items-center justify-center rounded-full">C</span>
              <input
                placeholder="Option C"
                value={optionC}
                onChange={(e) => setOptionC(e.target.value)}
                className="flex-1 focus:outline-none"
              />
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg border border-indigo-200 shadow-sm">
              <span className="font-bold text-indigo-700 mr-3 bg-indigo-100 w-6 h-6 flex items-center justify-center rounded-full">D</span>
              <input
                placeholder="Option D"
                value={optionD}
                onChange={(e) => setOptionD(e.target.value)}
                className="flex-1 focus:outline-none"
              />
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg border border-indigo-200 shadow-sm">
            <label className="block text-gray-700 text-sm font-medium mb-2">Correct Answer:</label>
            <div className="flex space-x-4">
              {['A', 'B', 'C', 'D'].map((option) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="correctOption"
                    value={option}
                    checked={correctOption === option}
                    onChange={() => setCorrectOption(option)}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2 text-gray-700">Option {option}</span>
                </label>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleSubmitMCQ}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-md flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Add Question
          </button>
        </div>
      )}

      {/* Preview of MCQs would be shown here if needed */}
      {mcqs.length > 0 && (
        <div className="p-4 bg-white border-t border-indigo-100">
          <div className="flex items-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h4 className="text-lg font-medium text-indigo-800">Questions ({mcqs.length})</h4>
          </div>
          
          <div className="space-y-2">
            {mcqs.slice(0, 2).map((mcq, index) => (
              <div key={mcq.id || index} className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-sm">
                <p className="font-medium text-indigo-800 mb-1">{mcq.question_text}</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center">
                    <span className={`font-bold mr-2 w-5 h-5 flex items-center justify-center rounded-full text-xs ${
                      mcq.correct_option === 'A' ? 'bg-green-500 text-white' : 'bg-indigo-100 text-indigo-700'
                    }`}>A</span>
                    <span className="text-gray-700">{mcq.option_a}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-bold mr-2 w-5 h-5 flex items-center justify-center rounded-full text-xs ${
                      mcq.correct_option === 'B' ? 'bg-green-500 text-white' : 'bg-indigo-100 text-indigo-700'
                    }`}>B</span>
                    <span className="text-gray-700">{mcq.option_b}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-bold mr-2 w-5 h-5 flex items-center justify-center rounded-full text-xs ${
                      mcq.correct_option === 'C' ? 'bg-green-500 text-white' : 'bg-indigo-100 text-indigo-700'
                    }`}>C</span>
                    <span className="text-gray-700">{mcq.option_c}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`font-bold mr-2 w-5 h-5 flex items-center justify-center rounded-full text-xs ${
                      mcq.correct_option === 'D' ? 'bg-green-500 text-white' : 'bg-indigo-100 text-indigo-700'
                    }`}>D</span>
                    <span className="text-gray-700">{mcq.option_d}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {mcqs.length > 2 && (
              <div className="text-center mt-2">
                <button 
                  onClick={() => navigate(`/admin/test/${test.id}/questions`)}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-200"
                >
                  View all {mcqs.length} questions
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;