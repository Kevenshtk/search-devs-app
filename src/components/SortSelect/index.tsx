import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Select, createListCollection, Portal } from "@chakra-ui/react";

type SortSelectProps = {
  currentSort: string;
  setSortValue: (value: string) => void;
};

const SortSelect = ({ currentSort, setSortValue }: SortSelectProps) => {
  const { t } = useTranslation();

  const sorts = useMemo(
    () =>
      createListCollection({
        items: [
          { label: t("sort_updated"), value: "updated" },
          { label: t("sort_created"), value: "created" },
          { label: t("sort_pushed"), value: "pushed" },
          { label: t("sort_name"), value: "full_name" },
        ],
      }),
    [t],
  );

  return (
    <Select.Root
      collection={sorts}
      width="240px"
      value={[currentSort]}
      onValueChange={(e) => setSortValue(e.value[0])}
      bg="white"
      borderRadius="md"
      border="none"
      _focus={{ outline: "none", boxShadow: "none" }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText
            placeholder={
              sorts.items.find((s) => s.value === currentSort)?.label ||
              "Select sort"
            }
          />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {sorts.items.map((sort) => (
              <Select.Item item={sort} key={sort.value}>
                {sort.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default SortSelect;
