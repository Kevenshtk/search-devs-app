import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";

import { FiUsers, FiMapPin, FiLink } from "react-icons/fi";
import { CiMail, CiTwitter } from "react-icons/ci";
import { FaRegBuilding, FaRegHeart } from "react-icons/fa";

import type { User } from "../../schemas/user.schema";

const Sidebar = ({user}: { user: User | null }) => {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="md"
      shadow="sm"
      position={{ lg: "sticky" }}
      top="24px"
    >
      <Flex align="center" gap={4} mb={6}>
        <Image
          src={user?.avatar_url || ""}
          alt={user?.name || "Avatar"}
          boxSize="60px"
          borderRadius="full"
          objectFit="cover"
        />
        <Box>
          <Heading as="h2" size="md" color="gray.800">
            {user?.name}
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
          <FiUsers /> <Text>{user?.followers} seguidores</Text>
        </Flex>
        <Flex align="center" gap={3} color="gray.600" fontSize="sm">
          <FaRegHeart /> <Text>{user?.following} seguindo</Text>
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
            <FiMapPin  /> <Text>{user.location}</Text>
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
            <a
              href={
                user.blog.startsWith("http")
                  ? user.blog
                  : `https://${user.blog}`
              }
              target="_blank"
              style={{ display: "block", maxWidth: "200px" }}
            >
              <Text _hover={{ textDecoration: "underline" }} truncate>
                {user.blog}
              </Text>
            </a>
          </Flex>
        )}
        {user?.twitter_username && (
          <Flex align="center" gap={3} color="gray.600" fontSize="sm">
            <CiTwitter /> <Text>@{user.twitter_username}</Text>
          </Flex>
        )}
      </Flex>

      <Button
        w="100%"
        bg="#8a2be2"
        color="white"
        _hover={{ bg: "#7A22C9" }}
        borderRadius="md"
      >
        Contato
      </Button>
    </Box>
  );
};

export default Sidebar;
