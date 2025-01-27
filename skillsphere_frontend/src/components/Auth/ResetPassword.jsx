// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Font Awesome icons

// const ResetPassword = () => {
//   const { token } = useParams(); // Get the token from the URL
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   const handlePasswordReset = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       return toast.error("Passwords do not match.");
//     }

//     try {
//       const { data } = await axios.put(
//         `http://localhost:4000/api/v1/user/reset-password/${token}`,
//         { password },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       toast.success(data.message);
//       navigate("/login");
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "Something went wrong. Please try again.";
//       toast.error(errorMessage);
//     }
//   };

//   const handleGoBack = () => {
//     navigate("/forgot-password"); // Navigate to Forgot Password page
//   };

//   const styles = {
//     authPage: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       minHeight: "100vh",
//       background: "url('/Line 3.png') no-repeat bottom",
//       backgroundPosition: 'center bottom',
//       position: "relative",
//     },
//     container: {
//       width: "800px",
//       height: "600px",
//       background: "rgba(229, 229, 229, 0.582)",
//       borderRadius: "10px",
//       padding: "20px 40px",
//       boxShadow: "0 4px 8px rgba(112, 111, 111, 0.988)",
//       textAlign: "center",
//     },
//     header: {
//       marginBottom: "30px",
//       position: "relative",
//     },
//     backButton: {
//       position: "absolute",
//       left: "55px",
//       top: "40px",
//       cursor: "pointer",
//       fontSize: "1.5rem",
//       color: "#333",
//     },
//     headerH3: {
//       fontSize: "1.5rem",
//       fontWeight: "bold",
//       color: "#000",
//       marginTop: "50px",
//     },
//     form: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       gap: "20px",
//       marginTop: "20px",
//     },
//     inputTag: {
//       display: "flex",
//       flexDirection: "column",
//       color: "#666464",
//       fontWeight: "bold",
//       marginTop: "20px",
//       textAlign: "left", // Align labels to the left
//     },
//     inputField: {
//       display: "flex",
//       alignItems: "center",
//       position: "relative",
//       border: "1px solid green",
//       borderRadius: "5px",
//       background: "#f0f0f0",
//       height: "50px",
//       width: "400px",
//     },
//     input: {
//       background: "#fff",
//       padding: "15px",
//       border: "none",
//       width: "100%",
//       outline: "none",
//     },
//     button: {
//       marginTop: "30px",
//       padding: "10px 20px",
//       background: "#6B961F",
//       boxShadow: "0 4px 8px rgba(112, 111, 111, 0.988)",
//       color: "#fff",
//       fontSize: "1rem",
//       borderRadius: "5px",
//       cursor: "pointer",
//       textAlign: "center",
//       transition: "background 0.3s",
//       border: "none",
//       width: "50%",
//     },
//     buttonHover: {
//       background: "#F4BA1A",
//     },
//     eyeIcon: {
//       position: "absolute",
//       right: "10px",
//       top: "55%",
//       fontSize:"20px",
//       transform: "translateY(-50%)",
//       cursor: "pointer",
//     },
//   };

//   return (
//     <section style={styles.authPage}>
//       <div style={styles.container}>
//         <div style={styles.header}>
//           <span style={styles.backButton} onClick={handleGoBack}>
//             &#8592; {/* Unicode left arrow for back button */}
//           </span>
//           <h3 style={styles.headerH3}>Reset Password</h3>
//         </div>
//         <form onSubmit={handlePasswordReset} style={styles.form}>
//           <div style={styles.inputTag}>
//             <label>Enter New Password</label>
//             <div style={styles.inputField}>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 style={styles.input}
//               />
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 style={styles.eyeIcon}
//               >
//                 {showPassword ? <FaEye /> : <FaEyeSlash />}
//               </span>
//             </div>
//           </div>
//           <div style={styles.inputTag}>
//             <label>Confirm Password</label>
//             <div style={styles.inputField}>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 style={styles.input}
//               />
//               <span
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 style={styles.eyeIcon}
//               >
//                 {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
//               </span>
//             </div>
//           </div>
//           <button
//             type="submit"
//             style={styles.button}
//             onMouseEnter={(e) => (e.target.style.background = styles.buttonHover.background)}
//             onMouseLeave={(e) => (e.target.style.background = "#6B961F")}
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default ResetPassword;

// import axios from "axios";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useNavigate, useParams } from "react-router-dom";

// const ResetPassword = () => {
//   const { token } = useParams();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   const handlePasswordReset = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       return toast.error("Passwords do not match.");
//     }

//     try {
//       const { data } = await axios.put(
//         `http://localhost:4000/api/v1/user/reset-password/${token}`,
//         { password },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       toast.success(data.message);
//       navigate("/login");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Something went wrong. Please try again."
//       );
//     }
//   };

