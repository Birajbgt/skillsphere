import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
  updateApplicationStatus
  // employerUpdateInterview,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Job Seeker Routes
router.post("/post", isAuthenticated, postApplication);

router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);
router.delete("/delete/:id", jobseekerDeleteApplication);

// Employer Routes
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.put("/update-status/:id", updateApplicationStatus);


export default router;
