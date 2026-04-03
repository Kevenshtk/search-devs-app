import { useTranslation } from "react-i18next";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Link,
} from "@chakra-ui/react";

import type { User } from "../../schemas/user.schema";

import { FiUsers, FiMapPin, FiLink } from "react-icons/fi";
import { CiMail, CiTwitter } from "react-icons/ci";
import { FaRegBuilding, FaRegHeart } from "react-icons/fa";

const Sidebar = ({ user }: { user: User | null }) => {
  const { t } = useTranslation();

  if (!user) return null;

  const blogUrl = user.blog?.startsWith("http")
    ? user.blog
    : `https://${user.blog}`;

  return (
    <Box position={{ lg: "sticky" }} top="24px">
      <Box bg="#FFFFFF" p={6} borderRadius="md" mb={4}>
        <Flex align="center" gap={4} mb={6}>
          <Image
            src={
              user?.avatar_url ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9YMqXSb-5lcZxZ8d6SwiVPghe3XBi1b9QVaAkFoOI-g&s"
            }
            alt={user?.name || user?.login || "User avatar"}
            boxSize="60px"
            borderRadius="full"
            objectFit="cover"
          />
          <Box>
            <Heading as="h2" size="md" color="gray.800">
              {user?.name || user?.login}
            </Heading>
            <Text color="gray.500" fontSize="sm">
              @{user?.login}
            </Text>
          </Box>
        </Flex>

        {user?.bio && (
          <Text color="gray.600" fontSize="sm" mb={6} lineHeight="tall">
            {user.bio}
          </Text>
        )}

        <Flex direction="column" gap={3} mb={6}>
          <Flex align="center" gap={3} color="gray.600" fontSize="sm">
            <FiUsers />{" "}
            <Text>
              {user?.followers} {t("followers")}
            </Text>
          </Flex>
          <Flex align="center" gap={3} color="gray.600" fontSize="sm">
            <FaRegHeart />{" "}
            <Text>
              {user?.following} {t("following")}
            </Text>
          </Flex>
        </Flex>

        <Flex direction="column" gap={3} mb={8}>
          {user?.company && (
            <Flex align="center" gap={3} color="gray.600" fontSize="sm">
              <FaRegBuilding /> <Text>{user.company}</Text>
            </Flex>
          )}
          {user?.location && (
            <Flex align="center" gap={3} color="gray.600" fontSize="sm">
              <FiMapPin /> <Text>{user.location}</Text>
            </Flex>
          )}
          {user?.email && (
            <Flex align="center" gap={3} color="gray.600" fontSize="sm">
              <CiMail /> <Text>{user.email}</Text>
            </Flex>
          )}
          {user?.blog && (
            <Flex align="center" gap={3} color="gray.600" fontSize="sm">
              <FiLink />
              <Link href={blogUrl} target="_blank" rel="noopener noreferrer">
                <Text color="gray.600" _hover={{ textDecoration: "underline" }}>
                  {user.blog}
                </Text>
              </Link>
            </Flex>
          )}
          {user?.twitter_username && (
            <Flex align="center" gap={3} color="gray.600" fontSize="sm">
              <CiTwitter />
              <Link
                href={
                  user.twitter_username.startsWith("http")
                    ? user.twitter_username
                    : `https://twitter.com/${user.twitter_username}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text color="gray.600" _hover={{ textDecoration: "underline" }}>
                  @{user.twitter_username}
                </Text>
              </Link>
            </Flex>
          )}
        </Flex>
      </Box>

      <Button
        display={{ base: "none", lg: "block" }}
        w="100%"
        bg="#8a2be2"
        color="white"
        _hover={{ bg: "#7A22C9" }}
        borderRadius="md"
      >
        {t("contact")}
      </Button>
    </Box>
  );
};

export default Sidebar;
