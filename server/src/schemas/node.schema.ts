import { z } from "zod";

export const nodeSchema = z.object({
  name: z.string(),
  type: z.enum(["FILE", "FOLDER"]),
  content: z.string().optional(),
  children: z.array(z.any()),
  owner: z.union([z.string(), z.any()]),
  collaborators: z.union([z.string(), z.any()]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Node = z.infer<typeof nodeSchema>;
