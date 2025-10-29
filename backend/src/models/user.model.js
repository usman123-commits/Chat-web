import mongoose from "mongoose";
// creating user schema

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    profilePic: { type: String, default: "" },



    
    // isOnline: { type: Boolean, default: false },
    // lastSeen: { type: Date, default: Date.now }
  },
  //   Automatically adds and updates createdAt & updatedAt fields in documents
  { timestamps: true }
);
// You are exporting a Model named User — which is built from your userSchema,and it represents the users collection in your database.
const User = mongoose.model("User", userSchema);
export default User;
