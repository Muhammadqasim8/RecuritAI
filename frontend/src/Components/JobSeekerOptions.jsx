import React from "react";
import { useNavigate } from "react-router-dom";


const JobSeekerOptions = () => {
  const navigate = useNavigate();
  
    const handleOptionClick = (path) => {
      navigate(path); // Navigate to the specified route
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl md:text-3xl font-baold text-blue-800 mb-6 text-center">
          Job Seeker Options
        </h2>
        <ul className="space-y-4">
        <li
            onClick={() => handleOptionClick("/complete-profile/job-seeker")}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          > 
            Complete Profile 
           </li>
          <li className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
            Check ATS of your resume
          </li>
          <li className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
            Build a resume with a high ATS
          </li>
          <li className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
            Prove your skills by a test and get recommendations from our system and recruited by best companies
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JobSeekerOptions;
