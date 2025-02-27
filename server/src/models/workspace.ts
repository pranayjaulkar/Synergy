import mongoose, { Schema } from "mongoose";

export interface Workspace {
  name: string;
  owner: Schema.Types.ObjectId;
  nodes: Schema.Types.ObjectId[];
  collaborators: Schema.Types.ObjectId[];
}
const workspaceSchema = new Schema<Workspace>(
  {
    name: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nodes: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "Node",
    },
    collaborators: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

export const Workspace = mongoose.model("Workspace", workspaceSchema);
