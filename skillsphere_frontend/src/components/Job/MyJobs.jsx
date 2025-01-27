// import axios from "axios";
// import { useEffect, useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
// import toast from "react-hot-toast";
// import { FaCheck, FaPen, FaTrashAlt } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";

// const MyJobs = () => {
//   const [myJobs, setMyJobs] = useState([]);
//   const [editingMode, setEditingMode] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const navigateTo = useNavigate();

//   const jobTypes = ["Full-Time", "Part-Time"];
//   const experienceLevels = ["Under 1 year", "1-2 years", "2-6 years", "Over 6 years"];

//   const formatDate = (date) => {
//     const d = new Date(date);
//     return d.toISOString().split("T")[0];
//   };

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/job/getmyjobs",
//           { withCredentials: true }
//         );
//         setMyJobs(data.myJobs);
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Failed to fetch jobs");
//         setMyJobs([]);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const userData = JSON.parse(localStorage.getItem("user"));
//   if (userData && userData.role !== "Employer") {
//     navigateTo("/");
//   }

//   const handleEnableEdit = (jobId) => {
//     setEditingMode(jobId);
//     const jobToEdit = myJobs.find((job) => job._id === jobId);
//     setSelectedDate(jobToEdit.deadline);
//   };

//   const handleDisableEdit = () => {
//     setEditingMode(null);
//     setSelectedDate(null);
//   };

//   const handleUpdateJob = async (jobId) => {
//     const updatedJob = myJobs.find((job) => job._id === jobId);
//     updatedJob.deadline = selectedDate;

//     try {
//       const { data } = await axios.put(
//         `http://localhost:4000/api/v1/job/update/${jobId}`,
//         updatedJob,
//         { withCredentials: true }
//       );
//       toast.success(data.message);
//       setEditingMode(null);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update job");
//     }
//   };

//   const handleDeleteJob = async (jobId) => {
//     try {
//       const { data } = await axios.delete(
//         `http://localhost:4000/api/v1/job/delete/${jobId}`,
//         { withCredentials: true }
//       );
//       toast.success(data.message);
//       setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to delete job");
//     }
//   };

//   const handleInputChange = (jobId, field, value) => {
//     setMyJobs((prevJobs) =>
//       prevJobs.map((job) =>
//         job._id === jobId ? { ...job, [field]: value } : job
//       )
//     );
//   };

