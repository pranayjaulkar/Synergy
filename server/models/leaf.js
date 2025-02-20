import mongoose from "mongoose";

const leafSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    collaborators: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timeStamps: true }
);

export const Leaf = mongoose.model("Leaf", leafSchema);
