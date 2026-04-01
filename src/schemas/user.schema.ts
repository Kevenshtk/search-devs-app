import { z } from "zod";

export const userSchema = z.object({
  avatar_url: z.string().url(),
  name: z.string().nullable(),
  login: z.string(),
  bio: z.string().nullable(),
  followers: z.number(),
  following: z.number(),
  company: z.string().nullable(),
  location: z.string().nullable(),
  email: z.string().email().nullable(),
  blog: z.string().nullable().optional(),
  twitter_username: z.string().nullable(),
});

export type User = z.infer<typeof userSchema>;
