import { z } from "zod";

export const fileSchema = z.object({
  name: z.string(),
  type: z.enum(["FILE", "FOLDER"]),
  content: z.string().optional(),
  children: z.array(z.any()),
  owner: z.union([z.string(), z.any()]),
  collaborators: z.union([z.string(), z.any()]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type File = z.infer<typeof fileSchema>;
