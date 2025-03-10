import mongoose, { Schema, Document } from "mongoose";

export interface INode extends Document {
  name: string;
  type: "FILE" | "FOLDER";
  content?: string;
  children: Schema.Types.ObjectId[];
  owner: Schema.Types.ObjectId;
  collaborators: Schema.Types.ObjectId[];
}

const nodeSchema = new Schema<INode>(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["FILE", "FOLDER"], required: true },
    content: {
      type: String,
      required: () => (this as unknown as INode).type === "FILE",
    },
    children: {
      type: [Schema.Types.ObjectId],
      ref: "Node",
      required: () => (this as unknown as INode).type === "FOLDER",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

export const Node = mongoose.model("Node", nodeSchema);
