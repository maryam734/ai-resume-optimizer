function normalise(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^\w\s+#.]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}


// ======================================================
// CHECK WHETHER A TERM EXISTS AS A COMPLETE TERM
// ======================================================

function containsTerm(text, term) {
    const normalizedText = normalise(text);
    const normalizedTerm = normalise(term);

    if (!normalizedText || !normalizedTerm) {
        return false;
    }

    const escapedTerm = normalizedTerm.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

    const pattern = new RegExp(
        `(^|\\s)${escapedTerm}(?=\\s|$)`,
        "i"
    );

    return pattern.test(normalizedText);
}


// ======================================================
// SKILL ALIASES
// ======================================================

function getSkillVariants(skill) {

    const normalizedSkill = normalise(skill);

    const aliases = {
        "javascript": [
            "javascript",
            "js"
        ],

        "typescript": [
            "typescript",
            "ts"
        ],

        "node.js": [
            "node.js",
            "node js",
            "node"
        ],

        "express.js": [
            "express.js",
            "express js",
            "express"
        ],

        "react": [
            "react",
            "react.js",
            "react js"
        ],

        "angular": [
            "angular"
        ],

        "vue": [
            "vue",
            "vue.js",
            "vue js"
        ],

        "mongodb": [
            "mongodb",
            "mongo db",
            "mongo"
        ],

        "mysql": [
            "mysql",
            "my sql"
        ],

        "postgresql": [
            "postgresql",
            "postgres"
        ],

        "rest apis": [
            "rest apis",
            "rest api",
            "restful apis",
            "restful api"
        ],

        "restful apis": [
            "restful apis",
            "restful api",
            "rest apis",
            "rest api"
        ],

        "data structures": [
            "data structures",
            "data structure",
            "dsa",
            "data structures and algorithms"
        ],

        "data structures and algorithms": [
            "data structures and algorithms",
            "data structures",
            "dsa",
            "algorithms"
        ],

        "object-oriented programming": [
            "object oriented programming",
            "object-oriented programming",
            "oop"
        ],

        "cicd": [
            "cicd",
            "ci cd",
            "continuous integration",
            "continuous deployment"
        ]
    };

    return aliases[normalizedSkill] || [normalizedSkill];
}


// ======================================================
// MATCH USING ALIASES
// ======================================================

function matchesWithAliases(text, value) {

    const variants = getSkillVariants(value);

    return variants.some((variant) =>
        containsTerm(text, variant)
    );
}


// ======================================================
// GENERATE RESUME IMPROVEMENT SUGGESTIONS
// ======================================================

function generateSuggestions(
    resumeData,
    jobData,
    matchData
) {

    const suggestions = [];

    const resumeText = resumeData.rawText || "";

    const missingSkills = matchData.missingSkills || [];
    const missingKeywords = matchData.missingKeywords || [];

    const sections = resumeData.sections || {};


    // --------------------------------------------------
    // Missing skills
    // --------------------------------------------------

    if (missingSkills.length > 0) {

        const skillPreview =
            missingSkills.slice(0, 5).join(", ");

        suggestions.push(
            `Consider adding relevant missing skills such as ${skillPreview} if you genuinely have experience with them.`
        );
    }


    // --------------------------------------------------
    // Missing keywords
    // --------------------------------------------------

    if (missingKeywords.length > 0) {

        const keywordPreview =
            missingKeywords.slice(0, 5).join(", ");

        suggestions.push(
            `Consider naturally incorporating important job-description keywords such as ${keywordPreview} into relevant resume sections when they accurately describe your experience.`
        );
    }


    // --------------------------------------------------
    // Summary section
    // --------------------------------------------------

    if (!sections.summary) {

        suggestions.push(
            "Add a concise professional summary that highlights your experience, strongest skills, and relevance to the target role."
        );
    }


    // --------------------------------------------------
    // Skills section
    // --------------------------------------------------

    if (!sections.skills) {

        suggestions.push(
            "Add a dedicated Skills section so recruiters and ATS systems can quickly identify your technical and professional skills."
        );
    }


    // --------------------------------------------------
    // Experience section
    // --------------------------------------------------

    if (!sections.experience) {

        suggestions.push(
            "Add relevant internship, work, or practical experience and describe your contributions using clear action-oriented bullet points."
        );
    }


    // --------------------------------------------------
    // Projects section
    // --------------------------------------------------

    if (!sections.projects) {

        suggestions.push(
            "Add relevant projects that demonstrate the technologies and responsibilities mentioned in the target job description."
        );
    }


    // --------------------------------------------------
    // Education section
    // --------------------------------------------------

    if (!sections.education) {

        suggestions.push(
            "Include an Education section with your degree, institution, and graduation details."
        );
    }


    // --------------------------------------------------
    // Check for measurable achievements
    // --------------------------------------------------

    const hasNumbers =
        /\b\d+(?:\.\d+)?\s*(?:%|percent|users?|projects?|months?|years?|x|k|m)?\b/i.test(
            resumeText
        );

    if (!hasNumbers) {

        suggestions.push(
            "Add measurable results to your project or experience bullets, such as performance improvements, user counts, accuracy, time saved, or other concrete outcomes."
        );
    }


    // --------------------------------------------------
    // Check for GitHub / LinkedIn
    // --------------------------------------------------

    if (!resumeData.github) {

        suggestions.push(
            "Consider adding your GitHub profile if it contains relevant projects or technical work."
        );
    }


    if (!resumeData.linkedin) {

        suggestions.push(
            "Consider adding your LinkedIn profile to make it easier for recruiters to review your professional background."
        );
    }


    // --------------------------------------------------
    // Check keyword coverage
    // --------------------------------------------------

    if (
        jobData.keywords &&
        jobData.keywords.length > 0 &&
        matchData.matchedKeywords.length === 0
    ) {

        suggestions.push(
            "Your resume currently has very low keyword overlap with the job description. Review the JD and reflect relevant terminology in truthful, experience-based ways."
        );
    }


    // --------------------------------------------------
    // Keep suggestions concise
    // --------------------------------------------------

    return [...new Set(suggestions)].slice(0, 8);
}


// ======================================================
// MAIN MATCH FUNCTION
// ======================================================

function calculateMatch(resumeData, jobData) {

    const resumeText = resumeData.rawText || "";

    const resumeSkillsText =
        resumeData.sections?.skills || "";

    const requiredSkills =
        jobData.requiredSkills || [];

    const preferredSkills =
        jobData.preferredSkills || [];

    const jobKeywords =
        jobData.keywords || [];


    // ==================================================
    // REQUIRED SKILLS
    // ==================================================

    const matchedSkills = [];
    const missingSkills = [];

    for (const skill of requiredSkills) {

        const found =
            matchesWithAliases(resumeSkillsText, skill) ||
            matchesWithAliases(resumeText, skill);

        if (found) {

            matchedSkills.push(skill);

        } else {

            missingSkills.push(skill);
        }
    }


    // ==================================================
    // PREFERRED SKILLS
    // ==================================================

    const matchedPreferredSkills = [];

    for (const skill of preferredSkills) {

        const found =
            matchesWithAliases(resumeSkillsText, skill) ||
            matchesWithAliases(resumeText, skill);

        if (found) {

            matchedPreferredSkills.push(skill);
        }
    }


    // ==================================================
    // KEYWORDS
    // ==================================================

    const matchedKeywords = [];
    const missingKeywords = [];

    for (const keyword of jobKeywords) {

        if (containsTerm(resumeText, keyword)) {

            matchedKeywords.push(keyword);

        } else {

            missingKeywords.push(keyword);
        }
    }


    // ==================================================
    // SCORE CALCULATION
    // ==================================================

    const requiredSkillScore =
        requiredSkills.length > 0
            ? (matchedSkills.length / requiredSkills.length) * 100
            : 100;


    const preferredSkillScore =
        preferredSkills.length > 0
            ? (matchedPreferredSkills.length / preferredSkills.length) * 100
            : 100;


    const keywordScore =
        jobKeywords.length > 0
            ? (matchedKeywords.length / jobKeywords.length) * 100
            : 100;


    /*
        Weighted scoring:

        Required Skills → 60%
        Preferred Skills → 15%
        Keywords → 25%
    */

    const matchScore = Math.round(
        requiredSkillScore * 0.60 +
        preferredSkillScore * 0.15 +
        keywordScore * 0.25
    );


    // ==================================================
    // MATCH CATEGORY
    // ==================================================

    let category;

    if (matchScore >= 85) {

        category = "Excellent Match";

    } else if (matchScore >= 70) {

        category = "Strong Match";

    } else if (matchScore >= 50) {

        category = "Moderate Match";

    } else {

        category = "Low Match";
    }


    // ==================================================
    // CREATE TEMPORARY MATCH OBJECT
    // ==================================================

    const matchResult = {

        matchScore,

        category,

        matchedSkills,

        missingSkills,

        matchedPreferredSkills,

        matchedKeywords,

        missingKeywords,

        breakdown: {

            requiredSkillScore:
                Math.round(requiredSkillScore),

            preferredSkillScore:
                Math.round(preferredSkillScore),

            keywordScore:
                Math.round(keywordScore)
        }
    };


    // ==================================================
    // GENERATE SUGGESTIONS
    // ==================================================

    const suggestions =
        generateSuggestions(
            resumeData,
            jobData,
            matchResult
        );


    // ==================================================
    // FINAL RESULT
    // ==================================================

    return {

        ...matchResult,

        suggestions
    };
}


module.exports = calculateMatch;