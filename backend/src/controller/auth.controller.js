import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/jwt.lib.js";

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
    console.log(profilePic);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      profilePic,
    });

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
  res.json({ message: "Login route" });
};
