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
        <Routes>
          <Route path="/login" element={<Login />} />

        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
