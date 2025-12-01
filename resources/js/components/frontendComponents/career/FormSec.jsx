import React, { useState, useEffect,useRef } from "react";
import { RiAttachment2 } from "react-icons/ri";
import hire_img from "../../assets/career/hire.svg";
import Button from "../Button";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";
import './careerFrom.css';

const jobOptions = [
  // "Graphic Designer",
  // "Web Development",
  // "SEO",
  // "Broker",
  "Content Writer",
  "Motion Graphics Artist",
];

const CareerFormSec = ({ selectedJob }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: '' });
  const [formErrors, setFormErrors] = useState({});
  const form = useRef();
  const fileInput = useRef();
  const navigate = useNavigate()


  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_APPLY_JOB_TEMPLATE_ID;

  // Set job role from prop when available
  useEffect(() => {
    if (selectedJob) {
      const matchedJob = jobOptions.find(
        (job) => job.toLowerCase() === selectedJob.toLowerCase()
      );
      setJobRole(matchedJob || "");
    }
  }, [selectedJob]);
  
  const validateForm = () => {
    const errors = {};
    const name = form.current.name.value.trim();
    const email = form.current.email.value.trim();
    const phone = form.current.phone.value.trim();
    const message = form.current.message.value.trim();
    
    if (!jobRole) errors.job_role = "Please select a job role";
    if (!name) errors.name = "Name is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }
    if (!phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (!message) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

 const sendEmail = async (e) => {
  e.preventDefault();
  setFormStatus({ loading: true, success: false, error: '' });


  if (!validateForm()) {
    setFormStatus({ loading: false, success: false, error: 'Please fix the form errors.' });
    return;
  }

  if (!jobRole) {
    setFormStatus({ loading: false, success: false, error: 'Please select a job role' });
    return;
  }



  try {
    // Prepare template parameters
    const templateParams = {
      job_role: jobRole,
      name: form.current.name.value,
      email: form.current.email.value,
      phone: form.current.phone.value,
      message: form.current.message.value,
      // has_cv: selectedFile ? 'Yes (see instructions below)' : 'No CV attached',
      cv: selectedFile 
        ? `Applicant has uploaded a CV : ${selectedFile.name}`
        : 'No CV was submitted with this application'
    };

    // Send the email without the file
    const emailResponse = await emailjs.send(
      SERVICE_ID, 
      TEMPLATE_ID, 
      templateParams,
      { publicKey: PUBLIC_KEY }
    );

    // console.log('Email sent successfully:', emailResponse);
    
    // If file was attached, show special instructions
    let successMessage = 'Application submitted successfully!';
    if (selectedFile) {
      successMessage += ' Please check your email for CV submission instructions.';
    }

    setFormStatus({ 
      loading: false, 
      success: successMessage, 
      error: '' 
    });
    
    // Reset form
    form.current.reset();
    setSelectedFile(null);
    setJobRole('');
    if (fileInput.current) fileInput.current.value = '';
    navigate("/thankyou")

  } catch (err) {
    console.error('Failed to send application:', err);
    setFormStatus({ 
      loading: false, 
      success: false, 
      error: 'Failed to send application. Please try again.' 
    });
  }
};

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        setSelectedFile(null);
      } else if (file.size > 10 * 1024 * 1024) {
        setError("File size must not exceed 10MB.");
        setSelectedFile(null);
      } else {
        setError("");
        setSelectedFile(file);
      }
    }
  };

  return (
    <div  className="pt-25 pb-20">
      <div className="container mx-auto">
        <div className="mb-12">
          {/* <p className="max-w-[800px] mx-auto text-center text-3xl">
            We truly value work-life balance. We work hard and deliver, but at
            the end of the day you can switch off.
          </p> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Image Section */}
          <div className="flex items-center justify-center">
            <div className="contact-heading md:pr-40 pt-8 w-[70%] h-auto">
              <img src={hire_img} alt="Hire illustration" className="w-full h-full" />
            </div>
          </div>

          {/* Form Section */}
          <div>
            <form className="role-form bg-(--black) rounded-3xl p-12 shadow-lg" ref={form} onSubmit={sendEmail}>
              <h3 className="text-4xl font-semibold mb-10">Apply For the Role</h3>

              {/* Job Role Dropdown */}
              <div className="mb-10">
              <select
                name="job_role"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none career-select "
              >
                <option value="">Select Job Role*</option>
                {jobOptions.map((job, idx) => (
                  <option key={idx} value={job}>
                    {job}
                  </option>
                ))}
              </select>
              {formErrors.job_role && <p className="text-red-500 mb-3">{formErrors.job_role}</p>}
              </div>
              <div className="mb-10">
              <input
                name='name'
                type="text"
                placeholder="Full Name*"
                className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none "
              />
              {formErrors.name && <p className="text-red-500 mt-1">{formErrors.name}</p>}
              </div>
              <div className="mb-10">   
              <input
                type="email"
                name="email"
                placeholder="Email ID*"
                className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none "
              />
              {formErrors.email && <p className="text-red-500 mt-1">{formErrors.email}</p>}
              </div>
              <div className="mb-10">
              <input
                type="tel"
                name="phone"
                placeholder="Phone No.*"
                className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none "
              />
              {formErrors.phone && <p className="text-red-500 mt-1">{formErrors.phone}</p>}
              </div>
              <div className="mb-6">
              <textarea
               name="message"
                placeholder="Links to your work or something about yourself.*"
                rows="1"
                className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none "
              ></textarea>
              {formErrors.message && <p className="text-red-500 mt-1">{formErrors.message}</p>}
              </div>

              <div className="flex gap-3.5 items-center">
                <label className="bg-[var(--blue)] text-white py-1 px-6 rounded-full text-lg cursor-pointer flex justify-center items-center gap-1">
                  <RiAttachment2 /> Upload
                  <input
                    name="cv"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInput}
                  />
                </label>
                <span>Attach Your CV</span>
              </div>

              {selectedFile && (
                <p className="text-white mt-2">Selected File: {selectedFile.name}</p>
              )}
              {error && <p className="text-red-500 mt-2">{error}</p>}

              <p className="mt-3 text-gray-300 text-sm italic">
                (Upload file in PDF format, max size: 10MB)
              </p>

              <div className="mybtn mt-10">
                 <Button 
                  type="submit" 
                  mybtn={formStatus.loading ? "Submitting..." : "Submit"} 
                  disabled={formStatus.loading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerFormSec;



// import React, { useState, useEffect, useRef } from "react";
// import { RiAttachment2 } from "react-icons/ri";
// import axios from "axios";
// import hire_img from "../../assets/career/hire.svg";
// import Button from "../Button";
// import './careerFrom.css';
// import { useJobvacancies } from "../../GetContextApi/JobVacanciesGetContext";

// const CareerFormSec = ({ selectedJob }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [formStatus, setFormStatus] = useState({ 
//     loading: false, 
//     success: false, 
//     error: '' 
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const form = useRef();
//   const fileInput = useRef();
//   const { jobvacanciesData } = useJobvacancies();
//   const [jobId, setJobId] = useState("");
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


//   // Set job role from prop when available
//   useEffect(() => {
//     if (selectedJob && jobvacanciesData.length > 0) {
//       const matchedJob = jobvacanciesData.find(
//         job => job.name.toLowerCase() === selectedJob.toLowerCase()
//       );
//       if (matchedJob) {
//         setJobId(matchedJob.id);
//       }
//     }
//   }, [selectedJob, jobvacanciesData]);

//   const validateForm = () => {
//     const errors = {};
//     const formData = new FormData(form.current);
    
//     if (!jobId) errors.job_role = "Please select a job role";
//     if (!formData.get('name')) errors.name = "Name is required";
    
//     const email = formData.get('email');
//     if (!email) {
//       errors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       errors.email = "Invalid email format";
//     }
    
//     const phone = formData.get('phone');
//     if (!phone) {
//       errors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(phone)) {
//       errors.phone = "Phone number must be 10 digits";
//     }
    
//     if (!formData.get('message')) errors.message = "Message is required";
//     if (!selectedFile) errors.file = "Please upload your CV";

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     try {
//       setFormStatus({ loading: true, success: false, error: '' });
      
//       const formData = new FormData();
//       formData.append('jobId', jobId);
//       formData.append('fullName', form.current.name.value);
//       formData.append('email', form.current.email.value);
//       formData.append('phone', form.current.phone.value);
//       formData.append('about', form.current.message.value);
//       formData.append('cv', selectedFile);
      
//       const response = await axios.post(`${BACKEND_URL}api/jobApplications/apply`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       setFormStatus({ loading: false, success: true, error: '' });
//       form.current.reset();
//       setSelectedFile(null);
//       setJobId("");
      
//     } catch (error) {
//       console.error("Submission error:", error);
//       setFormStatus({
//         loading: false,
//         success: false,
//         error: error.response?.data?.message || "Failed to submit application"
//       });
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Check file type and size
//       const validTypes = [
//         'application/pdf', 
//         'application/msword',
//         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//       ];
      
//       if (!validTypes.includes(file.type)) {
//         setFormErrors({
//           ...formErrors,
//           file: "Only PDF, DOC, and DOCX files are allowed"
//         });
//         return;
//       }
      
//       if (file.size > 10 * 1024 * 1024) { // 10MB
//         setFormErrors({
//           ...formErrors,
//           file: "File size exceeds 10MB limit"
//         });
//         return;
//       }
      
//       setSelectedFile(file);
//       setFormErrors({ ...formErrors, file: "" });
//     }
//   };

//   return (
//     <div className="pt-40 pb-20">
//       <div className="container mx-auto">
//         <div className="mb-12">
//           <p className="max-w-[800px] mx-auto text-center text-3xl">
//             We truly value work-life balance. We work hard and deliver, but at
//             the end of the day you can switch off.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left Image Section */}
//           <div className="flex items-center justify-center">
//             <div className="contact-heading md:pr-40 pt-8 w-[70%] h-auto">
//               <img src={hire_img} alt="Hire illustration" className="w-full h-full" />
//             </div>
//           </div>

//           {/* Form Section */}
//           <div>
//             <form 
//               className="role-form bg-(--black) rounded-3xl p-12 shadow-lg" 
//               ref={form}
//               onSubmit={handleSubmit}
//             >
//               <h3 className="text-4xl font-semibold mb-10">Apply For the Role</h3>
              
             

//               {/* Job Role Dropdown */}
//               <div className="mb-10">
//                 <select
//                   value={jobId}
//                   onChange={(e) => setJobId(e.target.value)}
//                   className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none career-select"
//                 >
//                   <option value="">Select Job Role*</option>
//                   {jobvacanciesData.map((job) => (
//                     <option key={job.id} value={job.id}>
//                       {job.name}
//                     </option>
//                   ))}
//                 </select>
//                 {formErrors.job_role && (
//                   <p className="text-red-500 mt-1">{formErrors.job_role}</p>
//                 )}
//               </div>
              
//               <div className="mb-10">
//                 <input
//                   name='name'
//                   type="text"
//                   placeholder="Full Name*"
//                   className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none"
//                 />
//                 {formErrors.name && (
//                   <p className="text-red-500 mt-1">{formErrors.name}</p>
//                 )}
//               </div>
              
//               <div className="mb-10">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email ID*"
//                   className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none"
//                 />
//                 {formErrors.email && (
//                   <p className="text-red-500 mt-1">{formErrors.email}</p>
//                 )}
//               </div>
              
//               <div className="mb-10">
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone No.*"
//                   className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none"
//                 />
//                 {formErrors.phone && (
//                   <p className="text-red-500 mt-1">{formErrors.phone}</p>
//                 )}
//               </div>
              
//               <div className="mb-6">
//                 <textarea
//                   name="message"
//                   placeholder="Links to your work or something about yourself.*"
//                   rows="1"
//                   className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none"
//                 ></textarea>
//                 {formErrors.message && (
//                   <p className="text-red-500 mt-1">{formErrors.message}</p>
//                 )}
//               </div>

//               <div className="flex gap-3.5 items-center mb-2">
//                 <label className="bg-[var(--blue)] text-white py-1 px-6 rounded-full text-lg cursor-pointer flex justify-center items-center gap-1">
//                   <RiAttachment2 /> Upload
//                   <input
//                     type="file"
//                     accept=".pdf,.doc,.docx"
//                     className="hidden"
//                     ref={fileInput}
//                     onChange={handleFileChange}
//                   />
//                 </label>
//                 <span>Attach Your CV</span>
//               </div>
              
//               {selectedFile && (
//                 <p className="text-white mt-2">Selected File: {selectedFile.name}</p>
//               )}
              
//               {formErrors.file && (
//                 <p className="text-red-500 mt-1">{formErrors.file}</p>
//               )}
              
//               <p className="mt-1 text-gray-300 text-sm italic">
//                 (Upload file in PDF, DOC, or DOCX format, max size: 10MB)
//               </p>

//               <div className="mybtn mt-10">
//                 <Button 
//                   type="submit" 
//                   mybtn={formStatus.loading ? "Submitting..." : "Submit"} 
//                   disabled={formStatus.loading}
//                 />
//               </div>

//                {formStatus.success && (
//                 <div className=" mt-10 p-4 bg-green-100 text-green-700 rounded">
//                   Application submitted successfully!
//                 </div>
//               )}
              
//               {formStatus.error && (
//                 <div className="mt-10 p-4 bg-red-100 text-red-700 rounded">
//                   {formStatus.error}
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CareerFormSec;