import { Button, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <Flex gap={2}>
      {languages.map((lang) => {
        const isActive = i18n.language?.startsWith(lang.code);

        return (
          <Button
            key={lang.code}
            size="sm"
            onClick={() => changeLanguage(lang.code)}
            bg={isActive ? "#8a2be2" : "gray.100"}
            color={isActive ? "white" : "gray.600"}
            _hover={{ bg: isActive ? "#7A22C9" : "gray.200" }}
            border={isActive ? "2px solid #8a2be2" : "1px solid transparent"}
            borderRadius="md"
            shadow="sm"
            px={3}
          >
            {lang.label}
          </Button>
        );
      })}
    </Flex>
  );
};

export default LanguageSwitcher;
