const fs = require("fs");
const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");

async function extractResumeText(filePath, mimeType) {
    try {
        const buffer = fs.readFileSync(filePath);

        // PDF
        if (mimeType === "application/pdf") {
            const parser = new PDFParse({ data: buffer });

            const result = await parser.getText();

            await parser.destroy();

            return result.text;
        }

        // DOCX
        if (
            mimeType ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const result = await mammoth.extractRawText({
                buffer: buffer
            });

            return result.value;
        }

        throw new Error("Unsupported file type.");
    } catch (error) {
        throw new Error(`Resume parsing failed: ${error.message}`);
    }
}

module.exports = extractResumeText;