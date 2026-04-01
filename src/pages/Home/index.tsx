import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = async (username: string) => {
    if (!username.trim()) return;

    navigate(`/profile/${username}`);
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
      

      <Box w="100%" maxW="600px" p={4}>
        <Heading
          as="h1"
          fontSize="6xl"
          textAlign="center"
          mb={10}
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
          <InputGroup flex="1" startElement={<CiSearch color="#A0AEC0" />}>
            <Input
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              placeholder={t("search")}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(userName);
              }}
              size="lg"
              bg="white"
              borderRadius="md"
              shadow="sm"
            />
          </InputGroup>
          <Button
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
