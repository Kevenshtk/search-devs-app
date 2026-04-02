import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
} from "@chakra-ui/react";

import { FiChevronDown, FiCheck } from "react-icons/fi";

type SortSelectProps = {
  currentSort: string;
  setSortValue: (value: string) => void;
  direction: string;
  setDirection: (value: string) => void;
};

const SortSelect = ({
  currentSort,
  setSortValue,
  direction,
  setDirection,
}: SortSelectProps) => {
  const { t } = useTranslation();

  const sorts = useMemo(
    () => [
      { label: t("sort_updated"), value: "updated" },
      { label: t("sort_created"), value: "created" },
      { label: t("sort_pushed"), value: "pushed" },
      { label: t("sort_name"), value: "full_name" },
    ],
    [t],
  );

  const directions = useMemo(
    () => [
      { label: t("direction_desc"), value: "desc" },
      { label: t("direction_asc"), value: "asc" },
    ],
    [t],
  );

  const selectedSort = sorts.find((s) => s.value === currentSort);
  const selectedDirection = directions.find((d) => d.value === direction);

  return (
    <>
      <Menu placement="bottom-end">
        <MenuButton
          as={Button}
          width="100"
          textAlign={"left"}
          justifyContent="space-between"
          rightIcon={<FiChevronDown />}
          variant="outline"
          bg="white"
          borderColor="gray.300"
          fontWeight="normal"
          mr={4}
          _hover={{ bg: "white", borderColor: "gray.400" }}
          _expanded={{ bg: "white", borderColor: "gray.400" }}
        >
          {selectedDirection?.label}
        </MenuButton>

        <MenuList p={2} minW="90px" borderRadius="md" borderColor="gray.200">
          {directions.map((d) => {
            const isActive = d.value === direction;

            return (
              <MenuItem
                key={d.value}
                onClick={() => setDirection(d.value)}
                borderRadius="md"
                px={3}
                py={2}
                bg={isActive ? "gray.100" : "transparent"}
                _hover={{ bg: "gray.100" }}
              >
                <Flex w="100%" justify="space-between" align="center">
                  <Text>{d.label}</Text>
                  {isActive && <FiCheck size={16} />}
                </Flex>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>

      <Menu placement="bottom-end">
        <MenuButton
          as={Button}
          width="240px"
          textAlign={"left"}
          justifyContent="space-between"
          rightIcon={<FiChevronDown />}
          variant="outline"
          bg="white"
          borderColor="gray.300"
          fontWeight="normal"
          _hover={{ bg: "white", borderColor: "gray.400" }}
          _expanded={{ bg: "white", borderColor: "gray.400" }}
        >
          {selectedSort?.label ?? t("sort_name")}
        </MenuButton>

        <MenuList p={2} minW="240px" borderRadius="md" borderColor="gray.200">
          {sorts.map((sort) => {
            const isActive = sort.value === currentSort;

            return (
              <MenuItem
                key={sort.value}
                onClick={() => setSortValue(sort.value)}
                borderRadius="md"
                px={3}
                py={2}
                bg={isActive ? "gray.100" : "transparent"}
                _hover={{ bg: "gray.100" }}
              >
                <Flex w="100%" justify="space-between" align="center">
                  <Text>{sort.label}</Text>
                  {isActive && <FiCheck size={16} />}
                </Flex>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};

export default SortSelect;
