import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("CLOUDINARY CONFIG:", {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ? "SET" : "MISSING",
  apiKey: process.env.CLOUDINARY_API_KEY ? "SET" : "MISSING",
  apiSecret: process.env.CLOUDINARY_API_SECRET ? "SET" : "MISSING",
});

export default cloudinary;
