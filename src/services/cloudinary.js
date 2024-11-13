import { v2 as cloudinary } from 'cloudinary';
import { configDotenv } from 'dotenv';
import { unlinkSync } from "fs"
// Configuration
configDotenv()
console.log("aas", process.env.api_secret);

cloudinary.config({
    cloud_name: 'dpnhor2qr',
    api_key: '273583794515662',
    api_secret: process.env.api_secret  // Use environment variables for sensitive info
});

export const cloudinaryUpload = async (path, public_id, folder) => {
    let uploadResult;

    try {
        // Upload an image
        uploadResult = await cloudinary.uploader.upload(path, {
            public_id,
            folder
        });
        unlinkSync(path)
    } catch (error) {
        unlinkSync(path)
        console.error("Upload Error:", error);
        return { error: 'Upload failed', uploadResult: null }; // Return error object
    }

    // Generate optimized URLs
    const optimizeUrl = cloudinary.url(uploadResult.public_id, {
        fetch_format: 'auto',
        quality: 'auto',
    });

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url(uploadResult.public_id, {
        crop: 'fill',
        gravity: 'auto',
        width: 500,
        height: 500,
    });

    return { optimizeUrl, autoCropUrl, uploadResult };
}
