import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/jwt.lib.js";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
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
    const newUser = new User({ fullName, email, password: hashedPassword ,profilePic});

    // logic for generating a token
    if (newUser) {
      generateToken(newUser._id, res);
      newUser.save();
      return res.status(201).json({ message: "User created successfully" });
    } else {
      return res.status(400).json({ message: "Error in creating user" });
    }

  } catch (error) {
    console.log("error in signup controller", error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

// for login route
export const login = (req, res) => {
  res.json({ message: "Login route" });
};

export const logout = (req, res) => {
  res.json({ message: "Login route" });
};
