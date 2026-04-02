import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Flex,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Grid,
} from "@chakra-ui/react";

import LanguageSwitcher from "../LanguageSwitcher";

import { CiSearch } from "react-icons/ci";

type NavbarProps = {
  username: string | undefined;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const Navbar = ({ username, searchQuery, setSearchQuery }: NavbarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = () => {
    if (searchQuery.trim() && searchQuery !== username) {
      navigate(`/profile/${searchQuery}`);
    }
  };

  return (
    <Box as="nav" bg="#FFFFFF" w="100%">
      <Grid
        templateColumns={{ base: "1fr", lg: "300px 1fr" }}
        gap={8}
        maxW="1200px"
        mx="auto"
        px={4}
        py={4}
        alignItems="center"
      >
        <Heading
          as="h1"
          fontSize={{ base: "xl", md: "2xl" }}
          cursor="pointer"
          onClick={() => navigate("/")}
          fontWeight="medium"
        >
          <Text as="span" color="#005ce6" mr={{ base: 1, md: 2 }}>
            Search
          </Text>
          <Text as="span" color="#8a2be2">
            d_evs
          </Text>
        </Heading>

        <Flex w="100%" align="center" gap={{ base: 2, md: 4 }}>
          <InputGroup flex="1">
            <InputLeftElement pointerEvents="none">
              <CiSearch color="#A0AEC0" />
            </InputLeftElement>
            <Input
              aria-label={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search")}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              size="md"
              bg="white"
              borderRadius="md"
              border="1px solid #8a2be2"
              _focus={{
                outline: "none",
                borderColor: "#8a2be2",
                boxShadow: "0 0 0 1px #8a2be2",
              }}
            />
          </InputGroup>

          <LanguageSwitcher />
        </Flex>
      </Grid>
    </Box>
  );
};

export default Navbar;
