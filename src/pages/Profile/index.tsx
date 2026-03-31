import { useEffect, useState, useRef } from "react";
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
import type { Repo } from "../../schemas/repo.schema";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { CiStar } from "react-icons/ci";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState(username || "");

  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const isFetching  = useRef(false);

  const fetchRepos = async (username: string, page: number) => {
    if (loadingRepos || !hasMore) {
      isFetching.current = false;
      return;
    }

    setLoadingRepos(true);
    isFetching.current = true;

    try {
      const newRepos = await githubService.repos(username, page);

      if (newRepos.length === 0) {
        setHasMore(false);
      }

      setRepos((prev) => [...prev, ...newRepos]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingRepos(false);
      isFetching.current = false;
    }
  };

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
        !isFetching.current &&
        hasMore
      ) {
        isFetching.current = true;
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

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
      <Navbar
        username={username}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Box py={8}>
        <Grid
          templateColumns={{ base: "1fr", lg: "300px 1fr" }}
          gap={8}
          maxW="1200px"
          mx="auto"
          px={4}
          alignItems="start"
        >
          <Sidebar user={user} />

          <Box bg="white" borderRadius="md" shadow="sm">
            {repos?.map((repo, index) => (
              <Box key={index}>
                <Box p={8}>
                  <Heading as="h3" size="md" color="gray.800" mb={3}>
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      _hover={{ textDecoration: "underline" }}
                    >
                      {repo.name}
                    </Link>
                  </Heading>
                  <Text color="gray.600" fontSize="sm" mb={4} lineHeight="tall">
                    {repo.description}
                  </Text>
                  <Flex align="center" gap={2} color="gray.500" fontSize="sm">
                    <CiStar /> <Text>{repo.stargazers_count}</Text>
                    <Text mx={2}>•</Text>
                    <Text>
                      Atualizado {githubService.relativeTime(repo.updated_at)}
                    </Text>
                  </Flex>
                </Box>
                {index < repos.length - 1 && (
                  <Box borderBottomWidth="1px" borderColor="gray.200" />
                )}
              </Box>
            ))}

            {loadingRepos && hasMore && (
              <Box py={8}>
                <Flex justify="center" align="center" gap={3} color="#8a2be2">
                  <Spinner size="sm" />
                  <Text fontWeight="medium" fontSize="sm">
                    Loading more repos...
                  </Text>
                </Flex>
              </Box>
            )}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
