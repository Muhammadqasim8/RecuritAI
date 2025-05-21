import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MCQForm from './MCQForm';

const TestCard = ({ test, onDelete, onAddMCQ, getTechNameById }) => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmitMCQ = (mcqData) => {
    onAddMCQ(test.id, mcqData);
    setShowForm(false);
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
      {showForm && <MCQForm onSubmit={handleSubmitMCQ} onCancel={() => setShowForm(false)} />}

      {/* Preview of MCQs */}
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

export default TestCard;