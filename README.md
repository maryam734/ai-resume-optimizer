# AI Resume Optimizer

> A full-stack AI-powered resume optimization platform that analyzes resumes against job descriptions, evaluates job compatibility, identifies skill and keyword gaps, and generates ATS-focused improvement recommendations.

**Live Demo:** https://ai-resume-optimizer-vyll.onrender.com/  
**GitHub:** https://github.com/maryam734/ai-resume-optimizer

---

## Overview

AI Resume Optimizer is a full-stack web application designed to help candidates improve their resumes for specific job opportunities.

The application combines rule-based resume analysis, job-description parsing, weighted matching algorithms, and Google Gemini-powered AI analysis to provide practical and personalized resume feedback.

Users can upload a PDF or DOCX resume, provide a target job description, and receive:

- Resume structure analysis
- Job-description analysis
- Resume-to-job match score
- Matched and missing skills
- Matched and missing keywords
- ATS-focused improvement suggestions
- AI-generated resume recommendations
- Improved professional summary
- Bullet-point improvement suggestions
- AI-generated optimized resume

The project was designed to go beyond a basic resume parser by combining traditional backend processing with AI-powered analysis and an end-to-end production deployment.

---

# Key Features

## 1. Resume Upload and Text Extraction

The application accepts:

- PDF resumes
- DOCX resumes

Uploaded resumes are processed on the backend and converted into raw text before analysis.

### Highlights

- PDF text extraction using `pdf-parse`
- DOCX text extraction using `Mammoth`
- File type validation
- 5 MB upload limit
- Temporary uploaded files are removed after processing

---

## 2. Structured Resume Analysis

The extracted resume text is analyzed and converted into a structured representation.

The analyzer identifies important resume information including:

- Candidate name
- Email
- Phone number
- LinkedIn profile
- GitHub profile
- Professional summary
- Skills
- Education
- Experience
- Projects
- Certifications
- Achievements

The parser also supports common alternative section names such as:

- Summary
- Objective
- Professional Summary
- Technical Skills
- Work Experience
- Internships
- Academic Background
- Personal Projects
- Certifications
- Achievements

This structured representation makes the resume easier to compare against a target job description.

---

## 3. Job Description Analysis

The application analyzes the target job description to identify relevant hiring requirements.

The Job Description Analyzer extracts:

- Required skills
- Preferred skills
- Important keywords
- Responsibilities
- Experience requirements
- Education requirements

The system recognizes commonly used technical technologies and concepts such as:

- Java
- C++
- Python
- JavaScript
- TypeScript
- React
- Node.js
- Express.js
- MongoDB
- SQL
- REST APIs
- Git
- GitHub
- AWS
- Docker
- Data Structures
- Algorithms
- OOP
- Machine Learning
- TensorFlow
- PyTorch

---

## 4. Resume-to-Job Matching Engine

The matching engine compares the structured resume information with the requirements extracted from the job description.

The system evaluates:

### Required Skills

Identifies skills that are present or missing from the resume.

### Preferred Skills

Checks how many preferred technologies and competencies are represented in the resume.

### Keywords

Measures keyword overlap between the resume and the target job description.

### Skill Aliases

The matching system supports common technology aliases.

Examples:

- JavaScript → JS
- Node.js → Node
- Express.js → Express
- MongoDB → Mongo
- Data Structures → DSA
- OOP → Object-Oriented Programming
- CI/CD → Continuous Integration / Continuous Deployment

This helps make matching more robust than simple exact-string comparison.

---

## 5. Job Match Score

The application produces an overall resume-to-job compatibility score from 0–100.

The scoring system uses weighted components:

