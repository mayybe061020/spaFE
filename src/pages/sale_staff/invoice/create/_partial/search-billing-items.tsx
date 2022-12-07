import { FC, useRef, useState } from "react";
import { Button, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import FoundBillingItem from "./_found-billing-item";
import { useQuery } from "@tanstack/react-query";
import { BillingItemData } from "../../../../../model/_price.model";
import { getListProduct } from "../../../../../services/product.service";

type props = {
  onChange?: (item: BillingItemData) => void;
};

const SearchBillingItems: FC<props> = ({ onChange }) => {
  const htmlRef = useRef<HTMLInputElement>(null);
  const [searchString, setSearchString] = useState<string>();

  const { data: foundItems, isLoading } = useQuery(
    ["search-bill-item", searchString],
    async () => searchItem(searchString),
    {
      enabled: !!searchString,
    }
  );

  async function searchItem(name?: string) {
    if (!name) {
      return [];
    }
    const result = await getListProduct(1, 50, {
      name: name,
    });

    return result.data;
  }

  const onBillingItem = (data: BillingItemData) => {
    onChange && onChange(data);
    setSearchString(undefined);
    if (htmlRef.current) {
      htmlRef.current.value = "";
    }
  };

  function onCommitSearch() {
    if (!htmlRef.current?.value) {
      return;
    }
    setSearchString(htmlRef.current?.value);
  }

  return (
    <div className={"flex flex-col space-y-4"}>
      <div className="flex w-full space-x-2 py-4">
        <TextInput
          placeholder={"tên sản phẩm, ít nhất 1 ký tự"}
          className={"flex-1"}
          defaultValue={searchString}
          ref={htmlRef}
        />

        <Button
          onClick={() => onCommitSearch()}
          type={"button"}
          leftIcon={<IconSearch />}
          variant={"filled"}
          color={"blue"}
        >
          <Text>Tìm</Text>
        </Button>
      </div>

      <div className="flex max-h-72 flex-col overflow-auto p-2">
        {isLoading && !!searchString ? <>Loading...</> : ""}
        {foundItems &&
          foundItems?.map((i, index) => (
            <FoundBillingItem
              onSelected={onBillingItem}
              key={`${i.id}-${index}`}
              data={i}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchBillingItems;
