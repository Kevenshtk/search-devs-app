import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";

import LanguageSwitcher from "../../components/LanguageSwitcher";

import { CiSearch } from "react-icons/ci";

const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (username: string) => {
    const trimmed = username.trim();
    if (!trimmed) return;

    navigate(`/profile/${trimmed}`);
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      direction="column"
      bg="white"
      position="relative"
    >
      <Flex
        as="header"
        position="absolute"
        top={0}
        w="100%"
        justify="flex-end"
        px={{ base: 4, md: 8 }}
        py={4}
      >
        <LanguageSwitcher />
      </Flex>

      <Box w="100%" maxW="800px" p={4}>
        <Heading
          as="h1"
          fontSize={{ base: "5xl", md: "8xl" }}
          textAlign="center"
          mb={{ base: 10, md: 20 }}
          fontWeight="normal"
        >
          <Text as="span" color="#005ce6" mr={3}>
            Search
          </Text>
          <Text as="span" color="#8a2be2">
            d_evs
          </Text>
        </Heading>

        <Flex gap={4}>
          <InputGroup flex="1">
            <InputLeftElement pointerEvents="none" height="100%">
              <CiSearch color="#A0AEC0" size="24px" />
            </InputLeftElement>
            <Input
              aria-label={t("search")}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={t("search")}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(userName);
              }}
              size="lg"
              borderRadius="md"
              shadow="sm"
            />
          </InputGroup>
          <Button
            disabled={!userName}
            onClick={() => handleSearch(userName)}
            size="lg"
            bg="#8a2be2"
            color="white"
            _hover={{ bg: "#7A22C9" }}
            borderRadius="md"
            px={8}
            shadow="sm"
          >
            {t("search")}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;
