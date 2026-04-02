import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { Toaster, toast } from "sonner";

import githubService from "../../services/githubService";

import type { User } from "../../schemas/user.schema";
import type { Repo } from "../../schemas/repo.schema";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import SortSelect from "../../components/SortSelect";
import ErrorState from "../../components/ErrorState";

import { CiStar } from "react-icons/ci";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState(username || "");
  const [error, setError] = useState(false);

  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isFetching = useRef(false);

  const [sortValue, setSortValue] = useState("full_name");
  const [direction, setDirection] = useState("desc");
  const { t } = useTranslation();

  const loadingReposRef = useRef(false);
  const hasMoreRef = useRef(true);

  useEffect(() => {
    loadingReposRef.current = loadingRepos;
  }, [loadingRepos]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const fetchRepos = useCallback(
    async (username: string, page: number, sort: string, direction: string) => {
      if (loadingReposRef.current || !hasMoreRef.current) {
        isFetching.current = false;
        return;
      }

      setLoadingRepos(true);
      loadingReposRef.current = true;
      isFetching.current = true;

      try {
        const results = await githubService.repos(
          username,
          page,
          sort,
          direction,
        );

        if (!results.success) {
          throw new Error("Failed to fetch repos");
        }

        const newRepos = results.data;

        if (newRepos.length < 10) {
          setHasMore(false);
          hasMoreRef.current = false;
        }

        setRepos((prev) => {
          const existingIds = new Set(prev.map((r) => r.id));
          const filtered = newRepos.filter((r) => !existingIds.has(r.id));
          return [...prev, ...filtered];
        });
      } catch (err) {
        console.error(err);
        toast.error(t("error_fetching_repos"));
      } finally {
        setLoadingRepos(false);
        loadingReposRef.current = false;
        isFetching.current = false;
      }
    },
    [t],
  );

  useEffect(() => {
    if (!username || page === 1) return;
    fetchRepos(username, page, sortValue, direction);
  }, [page, username, sortValue, direction, fetchRepos]);

  useEffect(() => {
    if (!username) return;
    setRepos([]);
    setPage(1);
    setHasMore(true);
    hasMoreRef.current = true;
    fetchRepos(username, 1, sortValue, direction);
  }, [username, sortValue, direction, fetchRepos]);

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

      setError(false);
      setUser(result.data ?? null);

      setRepos([]);
      setPage(1);
      setHasMore(true);
      hasMoreRef.current = true;

      await fetchRepos(username, 1, sortValue, direction);
    };

    fetchData();
  }, [username, sortValue, direction, fetchRepos]);

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

  if (error) {
    return (
      <ErrorState
        title={t("usernot_found")}
        description={`${t("usernot_foundDetail")} "${username}".`}
        buttonLabel={t("return_to_home")}
        onAction={() => navigate("/")}
      />
    );
  }

  return (
    <Box minH="100vh" bg="#FCFCFC">
    <Toaster />
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
          {user && <Sidebar user={user} />}

          <Flex direction="column" gap={4}>
            <Flex justify="flex-end">
              <SortSelect
                currentSort={sortValue}
                setSortValue={setSortValue}
                direction={direction}
                setDirection={setDirection}
              />
            </Flex>

            <Box bg="#FFFFFF" borderRadius="md">
              {repos?.map((repo, index) => (
                <Box key={repo.id}>
                  <Box p={8}>
                    <Heading as="h3" size="md" color="gray.800" mb={3}>
                      <Link
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        _hover={{ textDecoration: "underline" }}
                      >
                        {repo.name}
                      </Link>
                    </Heading>
                    <Text
                      color="gray.600"
                      fontSize="sm"
                      mb={4}
                      lineHeight="tall"
                    >
                      {repo.description || t("no_description")}
                    </Text>
                    <Flex align="center" gap={2} color="gray.500" fontSize="sm">
                      <CiStar /> <Text>{repo.stargazers_count}</Text>
                      <Text mx={2}>•</Text>
                      <Text>
                        {githubService.relativeTime(repo.updated_at, t)}
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
                      {t("loading_repos")}
                    </Text>
                  </Flex>
                </Box>
              )}
            </Box>
          </Flex>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
