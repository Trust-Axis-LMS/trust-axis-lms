import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export default cloudinary;

/** Upload a buffer/base64 string to Cloudinary */
export async function uploadToCloudinary(
  dataUri: string,
  folder: string,
  options: { resource_type?: "image" | "raw" | "auto"; format?: string } = {}
) {
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: `trust-axis/${folder}`,
    resource_type: options.resource_type ?? "auto",
    ...options,
  });
  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

/** Delete a resource from Cloudinary by public_id */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "raw" = "image"
) {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}
