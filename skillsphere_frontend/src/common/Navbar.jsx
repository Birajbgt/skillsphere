// // export default Navbar;
// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";
// import { Context } from "../main";
// import "./Navbar.css";

// const Navbar = () => {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const navigate = useNavigate();
//     const { isAuthorized, setIsAuthorized, user } = useContext(Context);

//     const toggleDropdown = () => {
//         setIsDropdownOpen((prev) => !prev);
//     };

//     const handleLogout = async () => {
//         try {
//             const response = await axios.get("http://localhost:4000/api/v1/user/logout", {
//                 withCredentials: true,
//             });
//             toast.success(response.data.message);
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//             setIsAuthorized(false);
//             navigate("/login");
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Logout failed");
//         }
//     };

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const userData = localStorage.getItem("user");
//         if (token && userData) {
//             setIsAuthorized(true);
//         }
//     }, [setIsAuthorized]);

//     return (
//         <nav className="navbar">
//             <div className="navbar-logo" onClick={() => navigate("/")}>
//                 SKILL SPHERE
//             </div>
//             <div className="navbar-links">
//                 {isAuthorized && user?.role === "Job Seeker" && (
//                     <>
//                         <Link to="/job/getall" className="nav-link">
//                             Jobs
//                         </Link>
//                         <Link to="/gig/all" className="nav-link">
//                             Gigs
//                         </Link>
//                         <Link to="/about" className="nav-link">
//                             About Us
//                         </Link>
//                     </>
//                 )}
//                 {isAuthorized && user?.role === "Employer" && (
//                     <>
//                         <Link to="/job/post" className="nav-link">
//                             Add Job
//                         </Link>
//                         <Link to="/gig/post" className="nav-link">
//                             Add Gig
//                         </Link>
//                     </>
//                 )}
//             </div>
//             <div className="navbar-actions">
//                 {isAuthorized ? (
//                     <div className="navbar-dropdown">
//                         <button className="dropdown-toggle" onClick={toggleDropdown}>
//                             👤 {user?.name}
//                         </button>
//                         {isDropdownOpen && (
//                             <div className="dropdown-popup">
//                                 <ul className="dropdown-menu">
//                                     <li>
//                                         <Link to="/account">Profile</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/settings">Settings</Link>
//                                     </li>
//                                     <li>
//                                         <button onClick={handleLogout} className="logout-btn">
//                                             Logout
//                                         </button>
//                                     </li>
//                                 </ul>
//                             </div>
//                         )}
//                     </div>
//                 ) : (
//                     <div>
//                         <button
//                             className="auth-btn login-btn"
//                             onClick={() => navigate("/login")}
//                         >
//                             Login
//                         </button>
//                         <button
//                             className="auth-btn register-btn"
//                             onClick={() => navigate("/register")}
//                         >
//                             Register
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import "./Navbar.css";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();
    const { isAuthorized, setIsAuthorized, user } = useContext(Context);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/user/logout", {
                withCredentials: true,
            });
            toast.success(response.data.message);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setIsAuthorized(false);
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    const confirmLogout = () => {
        setShowLogoutModal(true);
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        if (token && userData) {
            setIsAuthorized(true);
        }
    }, [setIsAuthorized]);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo" onClick={() => navigate("/")}>
                    SKILL SPHERE
                </div>
                <div className="navbar-links"><Link to="/applications/me" className="nav-link">
                    Jobs applied
                </Link>
                    {isAuthorized && user?.role === "Job Seeker" && (
                        <>
                            <Link to="/job/getall" className="nav-link">
                                Jobs
                            </Link>
                            <Link to="/gigs/post" className="nav-link">
                                Gigs
                            </Link>
                            <Link to="/aboutus" className="nav-link">
                                About Us
                            </Link>
                        </>
                    )}
                    {isAuthorized && user?.role === "Employer" && (
                        <>
                            <Link to="/job/post" className="nav-link">
                                Add Job
                            </Link>
                            <Link to="/gigs/post" className="nav-link">
                                Add Gig
                            </Link>
                        </>
                    )}
                </div>
                <div className="navbar-actions">
                    {isAuthorized ? (
                        <div className="navbar-dropdown">
                            <button className="dropdown-toggle" onClick={toggleDropdown}>
                                👤 {user?.name}
                            </button>
                            {isDropdownOpen && (
                                <div className="dropdown-popup">
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to="/account">Profile</Link>
                                        </li>
                                        <li>
                                            <Link to="/settings">Settings</Link>
                                        </li>
                                        <li>
                                            <Link to="/interviews">Interview</Link>
                                        </li>
                                        <li>
                                            <button onClick={confirmLogout} className="logout-btn">
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <button
                                className="auth-btn login-btn"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                            <button
                                className="auth-btn register-btn"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="logout-modal">
                    <div className="modal-content">
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to log out?</p>
                        <div className="modal-actions">
                            <button onClick={handleLogout} className="confirm-btn">
                                Yes, Logout
                            </button>
                            <button onClick={cancelLogout} className="cancel-btn">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
