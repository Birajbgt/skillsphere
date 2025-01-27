import PropTypes from 'prop-types';

const JobListingCard = ({ job, onApply }) => {
    return (
        <div
            style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                width: '250px',
                textAlign: 'left',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
            <img
                src={`http://localhost:4000/uploads/jobs/${job.imageUrl}`}
                // src={job.imageUrl || 'company.webp'}
                alt={job.imageUrl}
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '10px 10px 0 0',
                }}
            />
            <div style={{ padding: '10px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>
                    {job.title}
                </h3>
                <p style={{ color: '#555', fontSize: '0.9rem', margin: '5px 0' }}>
                    Exp: {job.experience || 'Not specified'}
                </p>
                <p style={{ color: '#555', fontSize: '0.9rem', margin: '5px 0' }}>
                    {job.type}
                </p>
                <button
                    style={{
                        width: '100%',
                        padding: '8px 10px',
                        backgroundColor: '#008000',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                    onClick={() => onApply(job._id)}

                >
                    Apply Now
                </button>
            </div>
        </div>
    );
};

JobListingCard.propTypes = {
    job: PropTypes.shape({
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        experience: PropTypes.string,
        type: PropTypes.string,
        _id: PropTypes.string.isRequired,
        image: PropTypes.string,
    }).isRequired,
    onApply: PropTypes.func.isRequired,
};

export default JobListingCard;
