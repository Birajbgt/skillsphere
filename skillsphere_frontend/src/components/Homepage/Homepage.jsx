import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../common/Footer";
import JobListingCard from "../../common/JobListingCard";
import { Context } from "../../main"; // Assuming user context is provided in Context
import GigListingCard from "./GigListingCard"; // New component for gigs

const Homepage = () => {
    const { user } = useContext(Context); // Access user role from context
    const [jobs, setJobs] = useState([]);
    const [gigs, setGigs] = useState([]); // State to hold gigs
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/v1/job/getall", {
                    withCredentials: true,
                });
                setJobs(data.jobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        const fetchGigs = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/v1/gig/all", {
                    withCredentials: true,
                });
                setGigs(data.gigs);
            } catch (error) {
                console.error("Error fetching gigs:", error);
            }
        };

        fetchJobs();
        fetchGigs();
    }, []);

    const handleApply = (id) => {
        navigate(`/Application/${id}`);
    };

    const handleViewGig = (id) => {
        navigate(`/gig/${id}`);
    };

    return (
        <div>
            <header
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    backgroundImage: "url(/banner.webp)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                    textAlign: "center",
                    height: "300px",
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <button
                        style={{
                            padding: "10px 20px",
                            margin: "0 10px",
                            backgroundColor: "#008000",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "1rem",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/job/getall")}
                    >
                        Find a Job
                    </button>
                    {user?.role === "Employer" && (
                        <button
                            style={{
                                padding: "10px 20px",
                                margin: "0 10px",
                                backgroundColor: "#008000",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "1rem",
                                cursor: "pointer",
                            }}
                            onClick={() => navigate("/job/post")}
                        >
                            Post a Job
                        </button>
                    )}
                </div>
            </header>

            <section style={{ padding: "20px", textAlign: "center" }}>
                <h2>Job Listings</h2>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "20px",
                    }}
                >
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <JobListingCard key={job.id} job={job} onApply={handleApply} />
                        ))
                    ) : (
                        <p>No jobs available at the moment.</p>
                    )}
                </div>
            </section>

            <section style={{ padding: "20px", textAlign: "center" }}>
                <h2>Gig Listings</h2>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "20px",
                    }}
                >
                    {gigs.length > 0 ? (
                        gigs.map((gig) => (
                            <GigListingCard key={gig._id} gig={gig} onView={handleViewGig} />
                        ))
                    ) : (
                        <p>No gigs available at the moment.</p>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Homepage;
