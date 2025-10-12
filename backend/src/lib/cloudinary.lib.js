import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
// configuring clodinary to use in routes
cloudinary.config({         
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    // i dont know about it but its working must check it later
    secure:true


});
export {cloudinary};