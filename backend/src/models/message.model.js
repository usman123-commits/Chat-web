import mongoose from "mongoose";
// creating messsages schema

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: { type: String },
    image: { type: String },
  },
  //   Automatically adds and updates createdAt & updatedAt fields in documents
  { timestamps: true }
);
// You are exporting a Model named Message — which is built from your messageSchema,and it represents the messages collection in your database.
const Message = mongoose.model("Message", messageSchema);
export default Message;
