import { Badge, Divider, Image, Text } from "@mantine/core";
import {
  discountedAmount,
  formatPrice,
  isBetweenSale,
} from "../../../../../utilities/pricing.helper";
import { IconArrowDown } from "@tabler/icons";
import { useServiceDetailQuery } from "../../../../../query/model-detail";
import { getListSpaServices } from "../../../../../services/spa-service.service";
import {
  AutoItemGenericType,
  rawToAutoItem,
} from "../../../../../utilities/fn.helper";
import { AutoCompleteItemProp } from "../../../../../components/auto-complete-item";
import { ServiceModel } from "../../../../../model/service.model";
import { useState } from "react";
import DatabaseSearchSelect from "../../../../../components/database-search.select";
import { stateInputProps } from "../../../../../utilities/mantine.helper";
import { BillingItemData } from "../../../../../model/_price.model";
import { linkImage } from "../../../../../utilities/image.helper";

type props = {
  onSelected: (item: BillingItemData | null) => void;
};

const PurchaseItemInformationEditable = ({ onSelected }: props) => {
  const [selectedId, setSelectedId] = useState<number>();

  const { data: item } = useServiceDetailQuery(selectedId, {
    onSuccess: (data) => onSelected(data),
  });

  const parserFn = (customer: ServiceModel) =>
    ({
      id: customer.id,
      name: customer.name,
      description: "" + customer.price,
    } as AutoItemGenericType<ServiceModel>);

  async function findServiceByName(name: string) {
    const result = await getListSpaServices(1, 100, {
      name,
    });
    return result.data.map(
      (r) => rawToAutoItem(r, parserFn) as AutoCompleteItemProp<ServiceModel>
    );
  }

  return (
    <div className={"flex flex-col space-y-2"}>
      <h1
        className={"select-none text-lg font-semibold capitalize text-gray-500"}
      >
        Sản phẩm đã chọn
      </h1>

      <div className={"flex space-x-4 rounded-lg border p-4"}>
        <Image
          radius={"lg"}
          width={120}
          height={120}
          src={linkImage(item?.image)}
          alt={item?.name}
          placeholder
        />

        <div className="flex flex-1 flex-col">
          <DatabaseSearchSelect
            value={selectedId ? String(selectedId) : null}
            displayValue={
              item
                ? {
                    ...rawToAutoItem(item, parserFn),
                    disabled: true,
                  }
                : null
            }
            onSearching={findServiceByName}
            onSelected={(id) => setSelectedId(id ? Number(id) : undefined)}
            {...stateInputProps("Dịch Vụ", false, {
              required: true,
            })}
          />

          <Divider my={12} />
          <Text className={"line-clamp-2"}>{item?.description}</Text>
          <Divider my={12} />
          {item && (
            <div className="flex space-x-8">
              <span className={"font-semibold uppercase"}>Giá tiền</span>
              <div className="flex flex-1 flex-col items-end">
                {isBetweenSale(item) ? (
                  <>
                    <Text
                      strikethrough
                      className={"select-none"}
                      color={"dimmed"}
                    >
                      {formatPrice(item.price)} VND
                    </Text>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={"filled"}
                        color={"red"}
                        leftSection={<IconArrowDown size={14} />}
                        className={"select-none"}
                      >
                        {item.discountPercent}%
                      </Badge>
                      <Text weight={"bold"} size={"lg"}>
                        {formatPrice(
                          Math.ceil(item.price - discountedAmount(item, 1))
                        )}{" "}
                        VND
                      </Text>
                    </div>
                  </>
                ) : (
                  <Text size={"lg"}>
                    <b>{formatPrice(item.price)}</b> VND
                  </Text>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseItemInformationEditable;
