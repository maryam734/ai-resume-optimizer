# AI Resume Optimizer

> An AI-powered resume optimization platform that analyzes resumes against job descriptions, evaluates job compatibility, identifies skill and keyword gaps, and generates ATS-focused improvement recommendations.

**Live Demo:** https://ai-resume-optimizer-vyll.onrender.com

---

## Overview

AI Resume Optimizer is a full-stack web application designed to help candidates understand how well their resume matches a specific job description.

Instead of manually comparing a resume with a job description, the application automatically extracts resume content, analyzes important skills and keywords, calculates a compatibility score, and provides actionable recommendations for improvement.

The project combines **rule-based resume analysis** with **Google Gemini AI** to provide a more comprehensive evaluation.

---

## Features

### Resume Upload and Parsing

Upload your resume in supported document formats and automatically extract its text for analysis.

The application processes the uploaded resume and converts its contents into structured information that can be analyzed.

### Job Description Analysis

Paste a target job description and the application identifies important requirements such as:

- Required skills
- Preferred skills
- Technical keywords
- Relevant technologies
- Important job requirements

### Resume-Job Compatibility Score

The application calculates a compatibility score based on how closely the resume matches the target job description.

The scoring system uses weighted components:

```text
Required Skills   → 60%
Preferred Skills  → 20%
Keywords          → 10%
Experience        → 10%
The final score provides a quick overview of how closely the candidate's resume aligns with the target role.

### Skill Gap Detection
The application identifies:

- Skills already present in the resume
- Required skills that are missing
- Preferred skills that are missing
- Important keywords that could be added
This helps candidates understand exactly what is missing from their resume.

### AI Resume Analysis
Google Gemini AI is integrated into the application to provide intelligent resume feedback.

The AI analysis can provide:

- Resume strengths
- Resume weaknesses
- Improvement suggestions
- ATS optimization recommendations
- Missing skills and keywords
- Suggestions for better resume positioning

### ATS-Focused Recommendations
The system provides recommendations designed to improve resume visibility in Applicant Tracking Systems (ATS).

Examples include:

- Adding relevant technical keywords
- Improving skill alignment
- Strengthening project descriptions
- Improving resume wording
- Removing unnecessary information
- Making experience more relevant to the target role

### Detailed Analysis Dashboard
After analysis, the user receives a structured results page containing the resume evaluation, compatibility score, skill gaps, and recommendations.

### How It Works
The application follows the workflow below:

User Uploads Resume
        ↓
Resume Text Extraction
        ↓
Job Description Analysis
        ↓
Skill & Keyword Extraction
        ↓
Rule-Based Matching Engine
        ↓
Compatibility Score
        ↓
Skill Gap Detection
        ↓
Gemini AI Analysis
        ↓
Final Resume Recommendations

### System Architecture
                    ┌─────────────────────┐
                    │      Frontend       │
                    │    EJS + CSS + JS   │
                    └──────────┬──────────┘
                               │
                               ↓
                    ┌─────────────────────┐
                    │    Express Server   │
                    │      Node.js        │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             ↓                 ↓                 ↓
     ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
     │ Resume       │  │ Matching     │  │ Gemini AI    │
     │ Parser       │  │ Engine       │  │ Analyzer     │
     └──────────────┘  └──────────────┘  └──────────────┘
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ↓
                    ┌─────────────────────┐
                    │      MongoDB        │
                    └─────────────────────┘
### Technology Stack
## Frontend

Technology            Purpose                   

HTML5                 Application structure     
CSS3                  Styling and responsive UI 
JavaScript            Client-side functionality 
EJS                   Server-side templating    
EJS Mate              EJS layout management     

## Backend
Technology	          Purpose
Node.js	              JavaScript runtime
Express.js	          Backend framework

## Database
Technology	          Purpose
MongoDB	              Data storage
Mongoose	            MongoDB object modeling

## AI
Technology	          Purpose
Google Gemini         API	AI-powered resume analysis
@google/genai	        Gemini API integration

## Resume Processing
Technology	          Purpose
Multer	              File upload handling
PDF Parser	          PDF text extraction
Mammoth	              DOCX text extraction

## Supporting Tools
Technology	          Purpose
dotenv	              Environment variable management
Express               Session	Session management
Connect Mongo	        MongoDB-backed session storage
Nodemon	              Development server auto-restart

### Project Structure
ai-resume-optimizer/
│
├── models/
│   └── ...
│
├── routes/
│   └── ...
│
├── utils/
│   ├── resumeParser.js
│   ├── resumeanalyser.js
│   ├── jdanalyser.js
│   ├── matchEngine.js
│   └── aiResumeAnalyzer.js
│
├── views/
│   ├── pages/
│   │   ├── home.ejs
│   │   ├── optimize.ejs
│   │   └── results.ejs
│   │
│   └── layouts/
│       └── boilerplate.ejs
│
├── public/
│   ├── css/
│   └── js/
│
├── uploads/
│
├── app.js
├── package.json
├── package-lock.json
├── .env
└── README.md

### Installation and Setup
## 1. Clone the Repository
git clone YOUR_GITHUB_REPOSITORY_URL
Navigate to the project directory:
cd ai-resume-optimizer

## 2. Install Dependencies
npm install

## 3. Configure Environment Variables
Create a .env file in the project root:

MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
SESSION_SECRET=your_session_secret
Replace the placeholder values with your actual configuration.

## 4. Start the Application
For development:
npm run dev
or
nodemon app.js
For normal execution:
node app.js
The application will run locally at:
http://localhost:8080

### Environment Variables

The application uses environment variables to securely manage sensitive configuration.

Variable    	   Description
MONGO_URI	       MongoDB connection string
GEMINI_API_KEY	 Google Gemini API key
SESSION_SECRET	 Secret used for session management

Never commit your .env file or expose API keys publicly.

### Scoring System

The compatibility score is calculated using weighted components:

Component	          Weight
Required Skills	    60%
Preferred Skills	  20%
Keywords	          10%
Experience	        10%
Total	              100%

### Required Skills

These are the skills explicitly required for the target role.

Because required skills are the most important part of a job description, they contribute the highest weight to the final score.

### Preferred Skills
These are additional skills that strengthen a candidate's profile but may not be mandatory.

### Keywords
The system compares important job-description keywords with the content of the resume.

### Experience
Relevant experience and background contribute to the overall compatibility evaluation.
### AI Analysis
The application uses Google's Gemini API to provide an additional layer of intelligent resume analysis.

The rule-based engine first performs deterministic analysis such as skill and keyword matching.

Gemini AI then provides qualitative feedback based on the resume and target job description.

This combination allows the application to provide both:

Rule-Based Analysis
        +
AI-Powered Analysis
        ↓
Comprehensive Resume Feedback
### Why This Project?
Many candidates submit the same resume to multiple companies without checking whether it actually matches the target job.

AI Resume Optimizer addresses this problem by helping candidates:

- Understand resume-job compatibility
- Identify missing skills
- Discover missing keywords
- Improve ATS compatibility
- Understand resume strengths and weaknesses
- Receive personalized AI-powered recommendations
### Future Improvements
Potential future enhancements include:

- AI-based resume rewriting
- AI-generated resume bullet points
- Multiple resume comparison
- Resume version management
- Job recommendations based on resume
- Resume keyword optimization
- Cover letter generation
- Resume section scoring
- Authentication and user profiles
- Resume history and analytics
- More advanced ATS simulation
### Security Considerations
The application follows basic security practices such as:

- Keeping API credentials in environment variables
- Using .gitignore for sensitive files
- Avoiding hard-coded API keys
- Using server-side processing for sensitive operations

### Learning Outcomes
This project strengthened practical knowledge of:

- Full-stack web development
- Node.js and Express.js
- MongoDB and Mongoose
- RESTful backend architecture
- File uploading and document processing
- PDF and DOCX text extraction
- Natural language processing concepts
- Rule-based matching systems
- AI API integration
- Google Gemini API
- Environment variable management
- Deployment using Render
- Git and GitHub
- Building production-oriented web applications

### Author
### Maryam Naim
B.Tech Computer Science and Engineering
