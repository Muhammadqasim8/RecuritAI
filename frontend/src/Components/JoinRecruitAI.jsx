import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import RecruiterOptions from "./RecruiterOptions";
import JobSeekerOptions from "./JobSeekerOptions";

const JoinRecruitAI = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-center text-2xl md:text-4xl font-bold text-gray-800 mb-8">
          Join RecruitAI as
        </h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Job Seeker Box */}
          <Link
            to="/job-seeker-options"
            className="flex-1 bg-blue-100 hover:bg-blue-200 transition duration-300 p-6 rounded-lg shadow-md cursor-pointer text-center"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-blue-800">
              Job Seeker
            </h2>
            <p className="text-gray-600 mt-2">
              Explore opportunities and match with the right job for you.
            </p>
          </Link>
          {/* Recruiter Box */}
          <Link
            to="/recruiter-options"
            className="flex-1 bg-green-100 hover:bg-green-200 transition duration-300 p-6 rounded-lg shadow-md cursor-pointer text-center"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-green-800">
              Recruiter
            </h2>
            <p className="text-gray-600 mt-2">
              Find top talent and streamline your recruitment process.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinRecruitAI;
