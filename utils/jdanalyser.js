function analyseJobDescription(jobDescription) {
    if (!jobDescription || typeof jobDescription !== "string") {
        throw new Error("Job description is required.");
    }

    const text = jobDescription.trim();

    const result = {
        requiredSkills: [],
        preferredSkills: [],
        keywords: [],
        responsibilities: [],
        experience: "",
        education: "",
        rawText: text
    };

    const lines = text
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0);

    // Common technical skills we want to detect
    const knownSkills = [
        "Java",
        "C++",
        "Python",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "React",
        "Angular",
        "Vue",
        "Node.js",
        "Express.js",
        "Spring Boot",
        "MongoDB",
        "MySQL",
        "SQL",
        "PostgreSQL",
        "REST APIs",
        "RESTful APIs",
        "Git",
        "GitHub",
        "AWS",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "Data Structures",
        "Algorithms",
        "Data Structures and Algorithms",
        "OOP",
        "Object-Oriented Programming",
        "DBMS",
        "Machine Learning",
        "TensorFlow",
        "PyTorch",
        "Flutter"
    ];

    const lowerText = text.toLowerCase();

    // Detect skills
    for (const skill of knownSkills) {
        if (lowerText.includes(skill.toLowerCase())) {
            if (
                skill.toLowerCase().includes("data structures and algorithms") ||
                skill.toLowerCase().includes("object-oriented programming")
            ) {
                result.requiredSkills.push(skill);
            } else if (
                lowerText.includes("preferred skills") &&
                text.toLowerCase().indexOf(skill.toLowerCase()) >
                    text.toLowerCase().indexOf("preferred skills")
            ) {
                result.preferredSkills.push(skill);
            } else {
                result.requiredSkills.push(skill);
            }
        }
    }

    // Remove duplicates
    result.requiredSkills = [...new Set(result.requiredSkills)];
    result.preferredSkills = [...new Set(result.preferredSkills)];

    // Detect important keywords
    const keywordPatterns = [
        "scalable",
        "problem-solving",
        "problem solving",
        "software development",
        "web applications",
        "backend development",
        "frontend development",
        "REST API",
        "RESTful API",
        "database",
        "code review",
        "debugging",
        "testing",
        "cloud",
        "communication",
        "teamwork",
        "analytical skills"
    ];

    for (const keyword of keywordPatterns) {
        if (lowerText.includes(keyword.toLowerCase())) {
            result.keywords.push(keyword);
        }
    }

    result.keywords = [...new Set(result.keywords)];

    // Detect experience information
    const experienceMatch = text.match(
        /(?:0\s*[-–]\s*2|1\s*[-–]\s*3|2\s*[-–]\s*4|\d+\+?)\s*(?:years?|yrs?)(?:\s+of)?\s+experience/i
    );

    if (experienceMatch) {
        result.experience = experienceMatch[0];
    }

    // Detect education requirements
    const educationPatterns = [
        "bachelor's degree",
        "bachelor degree",
        "b.tech",
        "btech",
        "computer science",
        "information technology",
        "related field"
    ];

    const educationFound = [];

    for (const educationItem of educationPatterns) {
        if (lowerText.includes(educationItem.toLowerCase())) {
            educationFound.push(educationItem);
        }
    }

    result.education = [...new Set(educationFound)].join(", ");

    // Extract responsibility section
    let currentSection = "";

    for (const line of lines) {
        const normalized = line
            .toLowerCase()
            .replace(/[:\-–—]+$/, "")
            .trim();

        if (
            normalized === "responsibilities" ||
            normalized === "roles and responsibilities" ||
            normalized === "what you'll do" ||
            normalized === "what you will do"
        ) {
            currentSection = "responsibilities";
            continue;
        }

        if (
            normalized === "required skills" ||
            normalized === "requirements" ||
            normalized === "qualifications"
        ) {
            currentSection = "required";
            continue;
        }

        if (
            normalized === "preferred skills" ||
            normalized === "preferred qualifications"
        ) {
            currentSection = "preferred";
            continue;
        }

        if (
            normalized === "education"
        ) {
            currentSection = "education";
            continue;
        }

        if (line.startsWith("-") || line.startsWith("•")) {
            const cleanLine = line
                .replace(/^[-•]\s*/, "")
                .trim();

            if (currentSection === "responsibilities") {
                result.responsibilities.push(cleanLine);
            }
        }
    }

    return result;
}

module.exports = analyseJobDescription;