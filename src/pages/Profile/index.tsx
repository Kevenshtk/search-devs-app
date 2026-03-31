import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@chakra-ui/react";

import githubService from "../../services/githubService";
import type { User } from "../../schemas/user.schema";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState(username || "");

  useEffect(() => {
    if (!username) return;

    setSearchQuery(username);

    const fetchData = async () => {
      const data = await githubService.user(username);
      setUser(data);
    };

    fetchData();
  }, [username]);

  return (
    <Box minH="100vh" bg="#F8F9FC">
      <Navbar username={username} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>


      <Box py={8}>
        <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={8} maxW="1200px" mx="auto" px={4} alignItems="start">
          
          <Sidebar user={user} />
          
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
