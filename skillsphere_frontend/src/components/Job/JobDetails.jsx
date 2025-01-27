// // import axios from "axios";
// // import { useContext, useEffect, useState } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import { Context } from "../../main";

// // const JobDetails = () => {
// //   const { id } = useParams();
// //   const [job, setJob] = useState(null);
// //   const navigateTo = useNavigate();
// //   const { isAuthorized, user } = useContext(Context);

// //   useEffect(() => {
// //     if (!isAuthorized) {
// //       navigateTo("/login");
// //       return;
// //     }

// //     // Fetch job details with populated user data
// //     axios
// //       .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
// //       .then((res) => {
// //         setJob(res.data.job);
// //       })
// //       .catch(() => navigateTo("/notfound"));
// //   }, [id, navigateTo, isAuthorized]);

// //   if (!job) return null;

// //   // Get the employer details from the populated data
// //   const employer = job.postedBy || {};
// //   const employerPhotoUrl = employer.photo ? `http://localhost:4000/uploads/${employer.photo}` : "https://via.placeholder.com/100";
// //   const companyDescription = employer.companyDescription || "No company description available.";

// //   return (
// //     <div style={{ backgroundColor: "#C6D6C6", minHeight: "100vh" }}>
// //       <div
// //         style={{
// //           marginLeft: "250px",
// //           padding: "20px",
// //           boxSizing: "border-box",
// //           minHeight: "100vh",
// //           minWidth: "1000px",
// //           borderRadius: "50px 0 0 50px",
// //           backgroundColor: "#fff",
// //           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",

// //         }}
// //       >
// //         {/* Job Header */}
// //         <div style={{ display: "flex", gap: "0px", marginBottom: "10px", height: "300px", marginLeft: "50px" }}>
// //           {/* Job Details Box */}
// //           <div
// //             style={{
// //               flex: 3.5, // Increased flex value to take more space
// //               // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.48)", // This applies the shadow to all sides
// //               padding: "20px",
// //               borderRadius: "8px",
// //               position: "relative",
// //               marginLeft: "0px", // Removed marginLeft to close the gap
// //               marginTop: "0px", // Removed marginTop to align heights
// //               background: "#F7F7F5",
// //               border: "2px solid #D9D9D9",
// //               height: "100%", // Set the height to 100% of the parent container
// //             }}
// //           >
// //             <button
// //               onClick={() => navigateTo(-1)}
// //               style={{
// //                 position: "absolute",
// //                 top: "10px",
// //                 left: "10px",
// //                 border: "none",
// //                 background: "none",
// //                 fontSize: "1.5rem",
// //                 cursor: "pointer",
// //                 marginBottom: "50px",
// //                 marginLeft: "30px",
// //               }}
// //             >
// //               ←
// //             </button>
// //             <div style={{ display: "flex", marginTop: "60px", marginLeft: "80px" }}>
// //               <img
// //                 src={employerPhotoUrl}
// //                 alt={employer.name}
// //                 style={{
// //                   width: "150px",  // Set width to 150px
// //                   height: "150px",  // Set height to 150px
// //                   borderRadius: "5%",  // Make it a square with rounded corners (optional)
// //                   objectFit: "cover",
// //                   paddingLeft: "50px"
// //                 }}
// //               />
// //               <div style={{ marginLeft: "50px" }}>
// //                 <h4 style={{ margin: "0 0 5px", fontSize: "1.2rem", fontWeight: "bold", paddingBottom: "10px" }}>{job.title}</h4>
// //                 <p style={{ margin: 0, fontSize: "1rem", color: "#6B961F", fontWeight: "bold", paddingBottom: "10px" }}>{employer.name}</p>
// //                 <p style={{ margin: 0, fontSize: "0.8rem", color: "#777", paddingBottom: "10px" }}>Location: {employer.address}</p>
// //                 <p style={{ margin: "5px 0", fontSize: "0.8rem", paddingBottom: "10px" }}>
// //                   Posted On: {new Date(job.createdAt).toLocaleDateString()}
// //                 </p>
// //                 <p style={{ margin: "5px 0", fontSize: "0.8rem" }}>
// //                   Apply Before: <span style={{ color: "red" }}>{new Date(job.deadline).toLocaleDateString()}</span>
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* About Company Box */}
// //           <div
// //             style={{
// //               flex: 1.5, // Decreased flex value to take up less space
// //               padding: "20px", // Added padding for spacing inside the box
// //               borderRadius: "5px", // Rounded corners for the box
// //               background: "#F7F7F5",
// //               border: "2px solid #D9D9D9",
// //               height: "100%", // Set the height to 100% of the parent container
// //               position: "relative", // To allow the label to stick to the top
// //             }}
// //           >
// //             <h7
// //               style={{
// //                 backgroundColor: "#6B961F",
// //                 color: "white",
// //                 padding: "10px",
// //                 display: "block", // Ensures the label spans the full width of the box
// //                 borderRadius: "5px 5px 0 0", // Match the box's top corners
// //                 textAlign: "center",
// //                 fontSize: "1rem",
// //                 margin: 0, // Remove margin to keep it at the top
// //                 width: "100%", // Ensures the label is as wide as the box
// //               }}
// //             >
// //               About Company
// //             </h7>
// //             <p style={{ marginTop: "10px", fontSize: "1rem", color: "gray" }}>{companyDescription}</p>
// //           </div>

