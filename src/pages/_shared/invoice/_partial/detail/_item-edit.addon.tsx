import { FC, useMemo } from "react";
import {
  discountedAmount,
  formatPrice,
  isBetweenSale,
} from "../../../../../utilities/pricing.helper";
import {
  ActionIcon,
  Badge,
  Image,
  NumberInput,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconArrowDown, IconArrowRight, IconX } from "@tabler/icons";
import { stateInputProps } from "../../../../../utilities/mantine.helper";
import { BillingProductItem } from "../../../../../model/invoice.model";
import { linkImage } from "../../../../../utilities/image.helper";

type props = {
  itemNo: number;
  addon?: BillingProductItem;
  onRemove?: (index: number) => void;
  onQuantityChange?: (quantity?: number) => void;
};

const ItemAddonEdit: FC<props> = ({
  itemNo,
  addon,
  onQuantityChange,
  onRemove,
}) => {
  const isSaleOff = useMemo(() => isBetweenSale(addon?.item), [addon?.item]);

  return !addon ? (
    <>
      <tr>
        <td colSpan={7}>Loading...</td>
      </tr>
    </>
  ) : (
    <>
      <tr className={`${!isSaleOff ? "" : "[&>td]:!border-b-transparent"}`}>
        <td className={"text-center"}>{itemNo}</td>
        <td>
          {addon.item.image && (
            <Image
              alt={addon.item.name}
              src={linkImage(addon.item.image)}
              width={32}
              height={32}
              fit={"cover"}
              radius={"md"}
            />
          )}
        </td>
        <td>
          <Tooltip label={addon.item.name}>
            <Text className={"overflow-hidden text-ellipsis"} size={"xs"}>
              {addon.item.name}
            </Text>
          </Tooltip>
        </td>
        <td className={"overflow-hidden text-right align-top"}>
          <div className="flex items-center justify-end space-x-2">
            <NumberInput
              defaultValue={addon.quantity}
              hideControls
              min={1}
              max={100}
              onChange={(v) => onQuantityChange && onQuantityChange(v)}
              {...stateInputProps(undefined, false, {
                required: true,
                variant: "default",
                size: "xs",
                weight: 400,
                textAlign: "center",
                placeholder: "amount...",
              })}
            />
            <IconX className={"mt-[2px]"} size={14} />
          </div>
        </td>
        <td className={"align-top"}>
          <p className={"overflow-hidden text-ellipsis"}>
            {addon.item.price && formatPrice(addon.item.price)}
          </p>
          <Text size={"xs"} color={"dimmed"}>
            per product
          </Text>
        </td>
        <td className={"align-top"}>
          <p className={"overflow-hidden text-ellipsis"}>
            {formatPrice((addon.item.price ?? 0) * (addon.quantity ?? 1))}
          </p>
        </td>
        <td className={"align-top"}>
          {addon && (
            <ActionIcon
              type={"button"}
              onClick={() => onRemove && onRemove(itemNo)}
              color={"red"}
            >
              <IconX />
            </ActionIcon>
          )}
        </td>
      </tr>
      {isSaleOff && (
        <tr>
          <td className={"!pt-1 !pr-0"} colSpan={5}>
            <div className="flex items-center justify-end space-x-2">
              <small className="font-semibold leading-none">
                Applied Discount!
              </small>
              <Badge
                variant={"filled"}
                color={"red"}
                size={"sm"}
                mt={2}
                leftSection={<IconArrowDown size={12} />}
              >
                {addon.item.discountPercent}%
              </Badge>
              <IconArrowRight className={"mt-[2px]"} size={14} />
              <Text className={"leading-none"} color={"dimmed"}>
                -
              </Text>
            </div>
          </td>
          <td className={"!pt-1"} colSpan={2}>
            <Text color={"dimmed"}>
              {formatPrice(discountedAmount(addon.item, addon.quantity))}
            </Text>
          </td>
        </tr>
      )}
    </>
  );
};

export default ItemAddonEdit;