```text
Required Skills   → 60%
Preferred Skills  → 15%
Keywords          → 25%
The final score is classified into:

Score	Match Category
85–100	Excellent Match
70–84	Strong Match
50–69	Moderate Match
Below 50	Low Match

The results also include a score breakdown for each matching component.
6. Skill Gap Detection

The system identifies:

Matched skills
Missing skills
Matched preferred skills
Missing keywords

The application can then generate suggestions based on the detected gaps.

Recommendations are designed to remain truthful and should only encourage candidates to mention skills they genuinely possess.
7. AI-Powered Resume Analysis

The application integrates the Google Gemini API for deeper resume analysis.

The AI receives:

Extracted resume text
Target job description
Rule-based match results

Gemini then provides:

Overall resume assessment
Improved professional summary
Resume improvement suggestions
Bullet-point improvements
Keyword recommendations

The AI prompt explicitly instructs the model not to invent:
Skills
Experience
Projects
Certifications
Achievements
Technologies
Quantitative results

This keeps the optimization focused on improving existing content rather than fabricating candidate information.
8. AI Resume Optimization

The platform can generate a rewritten, ATS-focused version of the candidate's resume.

The optimizer is designed specifically for fresher and early-career resumes.

Optimization principles
Target one page whenever reasonably possible
Remove unnecessary repetition
Improve grammar and clarity
Use concise action-oriented bullets
Preserve factual information
Prioritize job relevance
Avoid fabricated achievements
Avoid unsupported technologies
Use standard ATS-friendly section names

The generated resume includes structured sections such as:
Summary
Skills
Education
Experience
Projects
Certifications
Achievements
9. ATS-Focused Recommendations

The AI and rule-based analysis work together to improve resume relevance for Applicant Tracking Systems.

The platform focuses on:

Keyword coverage
Skill relevance
Clear section structure
Professional wording
Concise bullet points
Job-specific terminology
Measurable achievements where already supported by the original resume
Technology Stack
Frontend
HTML5
CSS3
JavaScript
EJS
Backend
Node.js
Express.js
Database
MongoDB
Mongoose
MongoDB Atlas
Artificial Intelligence
Google Gemini API
@google/genai
Resume Processing
pdf-parse
Mammoth
Multer
Templating
EJS
EJS-Mate
Development Tools
Git
GitHub
npm
VS Code
Deployment
Render
MongoDB Atlas
Project Architecture

The application follows a modular backend architecture where resume processing, job analysis, matching, AI analysis, and resume generation are separated into dedicated utilities.

ai-resume-optimizer/
│
├── public/
│   └── css/
│       └── style.css
│
├── utils/
│   ├── resumeParser.js
│   ├── resumeanalyser.js
│   ├── jdanalyser.js
│   ├── matchEngine.js
│   ├── aiResumeAnalyzer.js
│   └── optimizedResumeGenerator.js
│
├── views/
│   ├── layouts/
│   │   └── pages/
│   │       └── home.ejs
│   │
│   └── pages/
│       ├── home.ejs
│       ├── optimize.ejs
│       ├── results.ejs
│       └── optimizedResume.ejs
│
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
Request Flow
User
  │
  ▼
Resume Upload + Job Description
  │
  ▼
Express Server
  │
  ├──────────────► Resume Parser
  │                    │
  │                    ▼
  │              Structured Resume Data
  │
  ├──────────────► Job Description Analyzer
  │                    │
  │                    ▼
  │              Structured JD Data
  │
  ▼
Matching Engine
  │
  ├── Matched Skills
  ├── Missing Skills
  ├── Matched Keywords
  ├── Missing Keywords
  └── Match Score
  │
  ▼
Google Gemini API
  │
  ├── AI Resume Analysis
  ├── Summary Improvement
  ├── Bullet Improvements
  └── Keyword Recommendations
  │
  ▼
AI Architecture

The AI workflow is handled on the server side.

Resume + Job Description
          │
          ▼
   Rule-Based Analysis
          │
          ▼
      Match Engine
          │
          ▼
     Match Results
          │
          ▼
    Google Gemini API
          │
          ▼
   AI Resume Analysis
          │
          ▼
 AI-Generated Recommendations
          │
          ▼
   Optimized Resume

The Gemini API key is accessed through environment variables rather than exposed in client-side code.

Environment Variables

Create a .env file in the project root.

MONGO_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key

Never commit .env to GitHub.

The project .gitignore excludes:

.env
node_modules/
uploads/
Installation and Setup
1. Clone the Repository
git clone https://github.com/maryam734/ai-resume-optimizer.git
cd ai-resume-optimizer
2. Install Dependencies
npm install
3. Configure Environment Variables

Create a .env file:

MONGO_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
4. Start the Application

For development:

npm run dev

For production-style local execution:

npm start

The application runs using the port provided by the environment or defaults to:

http://localhost:3000
Database

The application uses MongoDB through Mongoose.

MongoDB is primarily used to establish the application's production database connection.

For deployment, MongoDB Atlas provides the cloud-hosted database connection.

Application
     │
     ▼
  Mongoose
     │
     ▼
MongoDB Atlas
Important Backend Components
Resume Parser

resumeParser.js

Responsible for:

Reading uploaded files
Extracting PDF text
Extracting DOCX text
Validating supported file types
Returning normalized resume text
Resume Analyzer

resumeanalyser.js

Responsible for:

Detecting resume sections
Extracting contact information
Structuring resume content
Identifying major professional sections
Job Description Analyzer

jdanalyser.js

Responsible for:

Detecting technical skills
Extracting important keywords
Identifying responsibilities
Detecting education requirements
Detecting experience requirements
Match Engine

matchEngine.js

Responsible for:

Skill comparison
Skill alias matching
Keyword comparison
Match score calculation
Match classification
Resume improvement suggestions
AI Resume Analyzer

aiResumeAnalyzer.js

Responsible for:

Gemini API communication
AI-based resume evaluation
Summary improvement
Bullet-point recommendations
Keyword recommendations
JSON response validation
Retry handling for temporary AI service errors
Optimized Resume Generator

optimizedResumeGenerator.js

Responsible for:

Generating ATS-focused resume content
Preserving original candidate information
Improving wording and structure
Producing concise fresher-friendly resume output
Problems Solved
Traditional Resume Review
Problem

Candidates often have difficulty identifying weaknesses in their resumes when applying to different job descriptions.

Solution

The application automatically compares the resume against a target job description and provides structured feedback.

Generic Resume Content
Problem

A single resume may not be equally relevant to every job opportunity.

Solution

The system identifies job-specific skills and keywords and evaluates their presence in the candidate's resume.

Manual Resume Optimization
Problem

Rewriting a resume for every job application can be time-consuming.

Solution

AI-assisted analysis and optimization provide targeted recommendations and can generate an improved ATS-focused resume.

Keyword and Skill Gaps
Problem

Candidates may not know which skills or keywords are missing from their resume.

Solution

The matching engine explicitly reports matched and missing skills and keywords.

Unreliable AI Suggestions
Problem

AI systems can sometimes invent information.

Solution

The AI prompts explicitly instruct Gemini to preserve factual information and avoid inventing skills, experience, projects, achievements, or technologies.

Testing

The application was tested through:

Local development testing
Resume upload testing
PDF parsing testing
DOCX parsing testing
Resume section extraction testing
Job description analysis testing
Skill matching testing
Keyword matching testing
Match score testing
Gemini API testing
AI recommendation testing
Optimized resume generation testing
MongoDB Atlas connectivity testing
Render deployment testing
Production smoke testing
Security Considerations

The project follows several basic security practices:

API keys stored in environment variables
.env excluded from Git
Uploaded files excluded from Git
node_modules excluded from Git
Gemini API handled server-side
Uploaded resumes are processed as temporary files
Temporary uploaded files are removed after processing
File type validation for uploads
File size restrictions
AI prompts prohibit fabricated candidate information
Deployment

The production deployment uses:

GitHub
   │
   ▼
Render
   │
   ├── Node.js / Express Application
   │
   ▼
MongoDB Atlas
Production Services
GitHub — Source control
Render — Application hosting
MongoDB Atlas — Cloud database
Google Gemini — AI-powered analysis and optimization
Live Application

https://ai-resume-optimizer-vyll.onrender.com/

What I Learned

Building AI Resume Optimizer helped strengthen my understanding of:

Full-stack application architecture
Node.js and Express.js
Server-side EJS rendering
File upload handling
PDF and DOCX text extraction
Resume parsing
Natural-language job description processing
Rule-based matching algorithms
Weighted scoring systems
Skill alias matching
AI API integration
Prompt engineering
Structured AI output validation
ATS-oriented resume optimization
MongoDB and Mongoose
MongoDB Atlas
Environment variable management
Git and GitHub workflows
Render deployment
Production debugging
Future Improvements

Possible future extensions include:

Semantic resume-to-job matching using embeddings
More advanced ATS scoring
Support for additional resume formats
Resume keyword heatmaps
Job recommendation based on resume profile
Multiple resume templates
Resume comparison across multiple job descriptions
Authentication and personalized resume history
Resume version management
Downloadable PDF/DOCX optimized resumes
Advanced AI-powered career recommendations
Analytics for frequently missing skills across job descriptions
Why This Project?

AI Resume Optimizer was built to explore how traditional resume-processing techniques can be combined with modern AI systems to solve a practical career-oriented problem.

Rather than implementing only a resume parser, the project combines:

Full-Stack Development + Algorithms + AI + NLP-Style Text Processing + Database + Deployment

into a single production-style application.

The project demonstrates how rule-based systems and generative AI can complement each other:

Rule-Based Analysis
        +
Job Matching Algorithm
        +
Generative AI
        =
Practical Resume Optimization
Author
Maryam Naim

B.Tech — Computer Science & Engineering

Project Links

Live Demo:
https://ai-resume-optimizer-vyll.onrender.com/

GitHub Repository:
https://github.com/maryam734/ai-resume-optimizer


