import React, { useState } from "react";
import ResumeTable from "./ResumeTable"; // Import the table component

const UploadForm = () => {
  const [jobDescription, setJobDescription] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [tableData, setTableData] = useState(null);

  const handleFileChange = (e, setter) => {
    setter(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobDescription || resumes.length === 0) {
      alert("Please upload both Job Description and Resumes!");
      return;
    }

    const formData = new FormData();
    formData.append("job_description", jobDescription[0]);
    Array.from(resumes).forEach((file) => formData.append("resumes", file));

    try {
      const response = await fetch("http://localhost:5000/process", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.top_matches) {
        setTableData(data.top_matches);
      } else {
        alert("Error: No matches found!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the files.");
    }
  };

  if (tableData) {
    return <ResumeTable resumes={tableData} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Upload Files</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Job Description</label>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => handleFileChange(e, setJobDescription)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Resumes</label>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              multiple
              onChange={(e) => handleFileChange(e, setResumes)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Get Matched Resumes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
