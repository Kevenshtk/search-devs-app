import { z } from "zod";

export const repoSchema = z.object({
  id: z.number(),
  html_url: z.string().url(),
  name: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  updated_at: z.string().datetime(),
});

export type Repo = z.infer<typeof repoSchema>;
