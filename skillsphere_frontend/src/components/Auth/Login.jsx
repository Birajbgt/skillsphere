
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons for password toggle
import { MdOutlineMailOutline } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../main"; // Assuming Context is exported from context/Context

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Job Seeker"); // Default role is "Job Seeker"
  const [passwordVisible, setPasswordVisible] = useState(false); // Password visibility toggle
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized } = useContext(Context); // Context for authorization state

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // Save token and user data to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsAuthorized(true); // Update context state
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      setIsAuthorized(false); // Ensure context reflects failed login
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  if (isAuthorized) {
    return <Navigate to={'/'} />
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", display: "flex", minHeight: "100vh" }}>
      {/* Login Form Section */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f4f4f4" }}>
        <form
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            width: "400px",
          }}
          onSubmit={handleLogin}
        >
          <h2 style={{ textAlign: "center" }}>Welcome Back 👋</h2>
          <p style={{ textAlign: "center", marginBottom: "20px", color: "#555" }}>Sign in to start managing your projects.</p>

          <label>Login As</label>
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

          <label>Password</label>
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#888" }}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <span
              style={{ color: "#008000", cursor: "pointer" }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
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
            Sign in
          </button>

          <div style={{ textAlign: "center", margin: "20px 0", color: "#888" }}>Or</div>

          <button
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Sign in with Google
          </button>
          <button
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Sign in with Facebook
          </button>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            Don’t have an account? <span style={{ color: "#008000", cursor: "pointer" }} onClick={() => navigate("/register")}>Sign up</span>
          </div>
        </form>
      </div>

      {/* Image Section */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#008000" }}>
        <img
          src="/login.png"
          alt="Login illustration"
          style={{ width: "80%", maxWidth: "400px", borderRadius: "8px" }}
        />
      </div>
    </div>
  );
};

export default Login;
