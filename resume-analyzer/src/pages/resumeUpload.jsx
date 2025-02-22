// import React, { useState } from 'react';

// function ResumeUpload() {
//   const [resume, setResume] = useState(null);
//   const [jobTitle, setJobTitle] = useState('');
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setResume(e.target.files[0]);
//     console.log(e.target.files[0]);
//   };

//   const handleJobTitleChange = (e) => {
//     setJobTitle(e.target.value);
//   };
//   const cleanText = (data) => {
//     if (!data || !data.text) return "No text available.";

//     let cleanedText = data.text
//         .replace(/\*/g, "")  // Remove all asterisks
//         .trim(); // Remove leading and trailing spaces
//     console.log("clear",cleanText);
//     return cleanedText;
// };
//   const handleUpload = async () => {
//     if (!resume || !jobTitle) {
//       alert('Please upload a resume and enter a job title.');
//       return;
//     }
  

//     setLoading(true);

//     const formData = new FormData();
//     formData.append('pdfFile', resume);  // Match backend expected key
//     formData.append('Job_Name', jobTitle); // Match backend expected key
  
//     try {
//       const res = await fetch('http://localhost:8000/upload', {
//         method: 'POST',
//         body: formData,
//       });
  
//       const data = await res.json();
//       const clear=cleanText(data);
//       console.log('AI Response:', clear);
//       setResponse(clear);
//     } catch (error) {
//       console.error('Error uploading:', error);
//       alert('Failed to upload. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpload2 = async () => {
//     if (!resume || !jobTitle) {
//       alert('Please upload a resume and enter a job title.');
//       return;
//     }
  

//     setLoading(true);

//     const formData = new FormData();
//     formData.append('pdfFile', resume);  // Match backend expected key
//     formData.append('Job_Name', jobTitle); // Match backend expected key
  
//     try {
//       const res = await fetch('http://localhost:8000/atsGenerator', {
//         method: 'POST',
//         body: formData,
//       });
  
//       const data = await res.json();
//       const clear=cleanText(data);
//       console.log('AI Response:', clear);
//       setResponse(clear);
//     } catch (error) {
//       console.error('Error uploading:', error);
//       alert('Failed to upload. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <meta charSet="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>Vision X Resume Parser</title>
//       <link
//         href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css"
//         rel="stylesheet"
//       />
//       <nav className="bg-white border-gray-200 dark:bg-gray-900">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//           <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//             Vision X Resume Parser
//           </span>
//         </div>
//       </nav>

//       <section className="bg-gray-400 py-10 text-center">
//         <h1 className="text-4xl font-extrabold text-white">
//           Vision X Resume Parser
//         </h1>
//         <p className="text-lg text-gray-300">Generate Optimized Resume</p>

//         <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 mt-4">
//           {/* Resume Upload Input */}
//           <input
//             type="file"
//             id="resumeFile"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//           <label
//             htmlFor="resumeFile"
//             className="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white bg-green-700 border-2 border-green-700 rounded-lg hover:bg-transparent hover:border-gray-700"
//           >
//             Upload Resume
//           </label>

//           {/* Job Title Input */}
//           <input
//             type="text"
//             id="job"
//             placeholder="Enter Job Title"
//             className="px-4 py-2 border rounded-md"
//             value={jobTitle}
//             onChange={handleJobTitleChange}
//           />



//           <button
//             id="scanResume"
//             onClick={handleUpload}
//             disabled={!resume || !jobTitle || loading}
//             className={`inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg border ${
//               !resume || !jobTitle || loading
//                 ? 'bg-gray-500 cursor-not-allowed'
//                 : 'bg-blue-700 hover:bg-blue-800'
//             }`}
//           >
//             {loading ? 'Uploading...' : 'Generate ATS Score'}
//           </button>
//         </div>
//       </section>
    
//     </>
//   );
// }

// export default ResumeUpload;
import React, { useEffect, useState } from "react";

function ResumeUpload() {
  const [resume, setResume] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [score,setscore]=useState('');

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };
  const cleanText = (data) => {
    if (!data || !data.text) return "No text available.";

    let cleanedText = data.text
        .replace(/\*/g, "")  // Remove all asterisks
        .trim(); // Remove leading and trailing spaces
    console.log("clear",cleanText);
    return cleanedText;
};
  const handleUpload = async () => {
    if (!resume || !jobTitle) {
      alert('Please upload a resume and enter a job title.');
      return;
    }
    console.log(resume,jobTitle);

    setLoading(true);

    const formData = new FormData();
    formData.append('pdfFile', resume);  // Match backend expected key
    formData.append('Job_Name', jobTitle); // Match backend expected key
    console.log("formdata",formData);
    try {
      const res = await fetch('http://localhost:8000/atsScore', {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
      console.log("data",data);
      setscore(data.score);
     
      setResponse(clear);
    } catch (error) {
      console.error('Error uploading:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload2 = async () => {
    if (!resume || !jobTitle) {
      alert('Please upload a resume and enter a job title.');
      return;
    }
  

    setLoading(true);

    const formData = new FormData();
    formData.append('pdfFile', resume);  // Match backend expected key
    formData.append('Job_Name', jobTitle); // Match backend expected key
  
    try {
      const res = await fetch('http://localhost:8000/atsGenerator', {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
      const clear=cleanText(data);
      console.log('AI Response:', clear);
      setResponse(clear);
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Failed to upload. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vision X Resume Parser</title>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css"
        rel="stylesheet"
      />

      {/* Navbar */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <span className="text-2xl font-semibold dark:text-white">
            Vision X Resume Parser
          </span>
        </div>
      </nav>

      {/* Main Section */}
      <section className="flex flex-grow items-center justify-center bg-gray-400 py-10 text-center">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
          <h1 className="text-4xl font-extrabold text-gray-900">Vision X Resume Parser</h1>
          <p className="text-lg text-gray-600 mt-2">Generate Optimized Resume</p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 mt-6">
            {/* Resume Upload Input */}
            <input type="file" id="resumeFile" className="hidden" onChange={handleFileChange} />
            <label
              htmlFor="resumeFile"
              className="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white bg-green-700 border-2 border-green-700 rounded-lg hover:bg-transparent hover:border-gray-700"
            >
              Upload Resume
            </label>

            {/* Job Title Input */}
            <input
              type="text"
              id="job"
              placeholder="Enter Job Title"
              className="px-4 py-2 border rounded-md w-full sm:w-60"
              value={jobTitle}
              onChange={(e)=>handleJobTitleChange(e)}
            />

            {/* Submit Button */}
            <button
              id="scanResume"
              onClick={handleUpload}
              disabled={!resume || !jobTitle || loading}
              className={`inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg border ${
                !resume || !jobTitle || loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {loading ? "Uploading..." : "Generate ATS Score"}
            </button>
          </div>
          <h1>{}</h1>
        </div>
      </section>
    </div>
  );
}

export default ResumeUpload;
