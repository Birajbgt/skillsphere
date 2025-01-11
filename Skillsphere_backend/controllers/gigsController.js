import { fileURLToPath } from "url";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import Gig from "../models/gigsSchema.js";

import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new Gig
export const createGig = catchAsyncErrors(async (req, res, next) => {
    const { title, description, budget, deadline } = req.body;

    if (!title || !description || !budget || !deadline) {
        return next(new ErrorHandler("Please provide all required fields.", 400));
    }

    let imageUrl;

    // Handle image upload
    if (req.files && req.files.image) {
        const image = req.files.image;
        const imageName = `gig_${Date.now()}.${image.mimetype.split("/")[1]}`;
        const uploadPath = path.join(__dirname, "../uploads/gigs", imageName);

        // Save the image to the server
        image.mv(uploadPath, (err) => {
            if (err) {
                return next(new ErrorHandler("Image upload failed.", 500));
            }
        });

        imageUrl = `/uploads/gigs/${imageName}`;
    }

    const gig = await Gig.create({
        title,
        description,
        budget,
        deadline,
        postedBy: req.user.id,
        imageUrl,
    });

    res.status(201).json({
        success: true,
        message: "Gig created successfully",
        gig,
    });
});

// Get all Gigs
export const getAllGigs = catchAsyncErrors(async (req, res, next) => {
    const gigs = await Gig.find()
        .populate("postedBy", "name email") // Populating employer details
        .exec();

    res.status(200).json({
        success: true,
        gigs,
    });
});

// // Apply to a Gig
// export const applyToGig = catchAsyncErrors(async (req, res, next) => {
//     const { id } = req.params;
//     const { coverLetter } = req.body;

//     const gig = await Gig.findById(id);

//     if (!gig) {
//         return next(new ErrorHandler("Gig not found", 404));
//     }

//     // Check if already applied
//     const alreadyApplied = gig.applicants.some(
//         (applicant) => applicant.freelancer.toString() === req.user.id
//     );

//     if (alreadyApplied) {
//         return next(new ErrorHandler("You have already applied for this gig", 400));
//     }

//     // Add applicant to the gig
//     gig.applicants.push({
//         freelancer: req.user.id,
//         coverLetter,
//     });

//     await gig.save();

//     res.status(200).json({
//         success: true,
//         message: "Application submitted successfully",
//     });
// });

export const applyToGig = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const gig = await Gig.findById(id);

    if (!gig) {
        return next(new ErrorHandler("Gig not found", 404));
    }

    // Check if the freelancer has already applied
    const alreadyApplied = gig.applicants.some(
        (applicant) => applicant.freelancer.toString() === req.user.id
    );

    if (alreadyApplied) {
        return next(new ErrorHandler("You have already applied for this gig", 400));
    }

    let coverLetterFilePath;

    // Handle file upload
    if (req.files && req.files.coverLetter) {
        const file = req.files.coverLetter;
        const fileName = `coverLetter_${req.user.id}_${Date.now()}${path.extname(
            file.name
        )}`;
        const uploadPath = path.join(__dirname, "../uploads/coverLetters", fileName);

        // Save the file
        await file.mv(uploadPath, (err) => {
            if (err) {
                return next(new ErrorHandler("Failed to upload cover letter.", 500));
            }
        });

        coverLetterFilePath = `/uploads/coverLetters/${fileName}`;
    } else {
        return next(new ErrorHandler("Cover letter file is required.", 400));
    }

    // Add the application to the gig
    gig.applicants.push({
        freelancer: req.user.id,
        coverLetter: coverLetterFilePath, // Save file path
    });

    await gig.save();

    res.status(200).json({
        success: true,
        message: "Application submitted successfully",
    });
});
export const getGigApplicants = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const gig = await Gig.findById(id)
        .populate("applicants.freelancer", "name email")
        .exec();

    if (!gig) {
        return next(new ErrorHandler("Gig not found", 404));
    }

    // Ensure the logged-in employer is the one who posted the gig
    if (gig.postedBy.toString() !== req.user.id) {
        return next(new ErrorHandler("You are not authorized to view this gig's applicants.", 403));
    }

    res.status(200).json({
        success: true,
        applicants: gig.applicants,
    });
});
export const getGigDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const gig = await Gig.findById(id).populate("postedBy", "name email");

    if (!gig) {
        return next(new ErrorHandler("Gig not found", 404));
    }

    res.status(200).json({
        success: true,
        gig,
    });
});


