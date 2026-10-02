import multer from 'multer';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const uploadDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public",
);
mkdirSync(uploadDirectory, { recursive: true });

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

let upload = multer({storage});

export default upload;