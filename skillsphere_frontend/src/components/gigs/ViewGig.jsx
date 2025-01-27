// import React, { useEffect, useState } from "react";
// import GigList from "./GigList";

// const ViewGigs = () => {
//     const [gigs, setGigs] = useState([]);
//     const [userRole, setUserRole] = useState(""); // State to store the user's role

//     // Fetch user role from localStorage
//     useEffect(() => {
//         const storedUserData = localStorage.getItem("user"); // Assuming user data is saved in localStorage with key 'user'
//         if (storedUserData) {
//             const userData = JSON.parse(storedUserData);
//             setUserRole(userData.role); // Extract and set the role
//         }
//     }, []);

//     // Fetch gigs
//     useEffect(() => {
//         const fetchGigs = async () => {
//             try {
//                 const response = await fetch("http://localhost:4000/api/v1/gig/all", {
//                     credentials: "include",
//                 });
//                 const data = await response.json();
//                 setGigs(data.gigs);
//             } catch (err) {
//                 console.error("Error fetching gigs:", err);
//             }
//         };

//         fetchGigs();
//     }, []);

//     return (
//         <div>
//             <h2>Available Gigs</h2>
//             <GigList gigs={gigs} userRole={userRole} />
//         </div>
//     );
// };

// export default ViewGigs;

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GigList from "./GigList";
import "./ViewGigs.css";

const ViewGigs = () => {
    const [gigs, setGigs] = useState([]);
    const [userRole, setUserRole] = useState(""); // Store user role from localStorage

    // Fetch user role from localStorage
    useEffect(() => {
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUserRole(userData.role);
        }
    }, []);

    // Fetch gigs
    useEffect(() => {
        const fetchGigs = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/gig/all", {
                    withCredentials: true,
                });
                setGigs(response.data.gigs);
            } catch (err) {
                toast.error("Error fetching gigs.");
            }
        };

        fetchGigs();
    }, []);

    return (
        <div className="view-gigs-container">
            <h2>Available Gigs</h2>
            <GigList gigs={gigs} userRole={userRole} />
        </div>
    );
};

export default ViewGigs;
