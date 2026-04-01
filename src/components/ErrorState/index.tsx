import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";

type ErrorStateProps = {
  title: string;
  description: string;
  buttonLabel: string;
  onAction: () => void;
};

const ErrorState = ({
  title,
  description,
  buttonLabel,
  onAction,
}: ErrorStateProps) => {
  return (
    <Box minH="100vh" bg="#FCFCFC">
      <Flex py={20} justify="center" align="center" direction="column">
        <Heading as="h2" size="lg" color="gray.800" mb={4}>
          {title}
        </Heading>
        <Text color="gray.600" mb={8} textAlign="center">
          {description}
        </Text>
        <Button
          onClick={onAction}
          size="lg"
          bg="#8a2be2"
          color="white"
          _hover={{ bg: "#7A22C9" }}
          borderRadius="md"
          px={8}
          shadow="sm"
        >
          {buttonLabel}
        </Button>
      </Flex>
    </Box>
  );
};

export default ErrorState;
