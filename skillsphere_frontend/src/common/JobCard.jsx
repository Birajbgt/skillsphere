// import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
    return (
        <div
            style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <img
                    src={`http://localhost:4000/uploads/jobs/${job.imageUrl}`}
                    alt={job.imageUrl}
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        marginRight: "15px",
                    }}
                />
                <div>
                    <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#333" }}>{job.title}</h3>
                    <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>{job.postedBy?.name}</p>
                </div>
            </div>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "10px" }}>
                {job.description.slice(0, 100)}...
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                    style={{
                        backgroundColor: "#E9F7E9",
                        padding: "5px 10px",
                        borderRadius: "8px",
                        color: "#6B961F",
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                    }}
                >
                    {job.type}
                </span>
                <span
                    style={{
                        backgroundColor: "#ffffff",
                        padding: "5px 10px",
                        borderRadius: "8px",
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                    }}
                >
                    {job.salary}
                </span>
                <Link
                    to={`/job/${job._id}`}
                    style={{
                        backgroundColor: "#6B961F",
                        color: "white",
                        padding: "8px 15px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                    }}
                >
                    View More
                </Link>
            </div>
        </div>
    );
};

// PropTypes for validation
JobCard.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        salary: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        postedBy: PropTypes.shape({
            photo: PropTypes.string,
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default JobCard;
