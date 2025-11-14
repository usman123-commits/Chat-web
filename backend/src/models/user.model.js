import mongoose from "mongoose";
// creating user schema

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    password: { type: String, minlength: 6 },

    profilePic: { type: String, default: "" },

    googleId: { type: String, default: null },
    authProvider: { type: String, default: "local" },

    // Optional but recommended for real apps
    lastLoginAt: { type: Date, default: null },
    isEmailVerified: { type: Boolean, default: false },
    role: { type: String, default: "user" },

    // isOnline: { type: Boolean, default: false },
    // lastSeen: { type: Date, default: Date.now }
  },
  //   Automatically adds and updates createdAt & updatedAt fields in documents
  { timestamps: true }
);
// You are exporting a Model named User — which is built from your userSchema,and it represents the users collection in your database.
const User = mongoose.model("User", userSchema);
export default User;
