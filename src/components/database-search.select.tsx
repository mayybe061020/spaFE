import AutoCompleteItem, { AutoCompleteItemProp } from "./auto-complete-item";
import { Select, SelectProps } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import useDebounceHook from "../hooks/use-debounce.hook";

type searchFn<dataType extends object> = (
  key: string
) => Promise<AutoCompleteItemProp<dataType>[]>;

type ItemSearchSelectProps<dataType extends object> = {
  value: string | null;
  displayValue: AutoCompleteItemProp<dataType> | null;
  onSearching: searchFn<dataType>;
  onSelected: (value: string | null) => void;
  debouncedBy?: number;
} & Omit<
  SelectProps,
  "searchable" | "data" | "defaultValue" | "onSearchChange" | "onChange"
>;

/**
 * Generic autocomplete-select with API-searchable.
 * @param props
 * @constructor
 */
const DatabaseSearchSelect = <dataType extends object>({
  value,
  displayValue,
  onSearching,
  onSelected,
  debouncedBy,
  ...selectProps
}: ItemSearchSelectProps<dataType>) => {
  const {
    value: searchKey,
    onChange: setSearchWord,
    isDebouncing: isPending,
  } = useDebounceHook(debouncedBy);

  const { data: collection, isLoading: collectionLoading } = useQuery<
    AutoCompleteItemProp<dataType>[]
  >(
    ["search-mutation", searchKey, onSearching, value, displayValue?.value],
    async () => {
      const fnSearch: searchFn<dataType> =
        onSearching ?? (() => Promise.resolve([]));
      const foundCollection = searchKey ? await fnSearch(searchKey) : [];
      const filtered = foundCollection.filter((c) => c.value !== value);
      return [
        ...(displayValue ? [displayValue] : []),
        ...filtered,
      ] as AutoCompleteItemProp<dataType>[];
    }
  );

  return (
    <Select
      data={collectionLoading || !collection ? [] : collection}
      searchable
      defaultValue={value}
      onSearchChange={setSearchWord}
      onChange={onSelected}
      // replaceable props
      itemComponent={AutoCompleteItem}
      nothingFound={
        collectionLoading || isPending() ? "loading..." : "No result found"
      }
      maxDropdownHeight={200}
      {...selectProps}
    />
  );
};

export default DatabaseSearchSelect;
