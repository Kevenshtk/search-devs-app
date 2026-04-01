import { Flex, Heading, Text, Input, InputGroup } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";

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
    <Flex
      as="nav"
      bg="white"
      w="100%"
      px={{ base: 4, md: 8 }}
      py={4}
      align="center"
      justify="space-between"
      shadow="sm"
    >
      <Heading
        as="h1"
        fontSize="2xl"
        cursor="pointer"
        onClick={() => navigate("/")}
        fontWeight="medium"
        flexShrink={0}
      >
        <Text as="span" color="#005ce6" mr={2}>
          Search
        </Text>
        <Text as="span" color="#8a2be2">
          d_evs
        </Text>
      </Heading>

      <Flex w="100%" maxW="600px" ml={4} align="center" gap={4}>
        <InputGroup flex="1" startElement={<CiSearch color="#A0AEC0" />}>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("search")}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            size="md"
            bg="white"
            borderRadius="md"
            borderColor="#8a2be2"
            _focus={{ borderColor: "#8a2be2", boxShadow: "0 0 0 1px #8a2be2" }}
          />
        </InputGroup>
        
        <LanguageSwitcher />
      </Flex>
    </Flex>
  );
};

export default Navbar;
