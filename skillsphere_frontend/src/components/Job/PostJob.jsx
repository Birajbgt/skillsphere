// import axios from "axios";
// import { useState } from "react";
// import toast from "react-hot-toast";

// const PostJob = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [type, setType] = useState("");
//   const [vacancy, setVacancy] = useState("");
//   const [requirement, setRequirement] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [salary, setSalary] = useState("");
//   const [experience, setExperience] = useState("");

//   const handleJobPost = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/v1/job/post",
//         {
//           title,
//           description,
//           type,
//           salary,
//           vacancy,
//           deadline,
//           requirement,
//           experience,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       toast.success(response.data.message);
//       setTitle("");
//       setDescription("");
//       setType("");
//       setVacancy("");
//       setRequirement("");
//       setDeadline("");
//       setSalary("");
//       setExperience("");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to post the job.");
//     }
//   };

//   return (
//     <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "40px 20px" }}>
//       <div
//         style={{
//           maxWidth: "800px",
//           margin: "0 auto",
//           backgroundColor: "#fff",
//           padding: "20px",
//           borderRadius: "8px",
//           boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Post a New Job</h2>
//         <form onSubmit={handleJobPost}>
//           <div style={{ marginBottom: "20px" }}>
//             <label htmlFor="title" style={{ display: "block", marginBottom: "8px" }}>Job Title</label>
//             <input
//               id="title"
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
//               required
//             />
//           </div>

//           <div style={{ marginBottom: "20px" }}>
//             <label htmlFor="type" style={{ display: "block", marginBottom: "8px" }}>Job Type</label>
//             <select
//               id="type"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
//               required
//             >
//               <option value="">Select Job Type</option>
//               <option value="Full Time">Full Time</option>
//               <option value="Part Time">Part Time</option>
//             </select>
//           </div>

//           <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
//             <div style={{ flex: 1 }}>
//               <label htmlFor="vacancy" style={{ display: "block", marginBottom: "8px" }}>Vacancy</label>
//               <input
//                 id="vacancy"
//                 type="number"
//                 value={vacancy}
//                 onChange={(e) => setVacancy(e.target.value)}
//                 style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
//                 required
//               />
//             </div>
//             <div style={{ flex: 1 }}>
//               <label htmlFor="salary" style={{ display: "block", marginBottom: "8px" }}>Salary</label>
//               <input
//                 id="salary"
//                 type="number"
//                 value={salary}
//                 onChange={(e) => setSalary(e.target.value)}
//                 style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
//                 required
//               />
//             </div>
//           </div>

//           <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
//             <div style={{ flex: 1 }}>
//               <label htmlFor="experience" style={{ display: "block", marginBottom: "8px" }}>Experience</label>
//               <select
//                 id="experience"
//                 value={experience}
//                 onChange={(e) => setExperience(e.target.value)}
//                 style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
//                 required
//               >
//                 <option value="">Select Experience Needed</option>
//                 <option value="Under 1 year">Under 1 year</option>
//                 <option value="1-2 years">1-2 years</option>
//                 <option value="2-6 years">2-6 years</option>
//                 <option value="Over 6 years">Over 6 years</option>
//               </select>
//             </div>
//             <div style={{ flex: 1 }}>
//               <label htmlFor="deadline" style={{ display: "block", marginBottom: "8px" }}>Job Deadline</label>
//               <input
//                 id="deadline"
//                 type="date"
//                 value={deadline}
//                 onChange={(e) => setDeadline(e.target.value)}
//                 style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
//                 required
//               />
//             </div>
//           </div>

//           <div style={{ marginBottom: "20px" }}>
//             <label htmlFor="requirement" style={{ display: "block", marginBottom: "8px" }}>Job Requirements</label>
//             <textarea
//               id="requirement"
//               rows="5"
//               value={requirement}
//               onChange={(e) => setRequirement(e.target.value)}
//               style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
//               required
//             />
//           </div>

//           <div style={{ marginBottom: "20px" }}>
//             <label htmlFor="description" style={{ display: "block", marginBottom: "8px" }}>Job Description</label>
//             <textarea
//               id="description"
//               rows="10"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             style={{
//               width: "100%",
//               padding: "10px",
//               backgroundColor: "#007BFF",
//               color: "#fff",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Post Job
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostJob;
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [requirement, setRequirement] = useState("");
  const [deadline, setDeadline] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState(null); // State for image

  const handleJobPost = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(); // Use FormData for file upload
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("salary", salary);
      formData.append("vacancy", vacancy);
      formData.append("deadline", deadline);
      formData.append("requirement", requirement);
      formData.append("experience", experience);
      if (image) formData.append("image", image); // Append image if selected

      const response = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
      setTitle("");
      setDescription("");
      setType("");
      setVacancy("");
      setRequirement("");
      setDeadline("");
      setSalary("");
      setExperience("");
      setImage(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post the job.");
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "40px 20px" }}>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Post a New Job</h2>
        <form onSubmit={handleJobPost} encType="multipart/form-data">
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="title" style={{ display: "block", marginBottom: "8px" }}>Job Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="type" style={{ display: "block", marginBottom: "8px" }}>Job Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
              required
            >
              <option value="">Select Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="vacancy" style={{ display: "block", marginBottom: "8px" }}>Vacancy</label>
              <input
                id="vacancy"
                type="number"
                value={vacancy}
                onChange={(e) => setVacancy(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="salary" style={{ display: "block", marginBottom: "8px" }}>Salary</label>
              <input
                id="salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                required
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="experience" style={{ display: "block", marginBottom: "8px" }}>Experience</label>
              <select
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                required
              >
                <option value="">Select Experience Needed</option>
                <option value="Under 1 year">Under 1 year</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2-6 years">2-6 years</option>
                <option value="Over 6 years">Over 6 years</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="deadline" style={{ display: "block", marginBottom: "8px" }}>Job Deadline</label>
              <input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="requirement" style={{ display: "block", marginBottom: "8px" }}>Job Requirements</label>
            <textarea
              id="requirement"
              rows="5"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="description" style={{ display: "block", marginBottom: "8px" }}>Job Description</label>
            <textarea
              id="description"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="image" style={{ display: "block", marginBottom: "8px" }}>Job Image</label>
            <input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#008000",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
