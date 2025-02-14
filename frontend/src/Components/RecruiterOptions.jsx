import React from "react";
import { useNavigate } from "react-router-dom";

const RecruiterOptions = () => {
  const navigate = useNavigate();

  const handleOptionClick = (path) => {
    navigate(path); // Navigate to the specified route
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center">
          Recruiter Options
        </h2>
        <ul className="space-y-4">
          <li
            onClick={() => handleOptionClick("/get-matched-resumes")}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          >
            Get matched resumes according to job requirements
          </li>
          <li
            onClick={() => handleOptionClick("/get-talented-candidates")}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          >
            Get talented candidates recommended by RecruitAI
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecruiterOptions;