// //         </div>

// //         {/* Main Content */}
// //         <div
// //           style={{
// //             display: "flex",
// //             // gap: "20px",
// //             // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.48)",
// //             padding: "20px",
// //             marginLeft: "30px",
// //             marginTop: "10px", // Adjusted margin for proper spacing
// //             // borderRadius: "8px", // Border radius for the container
// //             height: "500px"
// //           }}
// //         >
// //           {/* Left Column - Job Description and Requirements */}
// //           <div
// //             style={{
// //               flex: 3.8,
// //               paddingRight: "20px",
// //               paddingLeft: "50px",
// //               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
// //               borderRadius: "8px",
// //               padding: "20px",
// //               border: "2px solid #D9D9D9",
// //               height: "fit-content",
// //               background: "#F7F7F5",
// //             }}
// //           >
// //             <div style={{ marginBottom: "20px" }}>
// //               <h6 style={{ marginBottom: "30px", fontSize: "1.2 rem" }}>Job Description</h6>
// //               <p style={{ marginLeft: "20px", fontSize: "1rem", color: "gray" }}>{job.description || "No description available."}</p>
// //             </div>
// //             <div>
// //               <h6 style={{ marginBottom: "30px", fontSize: "1.2 rem" }}>Requirements</h6>
// //               <p style={{ marginLeft: "20px", fontSize: "1rem", color: "gray" }}>{job.requirement || "No requirements listed."}</p>
// //             </div>
// //             {/* Apply Now Button */}
// //             {user && user.role !== "Employer" && (
// //               <div style={{ textAlign: "center", marginTop: "150px" }}>
// //                 <Link
// //                   to={`/application/${job._id}`}
// //                   style={{
// //                     backgroundColor: "#6B961F",
// //                     width: "300px",
// //                     borderRadius: "5px",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     textAlign: "center",
// //                     display: "inline-block",
// //                     textDecoration: "none",
// //                     transition: "all 0.3s", // Smooth transition for background color and text color change
// //                   }}
// //                   onMouseEnter={(e) => {
// //                     e.currentTarget.style.backgroundColor = "#F4BA1A"; // Change background color on hover
// //                     e.currentTarget.style.color = "black"; // Change text color to black on hover
// //                   }}
// //                   onMouseLeave={(e) => {
// //                     e.currentTarget.style.backgroundColor = "#6B961F"; // Revert background color when mouse leaves
// //                     e.currentTarget.style.color = "white"; // Revert text color to white when mouse leaves
// //                   }}
// //                 >
// //                   Apply Now
// //                 </Link>
// //               </div>
// //             )}
// //           </div>

