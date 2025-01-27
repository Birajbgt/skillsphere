import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./ViewApplicants.css";

const ViewApplicants = () => {
    const { id } = useParams(); // Gig ID from URL
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/gig/applicants/${id}`, {
                    withCredentials: true,
                });
                setApplicants(response.data.applicants);
                setLoading(false);
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to fetch applicants.");
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [id]);

    if (loading) {
        return <p className="loading-text">Loading applicants...</p>;
    }

    if (applicants.length === 0) {
        return <p className="no-applicants-text">No applicants have applied for this gig yet.</p>;
    }

    return (
        <div className="view-applicants-container">
            <h2>Applicants for Gig</h2>
            <ul className="applicants-list">
                {applicants.map((applicant) => (
                    <li key={applicant.freelancer._id} className="applicant-card">
                        <h3>{applicant.freelancer.name}</h3>
                        <p><strong>Email:</strong> {applicant.freelancer.email}</p>
                        <p><strong>Applied At:</strong> {new Date(applicant.appliedAt).toLocaleDateString()}</p>
                        <a
                            href={`http://localhost:4000${applicant.coverLetter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-link"
                        >
                            View Cover Letter
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewApplicants;
