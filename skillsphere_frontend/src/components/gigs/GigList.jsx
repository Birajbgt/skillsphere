import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./GigList.css";

const GigList = ({ gigs, userRole }) => {

    return (
        <div className="gig-list-container">
            {gigs.map((gig) => (
                <div key={gig._id} className="gig-card">
                    <img
                        src={`http://localhost:4000${gig.imageUrl}`}
                        alt={gig.title}
                        className="gig-image"
                    />
                    <div className="gig-content">
                        <h3>{gig.title}</h3>
                        <p className="gig-description">{gig.description}</p>
                        <p><strong>Budget:</strong> ${gig.budget}</p>
                        <p><strong>Deadline:</strong> {new Date(gig.deadline).toLocaleDateString()}</p>
                        {userRole === "Employer" ? (
                            <Link to={`/gig/${gig._id}/applicants`} className="btn-link">
                                View Applicants
                            </Link>
                        ) : (
                            <Link to={`/gig/${gig._id}`} className="btn-link">
                                View Details
                            </Link>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

GigList.propTypes = {
    gigs: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            imageUrl: PropTypes.string,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            budget: PropTypes.number.isRequired,
            deadline: PropTypes.string.isRequired,
        })
    ).isRequired,
    userRole: PropTypes.string.isRequired,
};

export default GigList;
