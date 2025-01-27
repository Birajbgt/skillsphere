import axios from "axios";
import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Context } from "./main";


import Navbar from "./common/Navbar";
import Profile from "./components/Account/Account";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Faq from "./components/FAQs/Faq";
import ApplyGig from "./components/gigs/ApplyGig";
import CreateGig from "./components/gigs/CreateGig";
import GigApplicants from "./components/gigs/GigApplicant";
import ViewApplicants from "./components/gigs/ViewApplicants";
import ViewGigs from "./components/gigs/ViewGig";
import Homepage from "./components/Homepage/Homepage";
import Interviews from "./components/Interviews/Interviews";
import VideoCallPage from "./components/Interviews/VideoCall";
import JobDetails from "./components/Job/JobDetails";
import Jobs from "./components/Job/Jobs";
import MyJobs from "./components/Job/MyJobs";
import PostJob from "./components/Job/PostJob";
import AboutUs from "./components/Layout/AboutUs";
import NotFound from "./components/NotFound/NotFound";
import AdminRoutes from "./protection/EmployeeRoute";


const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  const excludedRoutes = ["/login", "/register", "/video-call"];

  return (
    <>
      <BrowserRouter>
        {!excludedRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/video-call" element={<VideoCallPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="/account" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/gig/:id/applicants" element={<ViewApplicants />} />

          <Route path="/gigs/post" element={<CreateGig />} />
          <Route path="/gigs" element={<ViewGigs />} />
          <Route path="/gig/:id" element={<ApplyGig />} />


          {/* </Route> */}
          <Route element={<AdminRoutes />}>
            <Route path="/job/post" element={<PostJob />} />
            <Route path="/gig/:id/applicants" element={<GigApplicants />} />
          </Route>
        </Routes>

        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
