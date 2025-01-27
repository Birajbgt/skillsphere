import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { Context } from "../../main";
import "./Interviews.css";

const socket = io("http://localhost:4000"); // Replace with your signaling server URL

const Interviews = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomUserCount, setRoomUserCount] = useState({}); // Tracks the number of users per room

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user || !user.role) {
        toast.error("User role is not defined. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const endpoint =
          user.role === "Employer"
            ? "http://localhost:4000/api/v1/interviews/employer-interview"
            : "http://localhost:4000/api/v1/interviews/jobseeker-interview";

        const res = await axios.get(endpoint, { withCredentials: true });
        setApplications(res.data.interviewDetails || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();

    // Listen for room user updates from the server
    socket.on("room-user-update", ({ roomId, userCount }) => {
      setRoomUserCount((prev) => ({
        ...prev,
        [roomId]: userCount,
      }));
    });

    return () => socket.off("room-user-update"); // Clean up the listener
  }, [user]);

  return (
    <div className="interviews-container">
      <section className="interviews-page">
        <div className="main-content">
          {loading ? (
            <h4>Loading...</h4>
          ) : applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            <>
              <div className="table-header">
                <div>{user?.role === "Employer" ? "Job Position" : "Job Title"}</div>
                <div>{user?.role === "Employer" ? "Applicant Name" : "Company Name"}</div>
                <div>Interview Date</div>
                <div>Interview Time</div>
                <div>Action</div>
              </div>
              {applications.map((element) =>
                user?.role === "Employer" ? (
                  <EmployerCard
                    key={element._id}
                    element={element}
                    roomUserCount={roomUserCount[element.applicationId]}
                  />
                ) : (
                  <JobSeekerCard
                    key={element._id}
                    element={element}
                    roomUserCount={roomUserCount[element.applicationId]}
                  />
                )
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

const VideoCallButton = ({ element, roomUserCount }) => {
  const joinVideoCall = () => {
    const roomId = element.applicationId;

    // Join the room via Socket.IO
    socket.emit("join-room", { roomId, user: element });

    const callWindow = window.open(
      `/video-call?roomId=${roomId}`,
      "Video Call",
      "width=800,height=600,scrollbars=no,resizable=no"
    );

    if (!callWindow) {
      toast.error("Failed to open video call window. Please allow pop-ups.");
    }
  };

  return (
    <div className="action-button">
      <button onClick={joinVideoCall}>
        Join Video {roomUserCount ? `(${roomUserCount} user${roomUserCount > 1 ? "s" : ""})` : ""}
      </button>
    </div>
  );
};

const EmployerCard = ({ element, roomUserCount }) => {
  const [interviewDate, setInterviewDate] = useState(element.interviewDate || "");
  const [interviewTime, setInterviewTime] = useState(element.interviewTime || "");
  const [isScheduled, setIsScheduled] = useState(Boolean(element.interviewDate && element.interviewTime));

  const handleDateChange = (e) => setInterviewDate(e.target.value);
  const handleTimeChange = (e) => setInterviewTime(e.target.value);

  const scheduleInterview = async () => {
    if (!interviewDate || !interviewTime) {
      toast.error("Please select both date and time for the interview.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/interviews/schedule",
        {
          applicationId: element.applicationId,
          interviewDate,
          interviewTime,
        },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      setIsScheduled(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to schedule interview.");
    }
  };

  return (
    <div className="interview-card">
      <div>{element.jobTitle}</div>
      <div>{element.applicantName}</div>
      <div>
        {isScheduled ? (
          <span>{interviewDate}</span>
        ) : (
          <input type="date" value={interviewDate} onChange={handleDateChange} />
        )}
      </div>
      <div>
        {isScheduled ? (
          <span>{interviewTime}</span>
        ) : (
          <input type="time" value={interviewTime} onChange={handleTimeChange} />
        )}
      </div>
      <div className="action-button">
        {isScheduled ? (
          <VideoCallButton element={element} roomUserCount={roomUserCount} />
        ) : (
          <button onClick={scheduleInterview}>Schedule Interview</button>
        )}
      </div>
    </div>
  );
};

const JobSeekerCard = ({ element, roomUserCount }) => (
  <div className="interview-card">
    <div>{element.jobTitle}</div>
    <div>{element.employerName}</div>
    <div>{element.interviewDate}</div>
    <div>{element.interviewTime}</div>
    <VideoCallButton element={element} roomUserCount={roomUserCount} />
  </div>
);

VideoCallButton.propTypes = {
  element: PropTypes.shape({
    applicationId: PropTypes.string.isRequired,
  }).isRequired,
  roomUserCount: PropTypes.number,
};
// PropTypes for validation
EmployerCard.propTypes = {
  element: PropTypes.shape({
    jobTitle: PropTypes.string.isRequired,
    applicantName: PropTypes.string.isRequired,
    interviewDate: PropTypes.string,
    interviewTime: PropTypes.string,
    applicationId: PropTypes.string.isRequired,
  }).isRequired,
  roomUserCount: PropTypes.number,
};

JobSeekerCard.propTypes = {
  element: PropTypes.shape({
    jobTitle: PropTypes.string.isRequired,
    employerName: PropTypes.string.isRequired,
    interviewDate: PropTypes.string.isRequired,
    interviewTime: PropTypes.string.isRequired,
    applicationId: PropTypes.string.isRequired,
  }).isRequired,
  roomUserCount: PropTypes.number,
};

export default Interviews;

// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";
// import { Context } from "../../main";
// import "./Interviews.css";

// const socket = io("http://localhost:4000"); // Replace with your signaling server URL

// const Interviews = () => {
//   const { user } = useContext(Context);
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       if (!user || !user.role) {
//         toast.error("User role is not defined. Please log in again.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const endpoint =
//           user.role === "Employer"
//             ? "http://localhost:4000/api/v1/interviews/employer-interview"
//             : "http://localhost:4000/api/v1/interviews/jobseeker-interview";

//         const res = await axios.get(endpoint, { withCredentials: true });
//         setApplications(res.data.interviewDetails || []);
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Failed to fetch interviews.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//     // Listen for updates on user counts in rooms
//     socket.on("room-user-update", ({ roomId, userCount }) => {
//       setRoomUserCounts((prev) => ({ ...prev, [roomId]: userCount }));
//     });

//     // Clean up socket listeners on component unmount
//     return () => {
//       socket.off("room-user-update");
//     };
//   }, [user]);

//   const handleScheduleInterview = async (applicationId, interviewDate, interviewTime, setIsScheduled) => {
//     if (!interviewDate || !interviewTime) {
//       toast.error("Please select both date and time for the interview.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/v1/interviews/schedule",
//         {
//           applicationId,
//           interviewDate,
//           interviewTime,
//         },
//         { withCredentials: true }
//       );

//       toast.success(response.data.message);
//       setIsScheduled(true);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to schedule interview.");
//     }
//   };

//   const handleJoinVideoCall = (roomId) => {
//     if (!roomId) {
//       toast.error("Room ID is not available. Please check the interview schedule.");
//       return;
//     }

//     // Join the room via Socket.IO
//     socket.emit("join-room", { roomId, user });

//     const callWindow = window.open(
//       `/video-call?roomId=${roomId}`,
//       "Video Call",
//       "width=800,height=600,scrollbars=no,resizable=no"
//     );

//     if (!callWindow) {
//       toast.error("Failed to open video call window. Please allow pop-ups.");
//     }
//   };

//   return (
//     <div className="interviews-container">
//       <section className="interviews-page">
//         <div className="main-content">
//           {loading ? (
//             <h4>Loading...</h4>
//           ) : applications.length === 0 ? (
//             <h4>No Interviews Found</h4>
//           ) : (
//             <>
//               <div className="table-header">
//                 <div>{user?.role === "Employer" ? "Job Position" : "Job Title"}</div>
//                 <div>{user?.role === "Employer" ? "Applicant Name" : "Company Name"}</div>
//                 <div>Interview Date</div>
//                 <div>Interview Time</div>
//                 <div>Action</div>
//               </div>
//               {applications.map((element) => (
//                 <div className="interview-card" key={element.applicationId}>
//                   <div>{element.jobTitle}</div>
//                   <div>{user.role === "Employer" ? element.applicantName : element.employerName}</div>
//                   <div>
//                     {element.interviewDate ? (
//                       <span>{element.interviewDate}</span>
//                     ) : user.role === "Employer" ? (
//                       <input
//                         type="date"
//                         onChange={(e) => (element.interviewDate = e.target.value)}
//                       />
//                     ) : (
//                       <span>Not Scheduled</span>
//                     )}
//                   </div>
//                   <div>
//                     {element.interviewTime ? (
//                       <span>{element.interviewTime}</span>
//                     ) : user.role === "Employer" ? (
//                       <input
//                         type="time"
//                         onChange={(e) => (element.interviewTime = e.target.value)}
//                       />
//                     ) : (
//                       <span>Not Scheduled</span>
//                     )}
//                   </div>
//                   <div className="action-button">
//                     {element.interviewDate && element.interviewTime ? (
//                       <button onClick={() => handleJoinVideoCall(element.roomId)}>Join Video</button>
//                     ) : user.role === "Employer" ? (
//                       <button
//                         onClick={() =>
//                           handleScheduleInterview(
//                             element.applicationId,
//                             element.interviewDate,
//                             element.interviewTime,
//                             (scheduled) => (element.isScheduled = scheduled)
//                           )
//                         }
//                       >
//                         Schedule Interview
//                       </button>
//                     ) : (
//                       <span>Waiting for Schedule</span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Interviews;
