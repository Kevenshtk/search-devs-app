import { Button, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const isPt = i18n.language?.startsWith("pt");
  const isEn = i18n.language?.startsWith("en");

  return (
    <Flex gap={2}>
      <Button
        size="sm"
        onClick={() => i18n.changeLanguage("pt")}
        bg={isPt ? "#8a2be2" : "gray.100"}
        color={isPt ? "white" : "gray.600"}
        _hover={{ bg: isPt ? "#7A22C9" : "gray.200" }}
        borderRadius="md"
        shadow="sm"
        px={3}
      >
        PT
      </Button>
      <Button
        size="sm"
        onClick={() => i18n.changeLanguage("en")}
        bg={isEn ? "#8a2be2" : "gray.100"}
        color={isEn ? "white" : "gray.600"}
        _hover={{ bg: isEn ? "#7A22C9" : "gray.200" }}
        borderRadius="md"
        shadow="sm"
        px={3}
      >
        EN
      </Button>
    </Flex>
  );
};

export default LanguageSwitcher;
