import mongoose from "mongoose";
// Load environment variables from a .env file into process.env so we can use them
import dotenv from "dotenv";
dotenv.config();
// If want to connect with cloud mngodb atlas then just change the value of mongoURI in .env file
const mongoURI = process.env.mongoURI;
// async function to connect to mongoDB
export const connectTomongo = async () => {
  try {
    // connect to the mongoDB database by using mongoose function[mongoose.connect()]
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit the process with failure
  }
};
