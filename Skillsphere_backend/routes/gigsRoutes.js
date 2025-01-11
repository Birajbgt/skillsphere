import express from "express";
import {
    applyToGig,
    createGig,
    getAllGigs,
    getGigApplicants,
    getGigDetails,
} from "../controllers/gigsController.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Routes
router.post("/create", isAuthenticated, authorizeRoles("Employer"), createGig); // Employer creates a gig
router.get("/all", getAllGigs); // Anyone can view gigs
router.post("/apply/:id", isAuthenticated, authorizeRoles("Job Seeker"), applyToGig); // Freelancer applies to a gig
router.get("/applicants/:id", isAuthenticated, authorizeRoles("Employer"), getGigApplicants);
router.get("/:id", isAuthenticated, getGigDetails);


export default router;
