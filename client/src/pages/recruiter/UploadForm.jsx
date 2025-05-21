import React, { useState } from "react";

const RecruiterUploadForm = () => {
  const [jobDescription, setJobDescription] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleJobDescChange = (e) => {
    setJobDescription(e.target.files[0]);
  };

  const handleResumeChange = (e) => {
    setResumes(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobDescription || resumes.length === 0) {
      alert("Please upload both a Job Description and at least one Resume!");
      return;
    }

    const formData = new FormData();
    formData.append("job_description", jobDescription);
    resumes.forEach((resume) => {
      formData.append("resumes", resume);
    });

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/process", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setResults(data);
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

  const formatScore = (score) => {
    // Convert score from 0-1 range to percentage
    if (typeof score === 'number') {
      return (score * 100).toFixed(1) + '%';
    }
    return score + '%'; // If already formatted or string
  };

  if (results && results.top_matches) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Candidate Matches</h2>
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Top Matches</h3>
            <p className="text-sm text-gray-600 mb-4">
              {results.top_matches.length} candidates ranked by match score
            </p>
            
            <div className="space-y-6">
              {results.top_matches.map((match, idx) => (
                <div 
                  key={idx} 
                  className="border rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-lg">{match.name}</h4>
                      <p className="text-gray-600 text-sm">{match.email}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {formatScore(match.score)}
                        </div>
                        <div className="text-xs text-gray-500">Match Score</div>
                      </div>
                    </div>
                  </div>
                  
                  {idx < 3 && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Resume Preview:</span>
                        <span>{match.text ? `${match.text.substring(0, 100)}...` : "No text available"}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => {
              setResults(null);
              setJobDescription(null);
              setResumes([]);
            }}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
          >
            Start New Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-700">Resume Matcher for Recruiters</h1>
        <p className="text-gray-600 mb-6 text-center">
          Find the best candidates for your job opening
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Job Description</label>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleJobDescChange}
              className="w-full px-4 py-2 border rounded-lg text-sm"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Upload your job posting as PDF, DOCX, or TXT</p>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Candidate Resumes</label>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              multiple
              onChange={handleResumeChange}
              className="w-full px-4 py-2 border rounded-lg text-sm"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Select multiple resumes to compare (PDF, DOCX, TXT)</p>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded text-sm mt-2">
            <p className="font-medium">Selected Files:</p>
            <p>Job Description: {jobDescription ? jobDescription.name : "None"}</p>
            <p>Resumes: {resumes.length > 0 ? `${resumes.length} file(s) selected` : "None"}</p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            {loading ? "Processing..." : "Find Top Matches"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecruiterUploadForm;


// import React, { useState } from "react";
// import ResumeTable from "./Applicants"; // Import the table component

// const UploadForm = () => {
//   const [jobDescription, setJobDescription] = useState(null);
//   const [resumes, setResumes] = useState([]);
//   const [tableData, setTableData] = useState(null);

//   const handleFileChange = (e, setter) => {
//     setter(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!jobDescription || resumes.length === 0) {
//       alert("Please upload both Job Description and Resumes!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("job_description", jobDescription[0]);
//     Array.from(resumes).forEach((file) => formData.append("resumes", file));

//     try {
//       const response = await fetch("http://localhost:5000/process", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       if (data.top_matches) {
//         setTableData(data.top_matches);
//       } else {
//         alert("Error: No matches found!");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while processing the files.");
//     }
//   };

//   if (tableData) {
//     return <ResumeTable resumes={tableData} />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//       <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold text-center mb-6">Upload Files</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-bold mb-2">Job Description</label>
//             <input
//               type="file"
//               accept=".pdf,.docx,.txt"
//               onChange={(e) => handleFileChange(e, setJobDescription)}
//               className="w-full px-4 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-bold mb-2">Resumes</label>
//             <input
//               type="file"
//               accept=".pdf,.docx,.txt"
//               multiple
//               onChange={(e) => handleFileChange(e, setResumes)}
//               className="w-full px-4 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//           >
//             Get Matched Resumes
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadForm;
