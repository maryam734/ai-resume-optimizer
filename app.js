const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

require("dotenv").config();

// Utilities
const extractResumeText = require("./utils/resumeParser");
const analyseResumeText = require("./utils/resumeanalyser");
const analyseJobDescription = require("./utils/jdanalyser");
const calculateMatch = require("./utils/matchEngine");
const generateAIResumeAnalysis = require("./utils/aiResumeAnalyzer");
const generateOptimizedResume = require("./utils/optimizedResumeGenerator");

const app = express();
const PORT = process.env.PORT || 3000;

// =========================
// MIDDLEWARE
// =========================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// =========================
// RESUME UPLOAD CONFIG
// =========================

const upload = multer({
    dest: "uploads/",

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF and DOCX files are allowed."));
        }
    }
});


// =========================
// VIEW ENGINE
// =========================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// =========================
// DATABASE
// =========================

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });


// =========================
// HOME ROUTE
// =========================

app.get("/", (req, res) => {
    res.render("pages/home");
});


// =========================
// OPTIMIZE PAGE
// =========================

app.get("/optimize", (req, res) => {
    res.render("pages/optimize");
});


// =========================
// RESUME ANALYSIS ROUTE
// =========================

app.post(
    "/optimize/analyze",
    upload.single("resume"),
    async (req, res) => {

        try {

            // =========================
            // CHECK RESUME
            // =========================

            if (!req.file) {
                return res.status(400).send(
                    "Please upload a resume."
                );
            }


            // =========================
            // GET JOB DESCRIPTION
            // =========================

            const jobDescription =
                req.body.jobDescription;


            // =========================
            // CHECK JOB DESCRIPTION
            // =========================

            if (
                !jobDescription ||
                !jobDescription.trim()
            ) {

                if (fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path);
                }

                return res
                    .status(400)
                    .send(
                        "Please provide a job description."
                    );
            }


            // =========================
            // JOB DESCRIPTION ANALYSIS
            // =========================

            const jobData =
                analyseJobDescription(
                    jobDescription
                );


            console.log(
                "\n========== JOB DESCRIPTION DATA =========="
            );

            console.log(jobData);


            // =========================
            // RESUME TEXT EXTRACTION
            // =========================

            console.log(
                "\nResume uploaded:",
                req.file.originalname
            );

            console.log(
                "Extracting resume text..."
            );


            const resumeText =
                await extractResumeText(
                    req.file.path,
                    req.file.mimetype
                );


            console.log(
                "Resume text extracted successfully."
            );

            console.log(
                "Characters extracted:",
                resumeText.length
            );


            // =========================
            // RESUME ANALYSIS
            // =========================

            const resumeData =
                analyseResumeText(
                    resumeText
                );


            console.log(
                "\n========== RESUME DATA =========="
            );

            console.log(resumeData);


            // =========================
            // MATCH ANALYSIS
            // =========================

            const matchData =
                calculateMatch(
                    resumeData,
                    jobData
                );


            console.log(
                "\n========== JOB MATCH ANALYSIS =========="
            );

            console.log(matchData);


            // =========================
            // AI ANALYSIS
            // =========================

            let aiData = {
                available: false,
                overallAdvice: "",
                summaryImprovement: "",
                suggestions: [],
                bulletImprovements: [],
                keywordAdvice: []
            };


            try {

                console.log(
                    "\n========== AI RESUME ANALYSIS =========="
                );

                console.log(
                    "Sending resume to Gemini..."
                );


                const generatedAIData =
                    await generateAIResumeAnalysis(
                        resumeText,
                        jobDescription,
                        matchData
                    );


                aiData = {
                    available: true,
                    ...generatedAIData
                };


                console.log(
                    "AI resume analysis completed successfully."
                );

            } catch (aiError) {

                console.error(
                    "AI analysis unavailable:",
                    aiError.message
                );

                console.log(
                    "Continuing with rule-based analysis."
                );
            }


            // =========================
            // DELETE TEMPORARY FILE
            // =========================

            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }


            // =========================
            // RESULTS PAGE
            // =========================

            res.render("pages/results", {

                fileName:
                    req.file.originalname,

                resumeText,

                resumeData,

                jobData,

                matchData,

                aiData
            });

        } catch (error) {

            console.error(
                "\nResume processing error:",
                error
            );


            // =========================
            // DELETE UPLOADED FILE
            // =========================

            if (
                req.file &&
                fs.existsSync(req.file.path)
            ) {
                fs.unlinkSync(req.file.path);
            }


            // =========================
            // ERROR RESPONSE
            // =========================

            res
                .status(500)
                .send(
                    "Failed to process the resume: " +
                    error.message
                );
        }
    }
);


// =========================
// AI OPTIMIZED RESUME ROUTE
// =========================

app.post(
    "/optimize/generate",
    async (req, res) => {

        try {

            const {
                resumeText,
                jobDescription,
                resumeData
            } = req.body;


            // =========================
            // VALIDATION
            // =========================

            if (!resumeText) {
                return res
                    .status(400)
                    .send(
                        "Resume text is required."
                    );
            }

            if (!jobDescription) {
                return res
                    .status(400)
                    .send(
                        "Job description is required."
                    );
            }


            console.log(
                "\n========== AI OPTIMIZED RESUME =========="
            );

            console.log(
                "Generating optimized resume..."
            );


            // =========================
            // GENERATE OPTIMIZED RESUME
            // =========================

            const optimizedResume =
                await generateOptimizedResume(
                    resumeData,
                    resumeText,
                    jobDescription
                );


            console.log(
                "Optimized resume generated successfully."
            );


            // =========================
            // OPTIMIZED RESUME PAGE
            // =========================

            res.render(
                "pages/optimizedResume",
                {
                    optimizedResume,
                    jobDescription
                }
            );

        } catch (error) {

            console.error(
                "\nOptimized resume error:",
                error
            );


            res
                .status(500)
                .send(
                    "Failed to generate optimized resume: " +
                    error.message
                );
        }
    }
);


// =========================
// SERVER
// =========================

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});