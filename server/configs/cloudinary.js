import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (filepath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  if (!filepath) {
    throw new Error('Image file is required');
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(filepath);
    return uploadResult.secure_url;
  } finally {
    await fs.promises.unlink(filepath).catch(() => {});
  }

}

export default uploadOnCloudinary;