import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTestById, updateTestQuestion, deleteTestQuestion } from '../services/adminService';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MCQForm from '../components/tests/MCQForm';

const TestDetails = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Map of all technologies for reference
  const TECHNOLOGIES = {
    1: { id: 1, name: 'ReactJS' },
    2: { id: 2, name: 'Node.js' },
    3: { id: 3, name: 'Flutter' },
    4: { id: 4, name: 'Logical' }
  };

  useEffect(() => {
    const loadTest = async () => {
      try {
        setLoading(true);
        const testData = await getTestById(testId);
        setTest(testData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load test:", err);
        setError("Failed to load test details. Please try again later.");
        setLoading(false);
      }
    };
    
    loadTest();
  }, [testId]);

  const handleAddMCQ = async (mcqData) => {
    try {
      // Add an ID to the MCQ
      const mcqWithId = {
        ...mcqData,
        id: Date.now() // Simulating an ID for demo
      };
      
      // This would typically be an API call
      // await addMCQToTest(testId, mcqWithId);
      
      // Update the test state
      setTest({
        ...test,
        mcqs: [...(test.mcqs || []), mcqWithId]
      });
      
      setShowAddForm(false);
    } catch (err) {
      console.error("Failed to add MCQ:", err);
      alert("Failed to add question. Please try again.");
    }
  };

  const handleUpdateMCQ = async (mcqData) => {
    try {
      // This would typically be an API call
      await updateTestQuestion(testId, editingQuestion.id, mcqData);
      
      // Update the test state
      setTest({
        ...test,
        mcqs: test.mcqs.map(mcq => 
          mcq.id === editingQuestion.id ? { ...mcq, ...mcqData } : mcq
        )
      });
      
      setEditingQuestion(null);
    } catch (err) {
      console.error("Failed to update MCQ:", err);
      alert("Failed to update question. Please try again.");
    }
  };

  const handleDeleteMCQ = async (mcqId) => {
    if (window.confirm("Are you sure you want to delete this question? This action cannot be undone.")) {
      try {
        // This would typically be an API call
        await deleteTestQuestion(testId, mcqId);
        
        // Update the test state
        setTest({
          ...test,
          mcqs: test.mcqs.filter(mcq => mcq.id !== mcqId)
        });
      } catch (err) {
        console.error("Failed to delete MCQ:", err);
        alert("Failed to delete question. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50">
        <div className="text-center p-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div>
          <p className="text-indigo-800 font-medium">Loading test details...</p>
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
              onClick={() => navigate(`/admin/technology/${test?.technology}`)}
              className="flex items-center text-indigo-600 hover:text-indigo-800 mb-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Tests
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-indigo-900">
              {test?.title}
            </h1>
            <div className="flex items-center mt-2">
              <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {TECHNOLOGIES[test?.technology]?.name}
              </span>
              <span className="text-gray-500 text-sm ml-4">
                {test?.mcqs?.length || 0} questions
              </span>
            </div>
          </div>
          
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingQuestion(null);
            }}
            className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {showAddForm ? 'Cancel' : 'Add Question'}
          </button>
        </div>

        {/* Add/Edit Question Form */}
        {(showAddForm || editingQuestion) && (
          <div className="mb-8">
            <MCQForm 
              onSubmit={editingQuestion ? handleUpdateMCQ : handleAddMCQ} 
              onCancel={() => {
                setShowAddForm(false);
                setEditingQuestion(null);
              }}
              initialData={editingQuestion} 
            />
          </div>
        )}

        {/* Questions List */}
        {!test?.mcqs || test.mcqs.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Questions Found</h3>
            <p className="text-gray-600 mb-6">This test doesn't have any questions yet.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-md inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add First Question
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {test.mcqs.map((mcq, index) => (
              <div key={mcq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-indigo-50">
                  <h3 className="text-lg font-bold text-indigo-900">Question {index + 1}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingQuestion(mcq);
                        setShowAddForm(false);
                      }}
                      className="p-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteMCQ(mcq.id)}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-800 font-medium mb-4">{mcq.question}</p>
                  
                  <div className="space-y-3">
                    {mcq.options.map((option, optIndex) => (
                      <div 
                        key={optIndex} 
                        className={`p-3 rounded-lg ${
                          mcq.correctOption === optIndex 
                            ? 'bg-green-50 border border-green-200' 
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          {mcq.correctOption === optIndex && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          <span className={`${mcq.correctOption === optIndex ? 'text-green-900 font-medium' : 'text-gray-800'}`}>
                            {option}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {mcq.explanation && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="text-blue-800 font-medium mb-2">Explanation:</h4>
                      <p className="text-gray-800">{mcq.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default TestDetails;
