import { z } from "zod";
import { nodeSchema } from "./node.schema";

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
  nodes: z.array(nodeSchema).optional(),
  workspaces: z.lazy(() => z.any()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof userSchema>;
