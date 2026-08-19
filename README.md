# AI Resume Optimizer

> A full-stack AI-powered resume optimization platform that analyzes resumes against job descriptions, evaluates job compatibility, identifies skill and keyword gaps, and generates ATS-focused improvement recommendations.

**Live Demo:** [https://ai-resume-optimizer-vyll.onrender.com/](https://ai-resume-optimizer-vyll.onrender.com/)  
**GitHub:** [https://github.com/maryam734/ai-resume-optimizer](https://github.com/maryam734/ai-resume-optimizer)

---

## Overview

AI Resume Optimizer is a full-stack web application designed to help candidates improve their resumes for specific job opportunities.

The application combines **rule-based resume analysis, job-description parsing, weighted matching algorithms, and Google Gemini-powered AI analysis** to provide practical and personalized resume feedback.

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

The application produces an overall resume-to-job compatibility score from **0–100**.

The scoring system uses weighted components:

```text
Required Skills   → 60%
Preferred Skills  → 15%
Keywords          → 25%
