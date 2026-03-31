import { api } from "./api";
import { z } from "zod";
import { userSchema } from "../schemas/user.schema";
import { repoSchema } from "../schemas/repo.schema";

const getUser = async (username: string) => {
  try {
    const response = await api.get(`/users/${username}`);

    return { success: true, data: userSchema.parse(response.data) };
  } catch {
    return { success: false, message: "User not found" };
  }
};

export const getRepos = async (username: string, page = 1) => {
  try {
    const response = await api.get(
      `/users/${username}/repos?page=${page}&per_page=10`,
    );

    const parsedData = z.array(repoSchema).parse(response.data);

    return parsedData;
  } catch (error) {
    console.error("Error fetching repos:", error);
    throw error;
  }
};

export const getRelativeTime = (date: string) => {
  const now = new Date();
  const updatedDate = new Date(date);

  const diffInSeconds = Math.floor(
    (now.getTime() - updatedDate.getTime()) / 1000,
  );

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const weeks = Math.floor(diffInSeconds / 604800);

  if (diffInSeconds < 60) return "Updated just now";
  if (minutes < 60) return `Updated ${minutes} minute(s) ago`;
  if (hours < 24) return `Updated ${hours} hour(s) ago`;
  if (days < 7) return `Updated ${days} day(s) ago`;

  return `Updated ${weeks} week(s) ago`;
};

const githubService = {
  user: getUser,
  repos: getRepos,
  relativeTime: getRelativeTime,
};

export default githubService;
