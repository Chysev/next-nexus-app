import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImage = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          overwrite: true,
          invalidate: true,
          resource_type: "auto",
        },
        (error, result) => {
          if (result && result.secure_url) {
            console.log(result.secure_url);
            resolve(result.secure_url);
          } else {
            reject(error);
          }
        }
      )
      .end(buffer);
  });
};

const uploadVideo = () => {};

const Multer = multer({ storage: multer.memoryStorage() });

export { uploadImage, uploadVideo, Multer };
