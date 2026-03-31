import { z } from "zod";

export const repoSchema = z.object({
  html_url: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  updated_at: z.string(),
});

export type Repo = z.infer<typeof repoSchema>;
