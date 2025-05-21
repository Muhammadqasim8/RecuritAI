import React, { useState } from 'react';

const MCQForm = ({ onSubmit, onCancel }) => {
  const [newQuestion, setNewQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState('');

  const handleSubmit = () => {
    // Validate form
    if (!newQuestion || !optionA || !optionB || !optionC || !optionD || !correctOption) {
      alert('Please fill in all fields.');
      return;
    }

    onSubmit({
      question_text: newQuestion,
      option_a: optionA,
      option_b: optionB,
      option_c: optionC,
      option_d: optionD,
      correct_option: correctOption.toUpperCase()
    });

    // Reset form
    setNewQuestion('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setCorrectOption('');
  };

  return (
    <div className="p-6 bg-indigo-50 space-y-4 rounded-lg shadow-md">
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
      
      <div className="flex space-x-4">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-md flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Add Question
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium shadow-md flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MCQForm;