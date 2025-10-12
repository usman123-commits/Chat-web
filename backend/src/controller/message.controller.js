import User from "../models/user.model.js";



// for getting all the users except the logged in user
export const allUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user;
        // Find all users except the logged-in user
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log("Error from allUsers controller",error.message); 
        res.status(500).json({ error: "Internal server error" });
    }
}