//   return (
//     <div style={{ backgroundColor: "#C6D6C6", minHeight: "100vh", padding: "20px" }}>
//       <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Posted Jobs</h1>
//       {myJobs.length > 0 ? (
//         <div>
//           {myJobs.map((job) =>
//             editingMode === job._id ? (
//               <div
//                 key={job._id}
//                 style={{
//                   backgroundColor: "#fff",
//                   padding: "20px",
//                   borderRadius: "8px",
//                   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                   transition: "transform 0.3s",
//                 }}
//               >
//                 <div style={{ marginBottom: "15px" }}>
//                   <label>Title:</label>
//                   <input
//                     type="text"
//                     value={job.title}
//                     onChange={(e) => handleInputChange(job._id, "title", e.target.value)}
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       marginTop: "5px",
//                       borderRadius: "4px",
//                       border: "1px solid #ccc",
//                     }}
//                   />
//                 </div>
//                 <div style={{ marginBottom: "15px" }}>
//                   <label>Job Type:</label>
//                   <select
//                     value={job.type}
//                     onChange={(e) => handleInputChange(job._id, "type", e.target.value)}
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       marginTop: "5px",
//                       borderRadius: "4px",
//                       border: "1px solid #ccc",
//                     }}
//                   >
//                     {jobTypes.map((type, index) => (
//                       <option key={index} value={type}>
//                         {type}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div style={{ marginBottom: "15px" }}>
//                   <label>Experience:</label>
//                   <select
//                     value={job.experience}
//                     onChange={(e) =>
//                       handleInputChange(job._id, "experience", e.target.value)
//                     }
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       marginTop: "5px",
//                       borderRadius: "4px",
//                       border: "1px solid #ccc",
//                     }}
//                   >
//                     {experienceLevels.map((exp, index) => (
//                       <option key={index} value={exp}>
//                         {exp}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div style={{ marginBottom: "15px" }}>
//                   <label>Requirements:</label>
//                   <textarea
//                     value={job.requirement}
//                     onChange={(e) =>
//                       handleInputChange(job._id, "requirement", e.target.value)
//                     }
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       borderRadius: "4px",
//                       border: "1px solid #ccc",
//                       minHeight: "80px",
//                     }}
//                   />
//                 </div>
//                 <div style={{ marginBottom: "15px" }}>
//                   <label>Description:</label>
//                   <textarea
//                     value={job.description}
//                     onChange={(e) =>
//                       handleInputChange(job._id, "description", e.target.value)
//                     }
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       borderRadius: "4px",
//                       border: "1px solid #ccc",
//                       minHeight: "80px",
//                     }}
//                   />
//                 </div>
//                 <div style={{ marginBottom: "15px" }}>
//                   <label>Deadline:</label>
//                   <input
//                     type="date"
//                     value={selectedDate ? formatDate(selectedDate) : formatDate(job.deadline)}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       borderRadius: "4px",
//                       border: "1px solid #ccc",
//                     }}
//                   />
//                 </div>
//                 <div style={{ marginTop: "15px", textAlign: "center" }}>
//                   <button
//                     onClick={() => handleUpdateJob(job._id)}
//                     style={{
//                       backgroundColor: "#4CAF50",
//                       color: "white",
//                       border: "none",
//                       padding: "10px 20px",
//                       marginRight: "10px",
//                       borderRadius: "4px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <FaCheck /> Save
//                   </button>
//                   <button
//                     onClick={handleDisableEdit}
//                     style={{
//                       backgroundColor: "#f44336",
//                       color: "white",
//                       border: "none",
//                       padding: "10px 20px",
//                       borderRadius: "4px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <RxCross2 /> Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               editingMode === null && (
//                 <div
//                   key={job._id}
//                   style={{
//                     backgroundColor: "#fff",
//                     padding: "20px",
//                     borderRadius: "8px",
//                     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                     transition: "transform 0.3s",
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
//                   onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//                 >
//                   <h3>{job.title}</h3>
//                   <p>Type: {job.type}</p>
//                   <p>Experience: {job.experience}</p>
//                   <p>Vacancy: {job.vacancy}</p>
//                   <p>Salary: {job.salary}</p>
//                   <p>Deadline: {formatDate(job.deadline)}</p>
//                   <div style={{ textAlign: "center", marginTop: "10px" }}>
//                     <button
//                       onClick={() => handleEnableEdit(job._id)}
//                       style={{
//                         backgroundColor: "#2196F3",
//                         color: "white",
//                         border: "none",
//                         padding: "10px 20px",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       <FaPen /> Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteJob(job._id)}
//                       style={{
//                         backgroundColor: "#f44336",
//                         color: "white",
//                         border: "none",
//                         padding: "10px 20px",
//                         marginLeft: "10px",
//                         borderRadius: "4px",
//                         cursor: "pointer",
//                       }}
//                     >
//                       <FaTrashAlt /> Delete
//                     </button>
//                   </div>
//                 </div>
//               )
//             )
//           )}
//         </div>
//       ) : (
//         <p style={{ textAlign: "center", fontSize: "18px", marginTop: "50px" }}>
//           You`ve not posted any job or maybe you deleted all your jobs!
//         </p>
//       )}
//     </div>
//   );
// };

// export default MyJobs;

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaPen, FaTrashAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
    const jobToEdit = myJobs.find((job) => job._id === jobId);
    setSelectedDate(jobToEdit.deadline);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
    setSelectedDate(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    updatedJob.deadline = selectedDate;

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div style={{ backgroundColor: "#F8F9FA", minHeight: "100vh", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>My Posted Jobs</h2>
      {myJobs.length > 0 ? (
        myJobs.map((job) => (
          <div
            key={job._id}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: editingMode === job._id ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
              border: editingMode === job._id ? "2px solid #4CAF50" : "1px solid #ddd",
              marginBottom: "20px",
              transition: "all 0.3s",
              overflow: "hidden",
            }}
          >
            <div style={{ display: editingMode === job._id ? "block" : "none" }}>
              {/* Editable Mode */}
              <div style={{ marginBottom: "20px" }}>
                <label>Title:</label>
                <input
                  type="text"
                  value={job.title}
                  onChange={(e) => handleInputChange(job._id, "title", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label>Description:</label>
                <textarea
                  rows="4"
                  value={job.description}
                  onChange={(e) => handleInputChange(job._id, "description", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label>Requirements:</label>
                <textarea
                  rows="4"
                  value={job.requirement}
                  onChange={(e) => handleInputChange(job._id, "requirement", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleUpdateJob(job._id)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  <FaCheck /> Save
                </button>
                <button
                  onClick={handleDisableEdit}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  <RxCross2 /> Cancel
                </button>
              </div>
            </div>

            <div style={{ display: editingMode === job._id ? "none" : "block" }}>
              {/* Non-Editable Mode */}
              <h3 style={{ color: "#4CAF50" }}>{job.title}</h3>
              <p>{job.description}</p>
              <p>
                <strong>Type:</strong> {job.type}
              </p>
              <p>
                <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <button
                  onClick={() => handleEnableEdit(job._id)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#2196F3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  <FaPen /> Edit
                </button>
                <button
                  onClick={() => handleDeleteJob(job._id)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#666" }}>You have no posted jobs.</p>
      )}
    </div>
  );
};

export default MyJobs;
