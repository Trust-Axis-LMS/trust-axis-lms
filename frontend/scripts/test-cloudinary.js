#!/usr/bin/env node

const cloudinary = require('cloudinary').v2;

require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function run() {
  try {
    console.log("Uploading image...");
    // 2. Upload an image
    const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/sample.jpg", {
      public_id: "test_sample"
    });

    console.log("Upload successful!");
    console.log("Secure URL:", uploadResult.secure_url);
    console.log("Public ID:", uploadResult.public_id);

    // 3. Get image details
    console.log("\nImage Metadata:");
    console.log(`- Width: ${uploadResult.width}px`);
    console.log(`- Height: ${uploadResult.height}px`);
    console.log(`- Format: ${uploadResult.format}`);
    console.log(`- Size: ${uploadResult.bytes} bytes`);

    // 4. Transform the image
    // f_auto: Automatically selects the most efficient image format based on the browser requesting it
    // q_auto: Automatically adjusts the compression quality to balance visual fidelity and file size
    const transformedUrl = cloudinary.url("test_sample", {
      fetch_format: "auto",
      quality: "auto"
    });

    console.log("\nDone! Click link below to see optimized version of the image. Check the size and the format.");
    console.log(transformedUrl);

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

run();
