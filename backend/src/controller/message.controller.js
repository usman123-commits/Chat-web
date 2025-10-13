import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { cloudinary } from "../lib/cloudinary.lib.js";

// for getting all the users except the logged in user
export const allUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user;
    // Find all users except the logged-in user
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    console.log("Error from allUsers controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// for getting all the messages between two users
export const getMessages = async (req, res) => {
  try {
    // the user we are chatting with.we can get it from the url params /:id
    const { id: userToChat } = req.params;
    // the current logged in user
    const senderId = req.user;
    const messages = await Message.find({
      // returns every message both of users, regardless of who sent it
      // $or takes array of conditions and matches if any condition is true
      $or: [
        { sender: senderId, receiver: userToChat },

        { sender: userToChat, receiver: senderId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Eroor from getmMessages controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// for sending a message to a user
//
export const sendMessage = async (req, res) => {
  try {
    // the user we are sending message to
    const { id: receiverId } = req.params;
    // sender id from the protectRoute middleware
    const senderId = req.user;
    // the image in base64 and text format from the body
    const { text, image: imageFrombody } = req.body;
    //Implementing functionality if there is an image then upload it to cloudinary and get the url
    let imageUrl;

    if (image) {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        imageFrombody
      );
      imageUrl = cloudinaryResponse.secure_url;
    }

    // create a new message document and save it to the database
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
// remaining for updating the last message in the chat list by socket.io


  } catch (error) {
    console.log("Error from sendMessage controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
