// import axios from "axios";
// import { useContext, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import { Context } from "../../main";

// const Application = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     skills: "",
//   });
//   const [resume, setResume] = useState(null);
//   const [coverLetter, setCoverLetter] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { isAuthorized, user } = useContext(Context);
//   const navigateTo = useNavigate();
//   const { id } = useParams();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (event, setFile) => {
//     const file = event.target.files[0];
//     setFile(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!resume || !coverLetter) {
//       toast.error("Both Resume and Cover Letter are required.");
//       return;
//     }

//     setLoading(true);

//     const form = new FormData();
//     for (let key in formData) {
//       form.append(key, formData[key]);
//     }
//     form.append("resume", resume);
//     form.append("coverLetter", coverLetter);
//     form.append("jobId", id);

//     try {
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/application/post",
//         form,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );
//       toast.success(data.message);
//       navigateTo("/job/getall");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Submission failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isAuthorized || (user && user.role === "Employer")) {
//     navigateTo("/");
//   }

//   return (
//     <div style={{ backgroundColor: "#C6D6C6", minHeight: "100vh" }}>
//       {loading && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1000,
//           }}
//         >
//           <div
//             style={{
//               width: "50px",
//               height: "50px",
//               border: "6px solid #f3f3f3",
//               borderTop: "6px solid #4CAF50",
//               borderRadius: "50%",
//               animation: "spin 1s linear infinite",
//             }}
//           ></div>
//         </div>
//       )}
//       <section
//         style={{
//           margin: "0 auto",
//           padding: "30px",
//           maxWidth: "900px",
//           backgroundColor: "#fff",
//           borderRadius: "8px",
//           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <h1 style={{ fontSize: "28px", textAlign: "center", marginBottom: "20px" }}>
//           Application Form
//         </h1>
//         <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//           <div style={{ display: "flex", gap: "15px" }}>
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//               style={{
//                 flex: 1,
//                 padding: "12px",
//                 borderRadius: "4px",
//                 border: "1px solid #ccc",
//               }}
//             />
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//               style={{
//                 flex: 1,
//                 padding: "12px",
//                 borderRadius: "4px",
//                 border: "1px solid #ccc",
//               }}
//             />
//           </div>
//           <div style={{ display: "flex", gap: "15px" }}>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               style={{
//                 flex: 1,
//                 padding: "12px",
//                 borderRadius: "4px",
//                 border: "1px solid #ccc",
//               }}
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//               style={{
//                 flex: 1,
//                 padding: "12px",
//                 borderRadius: "4px",
//                 border: "1px solid #ccc",
//               }}
//             />
//           </div>
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//             style={{
//               padding: "12px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//             }}
//           />
//           <input
//             type="text"
//             name="skills"
//             placeholder="Skills"
//             value={formData.skills}
//             onChange={handleChange}
//             required
//             style={{
//               padding: "12px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//             }}
//           />
//           <div>
//             <label>Upload Cover Letter:</label>
//             <input
//               type="file"
//               onChange={(e) => handleFileChange(e, setCoverLetter)}
//               required
//             />
//           </div>
//           <div>
//             <label>Upload Resume:</label>
//             <input
//               type="file"
//               onChange={(e) => handleFileChange(e, setResume)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             style={{
//               backgroundColor: "#4CAF50",
//               color: "white",
//               padding: "12px 20px",
//               fontSize: "16px",
//               borderRadius: "4px",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             Submit Application
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default Application;
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    skills: "",
  });

  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/user/getuser", {
        withCredentials: true,
      });
      console.log(data);
      // Populate form data with fetched user details
      setFormData({
        firstName: data.user.firstName || "",
        lastName: data.user.lastName || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        address: data.user.address || "",
        skills: data.user.skills || "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user details");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !coverLetter) {
      toast.error("Both Resume and Cover Letter are required.");
      return;
    }

    setLoading(true);

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    form.append("resume", resume);
    form.append("coverLetter", coverLetter);
    form.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthorized || (user && user.role === "Employer")) {
      navigateTo("/");
    } else {
      fetchUserDetails(); // Fetch user details on component mount
    }
  }, [isAuthorized, user, navigateTo]);

  return (
    <div style={{ backgroundColor: "#C6D6C6", minHeight: "100vh" }}>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "6px solid #f3f3f3",
              borderTop: "6px solid #4CAF50",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>
      )}
      <section
        style={{
          margin: "0 auto",
          padding: "30px",
          maxWidth: "900px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "28px", textAlign: "center", marginBottom: "20px" }}>
          Application Form
        </h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", gap: "15px" }}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <div>
            <label>Upload Cover Letter:</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setCoverLetter)}
              required
            />
          </div>
          <div>
            <label>Upload Resume:</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setResume)}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "12px 20px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit Application
          </button>
        </form>
      </section>
    </div>
  );
};

export default Application;
