import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/jwt.lib.js";
import { cloudinary } from "../lib/cloudinary.lib.js";

export const signUp = async (req, res) => {
  
  const { fullName, email, password, profilePic } = req.body;
  try {
    // check if user already exists
    const user = await User.findOne({ email });

    // say user already exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // create a new user
    
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      profilePic,
    });

    // logic for generating a token
    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      
      return res.status(201).json({
      fullName: newUser.fullName,
      _id: newUser._id,
      profilePic: newUser.profilePic,
      email: newUser.email,
    });
    } else {
      return res.status(400).json({ message: "Error in creating user" });
    }
  } catch (error) {
    console.log("error in signup controller :", `"${error.message}"`);
    return res.status(500).json({ message: "Internal Server error" });
  }
};



// for login route
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    // if user not found give message "Wrong credentials" and status 400
    if (!user) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    // if user exists compare the password through bcrypt.compare()
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // if password is incorrect give message "Wrong credentials" and status 400
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      fullName: user.fullName,
      _id: user._id,
      profilePic: user.profilePic,
      email: user.email,
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};


// For logout route
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller",error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
  
};

// For updating user profile using cloudinary
export const updateProfile = async(req, res) => {
  try {
    
    const {  profilePic } = req.body;
    const userId = req.user._id;
if (!profilePic){
  return res.status(400).json({message:"Profile pic is required"});
}
const cloudinaryResponse = await cloudinary.uploader.upload(profilePic)
if (!cloudinaryResponse){
  return res.status(500).json({message:"Error in uploading image"});
}
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: cloudinaryResponse.secure_url },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({updatedUser});

  } catch (error) {
    console.log("Error in updateProfile controller ",error.message);
    res.status(500).json({message:"Internal server error"});
  }
  
};

// For Checking if the user is authenticated or not
export const checkAuth = async(req, res) => {
  try {
    // sending the user data if the user is authenticated
    // req.user contains the user id from the protectRoute middleware
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller",error.message);
    res.status(500).json({message:"Internal server error"});
  }
}
 
