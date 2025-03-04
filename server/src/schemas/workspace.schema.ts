import { z } from "zod";

export const workspaceSchema = z.object({
  name: z.string(),
  owner: z.lazy(() => z.any()),
  node: z.lazy(() => z.any()),
  collaborators: z.lazy(() => z.any()),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Workspace = z.infer<typeof workspaceSchema>;
