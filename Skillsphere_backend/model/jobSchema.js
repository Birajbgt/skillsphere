import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide decription."],
  },
  requirement: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: [true, "Please provide a job type."],
  },
  experience: {
    type: String,
    required: [true, "Please provide a experience needed."],
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide an image."],
  },

  salary: {
    type: Number,
    required: [true, " Please provide salary"]
  },
  vacancy: {
    type: Number,
    required: [true, " Please provide vacancy"]
  },
  deadline: {
    type: Date,
    required: true,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
