import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (image: string) => {
  try {
    const res = await cloudinary.uploader.upload(image, {
      folder: "recipe-images",
    });
    console.log("📸 Cloudinary URL:", res.secure_url);
    return res.secure_url;
  } catch (error) {
    console.log("💀 Cloudinary Error:", error);
    return "";
  }
};
