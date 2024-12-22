import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { upload } from "./entities/multer";
import { extractTextFromPDFFile } from "./utils/extractTextFromPDFFile";
import { translateText } from "./utils/translateText";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// File upload route
app.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    console.log("file uploading...");
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const fileBuffer = req.file.buffer; // File as buffer
    const fileType = req.file.mimetype;

    try {
      // Step 1: Extract text from file (using a library based on file type)
      // const extractedText = await extractTextFromPDFFile(fileBuffer, fileType);
      const text = translateText(
        "Hello sir, this is your personalized narrator",
        "Bulgarian"
      );
      console.log(text, "text");
      // Step 2: Translate the extracted text
      // const translatedText = await translateText(extractedText, "es");

      // Step 3: Convert to audio
      // const audioBuffer = await textToSpeech(translatedText);

      // Step 4: Return audio file to user
      res.set({
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "attachment; filename=translated-audio.mp3",
      });
      // res.send(extractedText);
      // console.log(extractedText, 'extracted*****')
    } catch (error) {
      console.error("Error processing file:", error);
      res.status(500).json({ message: "Failed to process file" });
    }
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
