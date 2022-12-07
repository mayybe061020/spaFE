import { FC, useMemo } from "react";
import { Badge, Image, Text, Tooltip } from "@mantine/core";
import { IconArrowDown, IconArrowRight, IconX } from "@tabler/icons";
import {
  discountedAmount,
  formatPrice,
  isBetweenSale,
} from "../../../../../utilities/pricing.helper";
import { BillingProductItem } from "../../../../../model/invoice.model";
import { linkImage } from "../../../../../utilities/image.helper";

export type ItemTableProps = {
  no: number;
  data: BillingProductItem;
};

const ItemAddonReadonly: FC<ItemTableProps> = ({ data, no }) => {
  const isSaleOff = useMemo(() => isBetweenSale(data.item), [data.item]);

  return (
    <>
      <tr className={!isSaleOff ? "" : "[&>td]:!border-b-transparent"}>
        <td className={"text-center align-top"}>{no}</td>
        <td className={"align-top"}>
          <Image
            alt={data.item.name}
            src={linkImage(data.item.image)}
            width={32}
            height={32}
            fit={"cover"}
            radius={"md"}
          />
        </td>
        <td className={"align-top"}>
          <Tooltip label={data.item.name}>
            <Text className={"overflow-hidden text-ellipsis"} size={"xs"}>
              {data.item.name}
            </Text>
          </Tooltip>
        </td>
        <td className={"overflow-hidden text-right align-top"}>
          <div className="flex items-center justify-end space-x-2">
            <Text>{data.quantity}</Text>
            <IconX className={"mt-[2px]"} size={14} />
          </div>
        </td>
        <td className={"align-top"}>
          <p className={"overflow-hidden text-ellipsis"}>
            {data.item.price && formatPrice(data.item.price)}
          </p>
          <Text size={"xs"} color={"dimmed"}>
            / sản phẩm
          </Text>
        </td>
        <td className={"align-top"}>
          <p className={"overflow-hidden text-ellipsis"}>
            {formatPrice((data.item.price ?? 0) * (data.quantity ?? 1))}
          </p>
        </td>
      </tr>
      {isSaleOff && (
        <tr>
          <td className={"!pt-1 !pr-0"} colSpan={5}>
            <div className="flex items-center justify-end space-x-2">
              <small className="font-semibold leading-none">
                Áp dụng giảm giá!
              </small>
              <Badge
                variant={"filled"}
                color={"red"}
                size={"sm"}
                mt={2}
                leftSection={<IconArrowDown size={12} />}
              >
                {data.item.discountPercent}%
              </Badge>
              <IconArrowRight className={"mt-[2px]"} size={14} />
              <Text className={"leading-none"} color={"dimmed"}>
                -
              </Text>
            </div>
          </td>
          <td className={"!pt-1"}>
            <Text color={"dimmed"}>
              {formatPrice(discountedAmount(data.item, data.quantity))}
            </Text>
          </td>
        </tr>
      )}
    </>
  );
};

export default ItemAddonReadonly;
