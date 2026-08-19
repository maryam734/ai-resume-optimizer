const { GoogleGenAI } = require("@google/genai");

// ======================================================
// GEMINI CLIENT
// ======================================================

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// ======================================================
// AI RESUME ANALYSIS
// ======================================================

async function generateAIResumeAnalysis(
    resumeText,
    jobDescription,
    matchData
) {

    // --------------------------------------------------
    // VALIDATION
    // --------------------------------------------------

    if (!resumeText || typeof resumeText !== "string") {
        throw new Error("Resume text is required.");
    }

    if (!jobDescription || typeof jobDescription !== "string") {
        throw new Error("Job description is required.");
    }

    if (!process.env.GEMINI_API_KEY) {
        throw new Error(
            "GEMINI_API_KEY is not configured in .env"
        );
    }

    // ==================================================
    // PROMPT
    // ==================================================

    const prompt = `
You are an expert resume reviewer and ATS optimization assistant.

Analyze the candidate's resume against the target job description.

IMPORTANT RULES:

1. Only recommend skills, technologies, achievements, or experiences
   that are genuinely supported by the resume.

2. Never invent work experience, projects, certifications,
   achievements, tools, or technologies.

3. Missing skills should only be recommended if the candidate
   genuinely has that experience.

4. Give practical and specific recommendations.

5. Focus on ATS optimization, relevance, clarity,
   professional writing, and measurable achievements.

6. Keep recommendations concise.

Return ONLY valid JSON.

Do NOT use markdown code fences.
Do NOT add explanations before or after the JSON.

Use exactly this structure:

{
    "overallAdvice": "A concise overall assessment of the resume.",
    "summaryImprovement": "An improved professional summary based only on the resume.",
    "suggestions": [
        "Suggestion 1",
        "Suggestion 2",
        "Suggestion 3",
        "Suggestion 4",
        "Suggestion 5"
    ],
    "bulletImprovements": [
        {
            "original": "Existing resume bullet",
            "improved": "Improved version using only existing facts"
        }
    ],
    "keywordAdvice": [
        "Keyword recommendation 1",
        "Keyword recommendation 2"
    ]
}

========================================
TARGET JOB DESCRIPTION
========================================

${jobDescription}

========================================
RESUME
========================================

${resumeText}

========================================
CURRENT MATCH RESULT
========================================

Match Score:
${matchData.matchScore}/100

Category:
${matchData.category}

Matched Skills:
${matchData.matchedSkills.join(", ") || "None"}

Missing Skills:
${matchData.missingSkills.join(", ") || "None"}

Matched Keywords:
${matchData.matchedKeywords.join(", ") || "None"}

Missing Keywords:
${matchData.missingKeywords.join(", ") || "None"}
`;

    // ==================================================
    // GEMINI API WITH RETRY
    // ==================================================

    const model = "gemini-3.5-flash-lite";
    const maxRetries = 3;

    let response = null;

    for (
        let attempt = 1;
        attempt <= maxRetries;
        attempt++
    ) {

        try {

            console.log(
                `\n========== AI RESUME ANALYSIS (Attempt ${attempt}/${maxRetries}) ==========`
            );

            console.log(
                `Using model: ${model}`
            );

            console.log(
                "Sending request to Gemini..."
            );

            response =
                await ai.models.generateContent({
                    model,
                    contents: prompt
                });

            break;

        } catch (error) {

            const status =
                error.status ||
                error.statusCode;

            const isTemporaryError =
                status === 429 ||
                status === 500 ||
                status === 502 ||
                status === 503 ||
                status === 504;

            if (
                isTemporaryError &&
                attempt < maxRetries
            ) {

                const delay =
                    2000 * Math.pow(2, attempt - 1);

                console.log(
                    `Gemini temporarily unavailable (${status}).`
                );

                console.log(
                    `Retrying in ${delay / 1000} seconds...`
                );

                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            delay
                        )
                );

                continue;
            }

            console.error(
                "\n========== GEMINI ERROR =========="
            );

            console.error(error);

            throw new Error(
                `AI resume analysis failed: ${error.message}`
            );
        }
    }

    // ==================================================
    // RESPONSE VALIDATION
    // ==================================================

    let responseText =
        response?.text;

    if (!responseText) {
        throw new Error(
            "Gemini returned an empty response."
        );
    }

    console.log(
        "Gemini response received."
    );

    // ==================================================
    // CLEAN GEMINI RESPONSE
    // ==================================================

    responseText =
        responseText
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

    // ==================================================
    // PARSE JSON
    // ==================================================

    let parsedResponse;

    try {

        parsedResponse =
            JSON.parse(responseText);

    } catch (parseError) {

        console.error(
            "Gemini returned invalid JSON:"
        );

        console.error(
            responseText
        );

        throw new Error(
            "AI response could not be parsed as JSON."
        );
    }

    // ==================================================
    // RETURN CLEAN RESULT
    // ==================================================

    return {

        overallAdvice:
            parsedResponse.overallAdvice || "",

        summaryImprovement:
            parsedResponse.summaryImprovement || "",

        suggestions:
            Array.isArray(
                parsedResponse.suggestions
            )
                ? parsedResponse.suggestions
                : [],

        bulletImprovements:
            Array.isArray(
                parsedResponse.bulletImprovements
            )
                ? parsedResponse.bulletImprovements
                : [],

        keywordAdvice:
            Array.isArray(
                parsedResponse.keywordAdvice
            )
                ? parsedResponse.keywordAdvice
                : []
    };
}

// ======================================================
// EXPORT
// ======================================================

module.exports =
    generateAIResumeAnalysis;