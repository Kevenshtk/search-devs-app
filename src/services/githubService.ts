import { api } from "./api";
import { userSchema } from "../schemas/user.schema";

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
    console.error("Error fetching user:", error);
    throw error;
  }
};


const githubService = {
  user: getUser,
};

export default githubService;