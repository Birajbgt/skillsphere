// import React, { useContext, useState } from "react";
// import { FaRegUser, FaUser } from "react-icons/fa";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { RiLock2Fill } from "react-icons/ri";
// import { FaPencilAlt } from "react-icons/fa";
// import { FaPhoneFlip } from "react-icons/fa6";
// import { Link, Navigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Context } from "../../main";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//    const [passwordVisible, setPasswordVisible] = useState(false);  // State for password visibility


//   const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/user/register",
//         { name, phone, email, role, password },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       toast.success(data.message);
//       setName("");
//       setEmail("");
//       setPassword("");
//       setPhone("");
//       setRole("");
//       setIsAuthorized(true);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   if(isAuthorized){
//     return <Navigate to={'/'}/>
//   }


//   return (
//     <>
//       <section className="authPage">
//         <div className="container">
//           <div className="header">
//             <img src="logo.png" alt="logo" />
//             <h3>Create a new account</h3>
//           </div>
//           <form>
//           <div className="inputTag2">
//             <label>Login As</label>
//             <div className="radioGroup">
//               <label>
//                 <input
//                   type="radio"
//                   value="Employer"
//                   checked={role === "Employer"}
//                   onChange={(e) => setRole(e.target.value)}
//                 />

//                 Employer
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="Job Seeker"
//                   checked={role === "Job Seeker"}
//                   onChange={(e) => setRole(e.target.value)}
//                 />
//                 Job Seeker
//               </label>
//             </div>
//           </div>
//             <div className="inputTag">
//               <label>Name</label>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Zeeshan"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <FaUser />
//               </div>
//             </div>
//             <div className="inputTag">
//               <label>Email Address</label>
//               <div>
//                 <input
//                   type="email"
//                   placeholder="zk@gmail.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <MdOutlineMailOutline />
//               </div>
//             </div>
//             <div className="inputTag">
//               <label>Phone Number</label>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="12345678"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//                 <FaPhoneFlip />
//               </div>
//             </div>
//              <div className="inputTag">
//               <label>Password</label>
//               <div>
//                 <input
//                   type={passwordVisible ? "text" : "password"} // Toggle input type
//                   placeholder="Your Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                  <span
//                   className="togglePassword"
//                   onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
//                 >
//                   {passwordVisible ? (
//                     <i className="fas fa-eye"></i> // Eye slash when visible
//                   ) : (
//                     <i className="fas fa-eye-slash"></i> // Eye when hidden
//                   )}
//                 </span>
//                 <RiLock2Fill />

//               </div>
//             </div>
//             <button type="submit" onClick={handleRegister}>
//               Register
//             </button>
//             <div className="separator">
//     <span>OR</span>
//   </div>
//             <Link to={"/login"}>Login
//             </Link>
//           </form>
//         </div>
//         <div className="banner">
//           <img src="/register.png" alt="login" />
//         </div>
//       </section>
//     </>
//   );
// };

// export default Register;

import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser, FaUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Job Seeker");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { isAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, email, phone, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", display: "flex", minHeight: "100vh" }}>
      {/* Form Section */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f4f4f4" }}>
        <form
          onSubmit={handleRegister}
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            width: "400px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Create an Account</h2>
          <p style={{ textAlign: "center", marginBottom: "20px", color: "#555" }}>
            Let’s get started with your 30 days free trial
          </p>

          <label>Name</label>
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
            <FaUser style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
          </div>

          <label>Email</label>
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
            <MdOutlineMailOutline style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
          </div>

          <label>Phone</label>
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
            <FaRegUser style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
          </div>

          <label>Password</label>
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              style={{ position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#888" }}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </span>
            <RiLock2Fill style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#888" }} />
          </div>

          <label>Role</label>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ marginRight: "10px" }}>
              <input
                type="radio"
                value="Employer"
                checked={role === "Employer"}
                onChange={(e) => setRole(e.target.value)}
                style={{ marginRight: "5px" }}
              />
              Employer
            </label>
            <label>
              <input
                type="radio"
                value="Job Seeker"
                checked={role === "Job Seeker"}
                onChange={(e) => setRole(e.target.value)}
                style={{ marginRight: "5px" }}
              />
              Job Seeker
            </label>
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
            Create Account
          </button>

          <div style={{ textAlign: "center", margin: "20px 0", color: "#888" }}>Or</div>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px", cursor: "pointer" }}>Facebook</button>
            <button style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px", cursor: "pointer" }}>Google</button>
            <button style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px", cursor: "pointer" }}>Email</button>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            Already have an account? <Link to="/login" style={{ color: "#008000" }}>Sign in</Link>
          </div>
        </form>
      </div>

      {/* Banner Section */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#008000" }}>
        <img
          src="/register.png"
          alt="Register illustration"
          style={{ width: "80%", maxWidth: "400px", borderRadius: "8px" }}
        />
      </div>
    </div>
  );
};

export default Register;