// //           {/* Right Column - Job Info */}
// //           <div
// //             style={{
// //               display: "flex",           // Enable flexbox for centering the items
// //               flexDirection: "column",   // Stack the child elements vertically
// //               alignItems: "center",
// //               width: "500px", // Horizontally center the child elements
// //               gap: "15px",               // Increase the space between the boxes
// //               flex: 1.5,
// //               border: "2px solid #D9D9D9",
// //               background: "#F7F7F5",
// //               padding: "15px",
// //               borderRadius: "8px",
// //               height: "fit-content",
// //               marginLeft: "20px",
// //               justifyContent: "center", // Centering the boxes horizontally
// //               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Added box shadow for the right column
// //             }}
// //           >
// //             <p
// //               style={{
// //                 margin: "5px 0",
// //                 backgroundColor: "#BBD897",
// //                 padding: "10px",
// //                 borderRadius: "15px",
// //                 width: "200px",
// //                 color: "gray",
// //                 fontSize: "15px",
// //                 textAlign: "center",
// //                 // Center text inside the box
// //               }}
// //             >
// //               <strong style={{ color: "gray" }}>Salary:</strong>
// //               <br /> {job.salary || "Not specified"}
// //             </p>
// //             <p
// //               style={{
// //                 margin: "5px 0",
// //                 backgroundColor: "#97C2D8",
// //                 padding: "10px",
// //                 borderRadius: "15px",
// //                 width: "200px",
// //                 color: "gray",
// //                 fontSize: "15px",
// //                 textAlign: "center",  // Center text inside the box
// //               }}
// //             >
// //               <strong style={{ color: "gray" }}>Job Type:</strong>
// //               <br /> {job.type || "Not specified"}
// //             </p>
// //             <p
// //               style={{
// //                 margin: "5px 0",
// //                 backgroundColor: "#E1D78A",
// //                 padding: "10px",
// //                 borderRadius: "15px",
// //                 width: "200px",
// //                 color: "gray",
// //                 fontSize: "15px",
// //                 textAlign: "center",  // Center text inside the box
// //               }}
// //             >
// //               <strong style={{ color: "gray" }}>Vacancy</strong>
// //               <br /> {job.vacancy || "Not specified"}
// //             </p>
// //             <p
// //               style={{
// //                 margin: "5px 0",
// //                 backgroundColor: "#E1AB8A",
// //                 padding: "10px",
// //                 borderRadius: "15px",
// //                 color: "gray",
// //                 fontSize: "15px",
// //                 width: "200px",
// //                 textAlign: "center",  // Center text inside the box
// //               }}
// //             >
// //               <strong style={{ color: "gray" }}>Experience</strong>
// //               <br /> {job.experience || "Not specified"}
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default JobDetails;

// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Context } from "../../main";

// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const navigateTo = useNavigate();
//   const { isAuthorized, user } = useContext(Context);

//   useEffect(() => {
//     if (!isAuthorized) {
//       navigateTo("/login");
//       return;
//     }

//     axios
//       .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
//       .then((res) => {
//         setJob(res.data.job);
//       })
//       .catch(() => navigateTo("/notfound"));
//   }, [id, navigateTo, isAuthorized]);

//   if (!job) return null;

//   return (
//     <div style={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
//       <header
//         style={{
//           backgroundColor: "#cce7d0",
//           padding: "20px",
//           textAlign: "center",
//           color: "#333",
//         }}
//       >
//         <h1>{job.title}</h1>
//         <p>{job.type} | {job.vacancy} Vacancy</p>
//         <p>{job.location || "Location not specified"}</p>
//       </header>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "2fr 1fr",
//           gap: "20px",
//           padding: "40px",
//         }}
//       >
//         {/* Main Content */}
//         <main
//           style={{
//             backgroundColor: "#fff",
//             padding: "20px",
//             borderRadius: "8px",
//             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <section>
//             <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>Who we are</h2>
//             <p style={{ color: "#555" }}>{job.description || "No description available."}</p>
//           </section>

//           <section style={{ marginTop: "20px" }}>
//             <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>Requirements</h2>
//             <p style={{ color: "#555" }}>{job.requirement || "No requirements specified."}</p>
//           </section>

//           <section style={{ marginTop: "20px" }}>
//             <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>Benefits</h2>
//             <ul>
//               <li>Flexible working hours</li>
//               <li>Health and wellness programs</li>
//               <li>Remote work options</li>
//             </ul>
//           </section>

//           <section style={{ marginTop: "20px" }}>
//             <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>Salary</h2>
//             <p style={{ color: "#555" }}>{job.salary || "Not specified"}</p>
//           </section>

//           <section style={{ marginTop: "20px" }}>
//             <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>Job Nature</h2>
//             <p>{job.type}</p>
//             <p>Apply Before: {new Date(job.deadline).toLocaleDateString()}</p>
//           </section>

