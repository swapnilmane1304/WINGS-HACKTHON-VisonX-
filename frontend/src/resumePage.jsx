// import { useState } from "react";
// import axios from "axios";

// export default function ResumeAnalyzer() {
//   const [resumeFile, setResumeFile] = useState(null);
//   const [jobDescription, setJobDescription] = useState("");
//   const [matchScore, setMatchScore] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setResumeFile(file);
//     }
//   };

// const analyzeResume = async (file, jobDescription) => {
//     const formData = new FormData();
//     formData.append("resume", file); // ✅ Match backend field name
//     formData.append("job_description", jobDescription);

//     try {
//         const response = await fetch("http://127.0.0.1:8000/analyze-resume/", {
//             method: "POST",
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Analysis Result:", data);
//         return data.analysis; // ✅ Return analysis for further use
//     } catch (error) {
//         console.error("Error analyzing resume:", error);
//         return null; // Handle error gracefully
//     }
// };



//   return (
//     <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">AI Resume Analyzer</h1>

//       {/* File Upload Input */}
//       <input
//         type="file"
//         accept=".pdf,.doc,.docx"
//         className="mb-4"
//         onChange={(e)=>handleFileChange(e)}
//       />

//       {/* Job Description Input */}
//       <textarea
//         className="w-96 h-40 p-2 border rounded mb-4"
//         placeholder="Paste Job Description Here"
//         value={jobDescription}
//         onChange={(e) => setJobDescription(e.target.value)}
//       ></textarea>

//       {/* Analyze Button */}
//       <button
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         onClick={()=>analyzeResume(resumeFile,jobDescription)}
//         disabled={loading}
//       >
//         {loading ? "Analyzing..." : "Analyze Resume"}
//       </button>

//       {/* Match Score Display */}
//       {matchScore !== null && (
//         <div className="mt-4 p-4 bg-green-200 rounded">
//           <p className="text-lg">Match Score: {matchScore}</p>
//         </div>
//       )}
//       {

//       }
//       {/* Error Message */}
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// }

import { useState } from "react";
import { marked } from "marked";



export default function ResumeAnalyzer() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [matchScore, setMatchScore] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null); // Store analysis details
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  // Analyze Resume Function
  const analyzeResume = async (file, jobDescription) => {
    if (!file || !jobDescription) {
      setError("Please upload a resume and enter a job description.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jobDescription);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze-resume/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data",data);
      setMatchScore(data.match_score);
      setAnalysisResult(data.analysis);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">AI Resume Analyzer</h1>

      {/* File Upload Input */}
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="mb-4 border p-2 rounded"
        onChange={handleFileChange}
      />

      {/* Job Description Input */}
      <textarea
        className="w-96 h-40 p-2 border rounded mb-4"
        placeholder="Paste Job Description Here"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      ></textarea>

      {/* Analyze Button */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => analyzeResume(resumeFile, jobDescription)}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {/* Match Score Display */}
      {matchScore !== null && (
        <div className="mt-4 p-4 bg-green-200 rounded">
          <p className="text-lg font-bold">Match Score: {analysisResult.match_score} / 10</p>
        </div>
      )}
      
      {analysisResult && (
   <div className="mt-6 p-4 bg-white shadow-md rounded w-full max-w-2xl">
     <h2 className="text-xl font-semibold mb-2">Analysis Summary</h2>
     <div dangerouslySetInnerHTML={{ __html: marked(analysisResult) }} />
   </div>
 )}  
      {analysisResult && analysisResult.strengths && (
  <div className="mt-6 p-4 bg-white shadow-md rounded w-full max-w-2xl">
    <h2 className="text-xl font-semibold mb-2">Analysis Summary</h2>

    {/* Strengths */}
    <div className="mb-3">
      <h3 className="font-semibold text-green-700">✅ Strengths:</h3>
      <ul className="list-disc list-inside">
        {analysisResult.strengths.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>

    {/* Weaknesses */}
    <div className="mb-3">
      <h3 className="font-semibold text-red-700">❌ Weaknesses:</h3>
      <ul className="list-disc list-inside">
        {analysisResult.weaknesses.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>

    {/* Recommendations */}
    <div>
      <h3 className="font-semibold text-blue-700">📌 Recommendations:</h3>
      <ul className="list-disc list-inside">
        {analysisResult.recommendations.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  </div>
)}


      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
