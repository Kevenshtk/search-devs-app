import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  Spinner,
  Link,
  Button,
} from "@chakra-ui/react";

import githubService from "../../services/githubService";
import type { User } from "../../schemas/user.schema";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState(username || "");

  useEffect(() => {
    if (!username) return;

    setSearchQuery(username);

    const fetchData = async () => {
      const result = await githubService.user(username);

      if (!result.success) {
        setError(true);
        setUser(null);
        return;
      }

      setUser(result.data ?? null);

      setRepos([]);
      setPage(1);
      setHasMore(true);

      await fetchRepos(username, 1);
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loadingRepos &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!username) return;
    if (page === 1) return;

    fetchRepos(username, page);
  }, [page, username]);

  if (error) {
    return (
      <Box minH="100vh" bg="#F8F9FC">
        <Flex py={20} justify="center" align="center" direction="column">
          <Heading as="h2" size="lg" color="gray.800" mb={4}>
            Nenhum usuário encontrado
          </Heading>
          <Text color="gray.600" mb={8} textAlign="center">
            Não conseguimos encontrar nenhum usuário com o nome "{username}".
          </Text>
          <Button
            onClick={() => navigate("/")}
            size="lg"
            bg="#8a2be2"
            color="white"
            _hover={{ bg: "#7A22C9" }}
            borderRadius="md"
            px={8}
            shadow="sm"
          >
            Voltar para a Home
          </Button>
        </Flex>
      </Box>
    );
  }

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
