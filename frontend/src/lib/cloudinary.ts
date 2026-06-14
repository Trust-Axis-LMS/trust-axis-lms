import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export default cloudinary;

/** Upload a buffer to Cloudinary */
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string,
  options: { resource_type?: "image" | "raw" | "auto"; format?: string } = {}
) {
  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `trust-axis/${folder}`,
        resource_type: options.resource_type ?? "auto",
        ...options,
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Upload failed"));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );
    uploadStream.end(fileBuffer);
  });
}

/** Delete a resource from Cloudinary by public_id */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "raw" = "image"
) {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}
