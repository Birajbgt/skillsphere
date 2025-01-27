// import axios from "axios";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();


//   const handleGoBack = () => {
//     navigate("/login"); // Navigate to Forgot Password page
//   };
//   const handleSend = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/user/forgot-password",
//         { email },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       toast.success(data.message);
//       setEmail("");
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   // Inline styles
//   const styles = {
//     authPage: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       minHeight: "100vh",
//       background: "url('Line 3.png') no-repeat bottom",
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
//       position: "relative",
//     },
//     backIcon: {
//       position: "absolute",
//       top: "55px",
//       left: "40px",
//       fontSize: "1.8rem",
//       color: "#000",
//       cursor: "pointer",
//       textDecoration: "none",
//       fontWeight: "bold",
//     },
//     header: { marginBottom: "30px" },
//     headerH3: {
//       fontSize: "1.5rem",
//       fontWeight: "bold",
//       color: "#000",
//       marginTop: "50px",
//     },
//     headerH4: {
//       fontSize: "1rem",
//       fontWeight: "normal",
//       color: "#000",
//       marginTop: "50px", // Adds gap between h3 and h4
//     },
//     form: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       gap: "20px",
//       marginTop: "20px", // Adjusts to prevent shifting
//     },
//     inputTag: {
//       display: "flex",
//       flexDirection: "column",
//       color: "#666464",
//       fontWeight: "bold",
//       marginTop: "20px", // Ensures no excessive margin
//     },
//     inputField: {
//       display: "flex",
//       alignItems: "center",
//       position: "relative",
//       border: "1px solid green",
//       borderRadius: "5px",
//       background: "#f0f0f0",
//       height: "50px",
//       width: "400px", // Adjusts input width
//     },
//     input: {
//       background: "#fff",
//       padding: "15px",
//       border: "none",
//       width: "100%",
//       outline: "none", // Removes focus border
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
//       background: "#F4BA1A", // Hover background
//       color: "#fff",
//     },
//   };

//   return (
//     <section style={styles.authPage}>
//       <div style={styles.container}>
//         {/* Back Icon */}
//         <span
//           style={styles.backIcon}
//           onClick={handleGoBack} // Navigate to the previous page
//         >
//           ←
//         </span>

//         <div style={styles.header}>
//           <h3 style={styles.headerH3}>Forgot Password?</h3>
//           <h4 style={styles.headerH4}>Enter your email to reset your password</h4>
//         </div>
//         <form onSubmit={handleSend} style={styles.form}>
//           <div style={styles.inputTag}>
//             <div style={styles.inputField}>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 style={styles.input}
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             style={styles.button}
//             onMouseEnter={(e) => (e.target.style.background = styles.buttonHover.background)}
//             onMouseLeave={(e) => (e.target.style.background = styles.button.background)}
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default ForgotPassword;
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  // Handles the submission of the forgot password form
  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Main Section */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <div
          style={{
            width: "400px",
            textAlign: "center",
            borderRadius: "12px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            backgroundColor: "#fff",
          }}
        >
          <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
            Forgot your password?
          </h1>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            Enter your email below to recover your password.
          </p>

          <form onSubmit={handleSend}>
            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#6B961F",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#4CAF50")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#6B961F")
              }
            >
              Submit
            </button>
          </form>

          <p style={{ marginTop: "20px", color: "#666" }}>
            Or{" "}
            <span
              style={{
                color: "#007BFF",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
