import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./ApplyGig.css";

const ApplyGig = () => {
    const { id } = useParams();
    const [gigDetails, setGigDetails] = useState(null);
    const [coverLetterFile, setCoverLetterFile] = useState(null);

    useEffect(() => {
        const fetchGigDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/gig/${id}`, {
                    withCredentials: true,
                });
                setGigDetails(response.data.gig);
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to fetch gig details.");
            }
        };

        fetchGigDetails();
    }, [id]);

    const handleApply = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("coverLetter", coverLetterFile);

            const response = await axios.post(
                `http://localhost:4000/api/v1/gig/apply/${id}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success(response.data.message);
            setCoverLetterFile(null);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to apply for gig.");
        }
    };

    return (
        <div className="apply-gig-container">
            <h2>Apply for Gig</h2>

            {gigDetails ? (
                <div className="gig-details">
                    <h3>{gigDetails.title}</h3>
                    <p><strong>Description:</strong> {gigDetails.description}</p>
                    <p><strong>Budget:</strong> ${gigDetails.budget}</p>
                    <p><strong>Deadline:</strong> {new Date(gigDetails.deadline).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Loading gig details...</p>
            )}

            <form onSubmit={handleApply}>
                <div className="form-group">
                    <label htmlFor="coverLetter">Upload Cover Letter:</label>
                    <input
                        id="coverLetter"
                        type="file"
                        onChange={(e) => setCoverLetterFile(e.target.files[0])}
                        accept=".pdf,.doc,.docx"
                        required
                    />
                </div>
                <button type="submit" className="btn-primary">Submit Application</button>
            </form>
        </div>
    );
};

export default ApplyGig;