//           {user && user.role !== "Employer" && (
//             <div style={{ textAlign: "center", marginTop: "30px" }}>
//               <Link
//                 to={`/application/${job._id}`}
//                 style={{
//                   display: "inline-block",
//                   padding: "10px 20px",
//                   backgroundColor: "#6B961F",
//                   color: "#fff",
//                   borderRadius: "5px",
//                   textDecoration: "none",
//                   fontSize: "16px",
//                 }}
//               >
//                 Apply Now
//               </Link>
//             </div>
//           )}
//         </main>

//         {/* Sidebar */}
//         <aside
//           style={{
//             backgroundColor: "#fff",
//             padding: "20px",
//             borderRadius: "8px",
//             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <h3>Contact Information</h3>
//           <p><strong>Email:</strong> {job.contactEmail || "Not provided"}</p>
//           <p><strong>Phone:</strong> {job.contactPhone || "Not provided"}</p>

//           <h3 style={{ marginTop: "20px" }}>Location</h3>
//           <p>{job.location || "Not specified"}</p>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default JobDetails;
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
      return;
    }

    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch(() => navigateTo("/notfound"));
  }, [id, navigateTo, isAuthorized]);

  if (!job) return null;

  return (
    <div style={{ backgroundColor: "#E6F4EA", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Header Section */}
      <header
        style={{
          backgroundColor: "#6B961F",
          color: "#fff",
          padding: "20px 40px",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "10px", fontSize: "28px" }}>{job.title}</h1>
        <p style={{ fontSize: "16px", marginBottom: "5px" }}>{job.type} | {job.vacancy} Vacancy</p>
        <p style={{ fontSize: "14px" }}>{job.postedBy?.address || "Location not specified"}</p>

      </header>

      {/* Content Section */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px" }}>
        <div
          style={{
            backgroundColor: "#fff",
            width: "100%",
            maxWidth: "1200px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
            {/* Job Details */}
            <section style={{ marginBottom: "20px" }}>
              <h2 style={{ color: "#6B961F", fontSize: "20px", marginBottom: "10px" }}>Who we are</h2>
              <p style={{ fontSize: "14px", color: "#555" }}>{job.description || "No description available."}</p>
            </section>

            {/* Requirements Section */}
            <section style={{ marginBottom: "20px" }}>
              <h2 style={{ color: "#6B961F", fontSize: "20px", marginBottom: "10px" }}>Requirements</h2>
              <ul style={{ paddingLeft: "20px", color: "#555" }}>
                {job.requirement ? (
                  job.requirement.split("\n").map((req, index) => (
                    <li key={index} style={{ marginBottom: "5px" }}>{req}</li>
                  ))
                ) : (
                  <li>No requirements specified.</li>
                )}
              </ul>
            </section>

            {/* Benefits Section */}
            <section style={{ marginBottom: "20px" }}>
              <h2 style={{ color: "#6B961F", fontSize: "20px", marginBottom: "10px" }}>Benefits</h2>
              <ul style={{ paddingLeft: "20px", color: "#555" }}>
                <li>Flexible working hours</li>
                <li>Health and wellness programs</li>
                <li>Remote work options</li>
              </ul>
            </section>

            {/* Salary Section */}
            <section style={{ marginBottom: "20px" }}>
              <h2 style={{ color: "#6B961F", fontSize: "20px", marginBottom: "10px" }}>Salary</h2>
              <p style={{ fontSize: "14px", color: "#555" }}>{job.salary || "Not specified"}</p>
            </section>

            {/* Job Nature Section */}
            <section style={{ marginBottom: "20px" }}>
              <h2 style={{ color: "#6B961F", fontSize: "20px", marginBottom: "10px" }}>Job Nature</h2>
              <p style={{ fontSize: "14px", color: "#555" }}>{job.type}</p>
              <p style={{ fontSize: "14px", color: "#555" }}>Apply Before: {new Date(job.deadline).toLocaleDateString()}</p>
            </section>

            {/* Apply Now Button */}
            {user && user.role !== "Employer" && (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Link
                  to={`/application/${job._id}`}
                  style={{
                    display: "inline-block",
                    backgroundColor: "#6B961F",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    textDecoration: "none",
                    fontSize: "16px",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4A7A12")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6B961F")}
                >
                  Apply Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default JobDetails;

