import mongoose, { Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  nodes: Schema.Types.ObjectId[];
  workspaces: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    nodes: {
      type: [Schema.Types.ObjectId],
      ref: "Node",
    },
    workspaces: {
      type: [Schema.Types.ObjectId],
      ref: "Workspace",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
