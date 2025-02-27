import { z } from "zod";
import { nodeSchema } from "./node";

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
  nodes: z.array(nodeSchema),
  workspaces: z.lazy(() => z.any()),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof userSchema>;
