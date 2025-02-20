import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    messages: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: [],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
