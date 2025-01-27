// import PropTypes from "prop-types";

// const GigListingCard = ({ gig, onView }) => {

//     return (
//         <div
//             style={{
//                 border: "1px solid #ddd",
//                 padding: "15px",
//                 borderRadius: "8px",
//                 boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                 textAlign: "center",
//                 width: "300px",
//                 overflow: "hidden",
//             }}
//         >
//             {/* Gig Image */}
//             <img
//                 src={`http://localhost:4000${gig.imageUrl}`}
//                 alt={`http://localhost:4000${gig.imageUrl}`}
//                 style={{
//                     width: "100%",
//                     height: "150px",
//                     objectFit: "cover",
//                     borderRadius: "8px 8px 0 0",
//                     marginBottom: "15px",
//                 }}
//             />
//             {/* Gig Content */}
//             <h3>{gig.title}</h3>
//             <p style={{ color: "#666", marginBottom: "10px" }}>{gig.description}</p>
//             <p><strong>Budget:</strong> ${gig.budget}</p>
//             <p><strong>Deadline:</strong> {new Date(gig.deadline).toLocaleDateString()}</p>
//             <button
//                 style={{
//                     padding: "10px 15px",
//                     backgroundColor: "#007bff",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     fontSize: "1rem",
//                     marginTop: "15px",
//                 }}
//                 onClick={() => onView(gig._id)}
//             >
//                 View Gig
//             </button>
//         </div>
//     );
// };

// GigListingCard.propTypes = {
//     gig: PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         title: PropTypes.string.isRequired,
//         description: PropTypes.string.isRequired,
//         budget: PropTypes.number.isRequired,
//         deadline: PropTypes.string.isRequired,
//         imageUrl: PropTypes.string, // Optional image URL
//     }).isRequired,
//     onView: PropTypes.func.isRequired,
// };

// export default GigListingCard;

import PropTypes from "prop-types";

const GigListingCard = ({ gig, onView }) => {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                width: "100%",
                maxWidth: "600px",
                overflow: "hidden",
                margin: "10px auto",
                backgroundColor: "#fff",
            }}
        >
            {/* Gig Image */}
            <img
                src={`http://localhost:4000${gig.imageUrl}`}
                alt={gig.title}
                style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                }}
            />

            {/* Gig Content */}
            <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "1.5rem", color: "#333" }}>
                    {gig.title}
                </h3>
                <p
                    style={{
                        color: "#666",
                        marginBottom: "10px",
                        fontSize: "0.95rem",
                        lineHeight: "1.4",
                    }}
                >
                    {gig.description}
                </p>
                <p
                    style={{
                        margin: "5px 0",
                        fontSize: "1rem",
                        color: "#444",
                    }}
                >
                    <strong>Budget:</strong> ${gig.budget}
                </p>
                <p
                    style={{
                        margin: "5px 0",
                        fontSize: "1rem",
                        color: "#444",
                    }}
                >
                    <strong>Deadline:</strong> {new Date(gig.deadline).toLocaleDateString()}
                </p>
                <button
                    style={{
                        padding: "10px 15px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "1rem",
                        marginTop: "10px",
                    }}
                    onClick={() => onView(gig._id)}
                >
                    View Gig
                </button>
            </div>
        </div>
    );
};

GigListingCard.propTypes = {
    gig: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        budget: PropTypes.number.isRequired,
        deadline: PropTypes.string.isRequired,
        imageUrl: PropTypes.string, // Optional image URL
    }).isRequired,
    onView: PropTypes.func.isRequired,
};

export default GigListingCard;

