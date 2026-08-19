const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateOptimizedResume(
    resumeData,
    resumeText,
    jobDescription
) {

    if (!resumeText || typeof resumeText !== "string") {
        throw new Error("Resume text is required.");
    }

    if (!jobDescription || typeof jobDescription !== "string") {
        throw new Error("Job description is required.");
    }

    const prompt = `
You are an expert ATS resume optimizer.

Your task is to rewrite the candidate's existing resume into a
CONCISE, PROFESSIONAL, ATS-FRIENDLY resume targeted toward the
given job description.

========================================
CRITICAL LENGTH RULES
========================================

1. This is a fresher / early-career resume.
2. Target ONE PAGE whenever reasonably possible.
3. NEVER intentionally create a long resume.
4. Remove repetition and unnecessary wording.
5. Do not explain projects or experiences in paragraphs.
6. Keep bullets short and impact-focused.
7. Prefer concise phrasing over detailed explanations.
8. Do not repeat the same skill in multiple sections.
9. Do not create new sections unless the information already exists.
10. Do not add filler content.

========================================
CONTENT RULES
========================================

1. NEVER invent skills, experience, projects, education,
   certifications, achievements, companies, numbers,
   technologies, or responsibilities.

2. Only use information genuinely supported by the original resume.

3. Never add a missing job-description skill unless the resume
   already demonstrates that skill.

4. Improve grammar, clarity, action-oriented wording,
   ATS relevance and professional presentation.

5. Preserve factual information.

6. Do not exaggerate achievements.

7. Do not convert hobbies into professional achievements.

8. Do not create fake measurable results.

========================================
SECTION LENGTH LIMITS
========================================

Professional Summary:
- Maximum 2-3 sentences.
- Maximum approximately 50 words.

Skills:
- One compact line or a few compact lines.
- Do not explain each skill.

Education:
- Keep each degree/qualification to approximately 1-2 lines.

Experience:
- Maximum 4 bullets per position.
- Each bullet should normally be 12-20 words.
- Avoid long paragraphs.

Projects:
- Maximum 3 most relevant projects.
- Maximum 2 bullets per project.
- Each bullet should normally be 12-20 words.

Certifications:
- Keep each certification to one concise line.
- Do not add descriptions unless they are essential.

Achievements:
- Maximum 3 concise bullets.

========================================
PROJECT/EXPERIENCE WRITING STYLE
========================================

Use concise action-oriented bullets.

BAD:
"I worked on a project where I created a website and the goal
of the project was to provide users with..."

GOOD:
"Built a responsive web interface using HTML and CSS."

Only write facts that are actually present in the original resume.

========================================
ATS REQUIREMENTS
========================================

1. Use standard section names:
   Summary
   Skills
   Education
   Experience
   Projects
   Certifications
   Achievements

2. Keep wording professional and simple.

3. Use job-description terminology ONLY when supported by
   the candidate's actual resume.

4. Avoid decorative symbols inside the resume content.

5. Avoid unnecessary headings.

========================================
OUTPUT FORMAT
========================================

Return ONLY valid JSON.

Do NOT use markdown code fences.

Use exactly this structure:

{
    "name": "",
    "email": "",
    "phone": "",
    "linkedin": "",
    "github": "",
    "summary": "",
    "skills": "",
    "education": "",
    "experience": [
        {
            "title": "",
            "content": ""
        }
    ],
    "projects": [
        {
            "title": "",
            "content": ""
        }
    ],
    "certifications": "",
    "achievements": ""
}

IMPORTANT:
- "content" for experience/projects must contain concise bullet points.
- Separate multiple bullets using newline characters.
- Do NOT use long paragraphs.
- Keep the final output compact enough for a one-page fresher resume.

========================================
TARGET JOB DESCRIPTION
========================================

${jobDescription}

========================================
ORIGINAL RESUME
========================================

${resumeText}
`;

    try {

        console.log(
            "\n========== AI RESUME OPTIMIZATION =========="
        );

        console.log(
            "Generating concise ATS-optimized resume..."
        );

        const response =
            await ai.models.generateContent({
                model: "gemini-3.5-flash-lite",
                contents: prompt
            });

        let responseText = response.text;

        if (!responseText) {
            throw new Error(
                "Gemini returned an empty response."
            );
        }

        responseText =
            responseText
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .trim();

        const optimizedResume =
            JSON.parse(responseText);

        console.log(
            "Optimized resume generated successfully."
        );

        return optimizedResume;

    } catch (error) {

        console.error(
            "\n========== OPTIMIZED RESUME ERROR =========="
        );

        console.error(error);

        throw new Error(
            `Optimized resume generation failed: ${error.message}`
        );
    }
}

module.exports = generateOptimizedResume;