//   const styles = {
//     page: {
//       backgroundColor: "#f9f9f9",
//       minHeight: "100vh",
//       fontFamily: "'Poppins', sans-serif",
//     },
//     header: {
//       backgroundColor: "#6B961F",
//       padding: "15px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       color: "#fff",
//     },
//     headerLeft: {
//       fontWeight: "bold",
//       fontSize: "1.5rem",
//     },
//     headerInput: {
//       padding: "8px",
//       borderRadius: "8px",
//       border: "none",
//       outline: "none",
//     },
//     headerIcons: {
//       display: "flex",
//       gap: "15px",
//       fontSize: "1.2rem",
//     },
//     container: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       padding: "50px 0",
//     },
//     formWrapper: {
//       backgroundColor: "#fff",
//       borderRadius: "12px",
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       padding: "40px",
//       width: "50%",
//       maxWidth: "600px",
//       textAlign: "center",
//     },
//     heading: {
//       fontSize: "24px",
//       fontWeight: "bold",
//       marginBottom: "20px",
//       color: "#333",
//     },
//     subHeading: {
//       color: "#555",
//       fontSize: "16px",
//       marginBottom: "30px",
//     },
//     formGroup: {
//       marginBottom: "20px",
//     },
//     label: {
//       display: "block",
//       marginBottom: "8px",
//       fontWeight: "500",
//       color: "#333",
//     },
//     inputField: {
//       position: "relative",
//     },
//     input: {
//       width: "100%",
//       padding: "12px",
//       borderRadius: "8px",
//       border: "1px solid #ddd",
//       outline: "none",
//     },
//     eyeIcon: {
//       position: "absolute",
//       right: "10px",
//       top: "50%",
//       transform: "translateY(-50%)",
//       fontSize: "1.2rem",
//       cursor: "pointer",
//       color: "#666",
//     },
//     button: {
//       width: "100%",
//       padding: "12px",
//       backgroundColor: "#6B961F",
//       color: "#fff",
//       border: "none",
//       borderRadius: "8px",
//       fontSize: "16px",
//       cursor: "pointer",
//       transition: "background-color 0.3s",
//     },
//     buttonHover: {
//       backgroundColor: "#4CAF50",
//     },
//     footer: {
//       backgroundColor: "#6B961F",
//       padding: "20px",
//       textAlign: "center",
//       color: "#fff",
//       marginTop: "50px",
//     },
//     footerLinks: {
//       display: "flex",
//       justifyContent: "center",
//       gap: "15px",
//       marginTop: "10px",
//     },
//     footerLink: {
//       color: "#fff",
//       textDecoration: "none",
//       fontWeight: "500",
//     },
//   };

//   return (
//     <div style={styles.page}>
//       {/* Navbar */}
//       <header style={styles.header}>
//         <div style={styles.headerLeft}>SKILL SPHERE</div>
//         <input
//           type="text"
//           placeholder="Looking for a job?"
//           style={styles.headerInput}
//         />
//         <div style={styles.headerIcons}>
//           <span>🔔</span>
//           <span>💬</span>
//           <span>🤍</span>
//           <span>👤</span>
//         </div>
//       </header>

//       {/* Reset Password Form */}
//       <div style={styles.container}>
//         <div style={styles.formWrapper}>
//           <h1 style={styles.heading}>Change Password</h1>
//           <p style={styles.subHeading}>
//             Feel free if you have any query.
//           </p>
//           <form onSubmit={handlePasswordReset}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Current Password</label>
//               <div style={styles.inputField}>
//                 <input
//                   type="password"
//                   placeholder="Enter your current password"
//                   style={styles.input}
//                   disabled
//                 />
//               </div>
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>New Password</label>
//               <div style={styles.inputField}>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your new password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   style={styles.input}
//                   required
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   style={styles.eyeIcon}
//                 >
//                   {showPassword ? <FaEye /> : <FaEyeSlash />}
//                 </span>
//               </div>
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Confirm Password</label>
//               <div style={styles.inputField}>
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   placeholder="Confirm your new password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   style={styles.input}
//                   required
//                 />
//                 <span
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   style={styles.eyeIcon}
//                 >
//                   {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
//                 </span>
//               </div>
//             </div>
//             <button
//               type="submit"
//               style={styles.button}
//               onMouseEnter={(e) =>
//                 (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
//               }
//               onMouseLeave={(e) =>
//                 (e.target.style.backgroundColor = "#6B961F")
//               }
//             >
//               Change Password
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer style={styles.footer}>
//         <div>SKILL SPHERE</div>
//         <div style={styles.footerLinks}>
//           <a href="#" style={styles.footerLink}>
//             About Us
//           </a>
//           <a href="#" style={styles.footerLink}>
//             Career
//           </a>
//           <a href="#" style={styles.footerLink}>
//             Help & Support
//           </a>
//           <a href="#" style={styles.footerLink}>
//             Blog
//           </a>
//           <a href="#" style={styles.footerLink}>
//             Contact Us
//           </a>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default ResetPassword;
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/user/reset-password/${token}`,
        { password },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  const styles = {
    page: {
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
      fontFamily: "'Poppins', sans-serif",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      backgroundColor: "#6B961F",
      padding: "15px",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#fff",
    },
    headerLeft: {
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    headerInput: {
      flex: "1 1 300px",
      margin: "10px",
      padding: "8px",
      borderRadius: "8px",
      border: "none",
      outline: "none",
    },
    headerIcons: {
      display: "flex",
      gap: "15px",
      fontSize: "1.2rem",
    },
    container: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    formWrapper: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "40px",
      width: "90%",
      maxWidth: "600px",
      textAlign: "center",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    subHeading: {
      color: "#555",
      fontSize: "16px",
      marginBottom: "30px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "500",
      color: "#333",
    },
    inputField: {
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      outline: "none",
    },
    eyeIcon: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "1.2rem",
      cursor: "pointer",
      color: "#666",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#6B961F",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#4CAF50",
    },
    footer: {
      backgroundColor: "#6B961F",
      padding: "20px",
      textAlign: "center",
      color: "#fff",
      marginTop: "50px",
    },
    footerLinks: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "15px",
      marginTop: "10px",
    },
    footerLink: {
      color: "#fff",
      textDecoration: "none",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <h1 style={styles.heading}>Change Password</h1>
          <form onSubmit={handlePasswordReset}>
            <div style={styles.formGroup}>
              <label style={styles.label}>New Password</label>
              <div style={styles.inputField}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password</label>
              <div style={styles.inputField}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.input}
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#6B961F")
              }
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
