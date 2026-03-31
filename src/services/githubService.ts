import { api } from "./api";
import { userSchema } from "../schemas/user.schema";

const getUser = async (username: string) => {
  try {
    const response = await api.get(`/users/${username}`);

    return userSchema.parse(response.data);
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};


const githubService = {
  user: getUser,
};

export default githubService;