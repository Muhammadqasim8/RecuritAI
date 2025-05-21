import React, { useState } from "react";

const CandidateUploadForm = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jobDescription) {
      alert("Please upload both Resume and Job Description!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/candidate-check", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the files.");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Resume Analysis Results</h2>
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-lg font-bold">
              Overall Match Score: <span className="text-blue-600">{result.overall_match_score}%</span>
            </p>
            <div className="flex justify-between mt-2">
              <span>Skills Match: {result.skill_match_score}%</span>
              <span>Semantic Match: {result.semantic_similarity_score}%</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-gray-800">Skills Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="bg-green-50 p-3 rounded">
                <p className="font-medium text-green-700">Matching Skills:</p>
                <p className="text-sm mt-1">
                  {result.matching_skills && result.matching_skills.length > 0
                    ? result.matching_skills.join(", ")
                    : "None found"}
                </p>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <p className="font-medium text-red-700">Missing Skills:</p>
                <p className="text-sm mt-1">
                  {result.missing_skills && result.missing_skills.length > 0
                    ? result.missing_skills.join(", ")
                    : "None! Great job!"}
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-gray-800">Job Requirements</h3>
            <div className="bg-gray-50 p-3 rounded mt-2">
              <p className="font-medium">Experience Required:</p>
              <ul className="list-disc pl-6 mt-1 text-sm">
                {result.job_experience_requirements && result.job_experience_requirements.length > 0 
                  ? result.job_experience_requirements.map((exp, idx) => (
                      <li key={idx}>{exp}</li>
                    ))
                  : <li>No specific experience requirements found</li>
                }
              </ul>
              
              <p className="font-medium mt-3">Education Required:</p>
              <ul className="list-disc pl-6 mt-1 text-sm">
                {result.job_education_requirements && result.job_education_requirements.length > 0 
                  ? result.job_education_requirements.map((edu, idx) => (
                      <li key={idx}>{edu}</li>
                    ))
                  : <li>No specific education requirements found</li>
                }
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-gray-800">Recommendations</h3>
            <div className="bg-yellow-50 p-4 rounded mt-2">
              <ul className="list-disc pl-6 text-sm">
                {result.recommendations && result.recommendations.length > 0
                  ? result.recommendations.map((rec, idx) => (
                      <li key={idx} className="mb-2">{rec}</li>
                    ))
                  : <li>No specific recommendations</li>
                }
              </ul>
            </div>
          </div>
          
          <button
            onClick={() => {
              setResult(null);
              setResume(null);
              setJobDescription(null);
            }}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
          >
            Try Another Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">Resume Analyzer for Job Seekers</h1>
        <p className="text-gray-600 mb-6 text-center">
          Upload your resume and a job description to get personalized recommendations
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Resume</label>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => handleFileChange(e, setResume)}
              className="w-full px-4 py-2 border rounded-lg text-sm"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, DOCX, TXT</p>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Job Description</label>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => handleFileChange(e, setJobDescription)}
              className="w-full px-4 py-2 border rounded-lg text-sm"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Upload the job posting as PDF, DOCX, or TXT</p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Analyzing..." : "Analyze My Resume"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateUploadForm;