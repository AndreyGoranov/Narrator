import pdfParse from 'pdf-parse';

export const extractTextFromPDFFile = async (fileBuffer: Buffer, fileType: string): Promise<string> => {
  if (fileType !== 'application/pdf') {
    throw new Error('Unsupported file type');
  }

  const data = await pdfParse(fileBuffer);
  return data.text;  // Extracted text from PDF
};