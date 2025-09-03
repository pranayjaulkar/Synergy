import mongoose, { Schema, Document } from "mongoose";

export interface IFile extends Document {
  name: string;
  type: "FILE" | "FOLDER";
  ext: string;
  content?: string;
  children: Schema.Types.ObjectId[];
  owner: Schema.Types.ObjectId;
  collaborators: Schema.Types.ObjectId[];
}

const fileSchema = new Schema<IFile>(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["FILE", "FOLDER"], required: true },
    content: {
      type: String,
      required: () => (this as unknown as IFile).type === "FILE",
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "File",
        required: () => (this as unknown as IFile).type === "FOLDER",
      },
    ],
    ext: {
      type: String,
      required: () => (this as unknown as IFile).type === "FILE",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const File = mongoose.model("File", fileSchema);
