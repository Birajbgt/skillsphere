import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Context } from "../../main";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const { isAuthorized } = useContext(Context);

  // Parse user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const endpoint =
          user?.role === "Employer"
            ? "http://localhost:4000/api/v1/application/employer/getall"
            : "http://localhost:4000/api/v1/application/jobseeker/getall";

        const res = await axios.get(endpoint, { withCredentials: true });
        setApplications(res.data.applications);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch applications. Please try again.");
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [isAuthorized, user]);

  const deleteApplication = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${deleteId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== deleteId)
      );
      setDeleteModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application.");
      setDeleteModalOpen(false);
    }
  };

  const openModal = (url) => {
    setFileUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFileUrl("");
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "20px" }}>
      <section className="my_applications page">
        <div className="main-content">
          {applications.length <= 0 ? (
            <h4 style={{ textAlign: "center", color: "#6c757d" }}>No Applications Found</h4>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 2fr 2fr 2fr 1fr",
                  gap: "10px",
                  padding: "12px",
                  backgroundColor: "#f1f1f1",
                  fontWeight: "bold",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <div>{user?.role === "Employer" ? "Job Position" : "Date"}</div>
                <div>{user?.role === "Employer" ? "Applicant Name" : "Job Role"}</div>
                <div>{user?.role === "Employer" ? "Resume" : "Company"}</div>
                <div>{user?.role === "Employer" ? "Cover Letter" : "Status"}</div>
                <div>Action</div>
              </div>
              {applications.map((element) =>
                user?.role === "Employer" ? (
                  <EmployerCard
                    element={element}
                    key={element._id}
                    openModal={openModal}
                    openDeleteModal={openDeleteModal}
                  />
                ) : (
                  <JobSeekerCard
                    element={element}
                    key={element._id}
                    openDeleteModal={openDeleteModal}
                  />
                )
              )}
            </>
          )}
        </div>
      </section>

      {modalOpen && <ResumeModal fileUrl={fileUrl} onClose={closeModal} />}

      {deleteModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h4>Confirm Deletion</h4>
            <p>Are you sure you want to delete this application?</p>
            <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "20px" }}>
              <button
                onClick={deleteApplication}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDeleteModal}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  const [status, setStatus] = useState(element.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      setStatus(newStatus);
      const res = await axios.put(
        `http://localhost:4000/api/v1/application/update-status/${element._id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      setStatus(element.status);
      toast.error(error.response?.data?.message || "Failed to update status.");
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 2fr 2fr 2fr 1fr",
        gap: "10px",
        padding: "12px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
      }}
    >
      <div>{element.jobTitle}</div>
      <div>{element.applicantName}</div>
      <div>
        <button
          onClick={() => openModal(element.resume.url)}
          style={{
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "6px 10px",
          }}
        >
          View Resume
        </button>
      </div>
      <div>
        <button
          onClick={() => openModal(element.coverLetter.url)}
          style={{
            backgroundColor: "#2196f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "6px 10px",
          }}
        >
          View Cover Letter
        </button>
      </div>
      <div>
        <select value={status} onChange={handleStatusChange} style={{ padding: "6px" }}>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
};

EmployerCard.propTypes = {
  element: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

const JobSeekerCard = ({ element, openDeleteModal }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "2fr 2fr 2fr 2fr 1fr",
      gap: "10px",
      padding: "12px",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#fff",
    }}
  >
    <div>{new Date(element.jobAppliedOn).toLocaleDateString()}</div>
    <div>{element.jobTitle}</div>
    <div>{element.employerName}</div>
    <div>{element.status}</div>
    <div>
      <button
        onClick={() => openDeleteModal(element._id)}
        style={{
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "6px 10px",
        }}
      >
        Delete
      </button>
    </div>
  </div>
);

JobSeekerCard.propTypes = {
  element: PropTypes.object.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
};

export default MyApplications;
