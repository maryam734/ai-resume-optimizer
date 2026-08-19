function analyseResumeText(resumeText) {

    if (!resumeText || typeof resumeText !== "string") {
        throw new Error("Resume text is required.");
    }

    const text = resumeText.trim();


    // ======================================================
    // RESUME SECTIONS
    // ======================================================

    const sections = {

        summary: "",
        skills: "",
        education: "",
        experience: "",
        projects: "",
        certifications: "",
        achievements: ""

    };


    // ======================================================
    // SECTION NAMES
    // ======================================================

    const sectionMap = {

        summary: [
            "summary",
            "objective",
            "profile",
            "professional summary"
        ],

        skills: [
            "skills",
            "technical skills",
            "technical competencies",
            "core skills",
            "technical expertise"
        ],

        education: [
            "education",
            "academic background",
            "qualifications",
            "academic qualifications"
        ],

        experience: [

            "experience",
            "work experience",
            "professional experience",
            "internship",
            "internships",
            "work history"

        ],

        projects: [

            "projects",
            "personal projects",
            "academic projects",
            "project experience"

        ],

        certifications: [

            "certifications",
            "certificates",
            "professional certifications"

        ],

        achievements: [

            "achievements",
            "accomplishments",
            "awards",
            "honors"

        ]

    };


    // ======================================================
    // PROCESS RESUME LINES
    // ======================================================

    const lines =
        text.split(/\r?\n/);

    let currentSection = null;


    for (const line of lines) {

        const cleanedLine =
            line.trim();


        if (!cleanedLine) {
            continue;
        }


        const normalizedLine =
            cleanedLine
                .toLowerCase()
                .replace(/[:\-–—]+$/, "")
                .trim();


        let matchedSection = null;


        for (
            const [section, possibleNames]
            of Object.entries(sectionMap)
        ) {

            if (
                possibleNames.includes(
                    normalizedLine
                )
            ) {

                matchedSection = section;

                break;
            }
        }


        if (matchedSection) {

            currentSection =
                matchedSection;

            continue;
        }


        if (currentSection) {

            sections[currentSection] +=
                cleanedLine + "\n";
        }

    }


    // ======================================================
    // EMAIL
    // ======================================================

    const emailMatch =
        text.match(
            /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
        );


    // ======================================================
    // PHONE
    // ======================================================

    const phoneMatch =
        text.match(
            /(?:\+91[\s-]?)?[6-9]\d{9}\b/
        );


    // ======================================================
    // LINKEDIN
    // ======================================================

    const linkedinMatch =
        text.match(
            /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+/i
        );


    // ======================================================
    // GITHUB
    // ======================================================

    const githubMatch =
        text.match(
            /(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_-]+/i
        );


    // ======================================================
    // DETECT NAME
    // ======================================================

    const firstMeaningfulLine =
        lines.find((line) => {

            const value =
                line.trim();


            if (!value) {
                return false;
            }


            if (
                emailMatch &&
                value.includes(emailMatch[0])
            ) {
                return false;
            }


            if (
                phoneMatch &&
                value.includes(phoneMatch[0])
            ) {
                return false;
            }


            if (
                /linkedin\.com|github\.com/i.test(
                    value
                )
            ) {
                return false;
            }


            return value.length > 2;
        });


    // ======================================================
    // RETURN STRUCTURED RESUME
    // ======================================================

    return {

        name:
            firstMeaningfulLine || "",

        email:
            emailMatch
                ? emailMatch[0]
                : "",

        phone:
            phoneMatch
                ? phoneMatch[0]
                : "",

        linkedin:
            linkedinMatch
                ? linkedinMatch[0]
                : "",

        github:
            githubMatch
                ? githubMatch[0]
                : "",


        sections: {

            summary:
                sections.summary.trim(),

            skills:
                sections.skills.trim(),

            education:
                sections.education.trim(),

            experience:
                sections.experience.trim(),

            projects:
                sections.projects.trim(),

            certifications:
                sections.certifications.trim(),

            achievements:
                sections.achievements.trim()

        },


        rawText:
            text

    };
}


module.exports =
    analyseResumeText;