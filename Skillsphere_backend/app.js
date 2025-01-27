import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import multiparty from 'multiparty';
import path from "path";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import applicationRouter from "./routes/applicationRoutes.js";
import gigRouter from "./routes/gigsRoutes.js";
import interviewRouter from "./routes/interviewRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(
  cors({
    origin: true,
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);


// Serve static files for uploads
const __dirname = path.resolve(); // Ensure proper directory resolution
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Example route using multiparty
app.post("/upload", (req, res) => {
  const form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to parse form data", details: err });
    }
    res.status(200).json({ fields, files });
  });
});

app.use("/api/v1/gig", gigRouter);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/interviews", interviewRouter);
dbConnection();

app.use(errorMiddleware);
export default app;
