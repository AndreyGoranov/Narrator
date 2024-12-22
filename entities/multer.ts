import { Request } from "express";
import multer from "multer";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

// Multer storage configuration
const storage = multer.memoryStorage();

export const upload = multer({ storage, fileFilter });
