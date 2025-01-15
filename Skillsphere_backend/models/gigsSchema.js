import mongoose from "mongoose";

const gigSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    deadline: { type: Date, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String }, // Add field for storing image path or URL
    applicants: [
        {
            freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            coverLetter: { type: String, required: true },
            appliedAt: { type: Date, default: Date.now },
        },
    ],
});

export default mongoose.model("Gig", gigSchema);
