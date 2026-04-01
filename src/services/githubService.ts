import { api } from "./api";
import { z } from "zod";
import { userSchema } from "../schemas/user.schema";
import { repoSchema } from "../schemas/repo.schema";
import type { TFunction } from "i18next";

const getUser = async (username: string) => {
  try {
    const response = await api.get(`/users/${username}`);

    return { success: true, data: userSchema.parse(response.data) };
  } catch {
    return { success: false, message: "User not found" };
  }
};

export const getRepos = async (username: string, page = 1, sort = "updated") => {
  try {
    const response = await api.get(
      `/users/${username}/repos?page=${page}&per_page=10&sort=${sort}`,
    );

    const parsedData = z.array(repoSchema).parse(response.data);

    return parsedData;
  } catch (error) {
    console.error("Error fetching repos:", error);
    throw error;
  }
};

export const getRelativeTime = (date: string, t: TFunction) => {
  const now = new Date();
  const updatedDate = new Date(date);

  const diffInSeconds = Math.floor(
    (now.getTime() - updatedDate.getTime()) / 1000
  );

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const weeks = Math.floor(diffInSeconds / 604800);

  if (diffInSeconds < 60) return t("updated_now");

  if (minutes < 60)
    return t(
      minutes === 1 ? "updated_minutes" : "updated_minutes_plural",
      { count: minutes }
    );

  if (hours < 24)
    return t(
      hours === 1 ? "updated_hours" : "updated_hours_plural",
      { count: hours }
    );

  if (days < 7)
    return t(days === 1 ? "updated_days" : "updated_days_plural", {
      count: days,
    });

  return t(weeks === 1 ? "updated_weeks" : "updated_weeks_plural", {
    count: weeks,
  });
};

const githubService = {
  user: getUser,
  repos: getRepos,
  relativeTime: getRelativeTime,
};

export default githubService;
