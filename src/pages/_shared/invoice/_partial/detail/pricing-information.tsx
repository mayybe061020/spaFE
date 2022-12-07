import { Divider, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { formatPrice } from "../../../../../utilities/pricing.helper";
import { BasePriceModel } from "../../../../../model/_price.model";
import {
  BillingProductItem,
  InvoiceModel,
} from "../../../../../model/invoice.model";
import useInvoicePricingOf from "../../../../../hooks/invoice-pricing.hook";
import { useEffect } from "react";

type PricingInformationProps = {
  item: BasePriceModel;
  addons: BillingProductItem[];

  onChange?: (
    calculated: Pick<InvoiceModel, "priceAfterTax" | "priceBeforeTax">
  ) => void;
};

const PricingInformation = ({
  item,
  addons,
  onChange,
}: PricingInformationProps) => {
  const clipboard = useClipboard({ timeout: 500 });
  const { subtotal, discount, tax, due } = useInvoicePricingOf({
    item,
    addons,
  });

  useEffect(() => {
    onChange && onChange({ priceBeforeTax: subtotal, priceAfterTax: due });
  }, [subtotal, due]);

  return (
    <div className={"flex flex-col rounded-lg border bg-white p-4"}>
      <h1 className="text-lg font-semibold">
        Thanh Toán <span className={"font-normal text-gray-400"}>(VND)</span>
      </h1>
      <Divider my={8} />

      <div className="flex select-none flex-col space-y-1 opacity-50 hover:opacity-100">
        <div className="flex px-2">
          <div className="w-24 font-semibold text-gray-500">Tổng cộng</div>
          <p className="flex-1 text-right font-semibold">
            {formatPrice(subtotal)}
          </p>
        </div>

        <div className="flex rounded bg-green-100 p-2 text-sm">
          <div className="w-24 font-semibold text-gray-500">Giảm giá</div>
          <p className="flex-1 text-right">-{formatPrice(discount)}</p>
        </div>

        <div className="flex rounded bg-gray-100 p-2 text-sm">
          <div className="w-24 font-semibold text-gray-500">Thuế (8%)</div>
          <p className="flex-1 text-right">+{formatPrice(tax)}</p>
        </div>
      </div>

      <Tooltip
        label={<small className={"text-xs text-gray-200"}>Click để copy</small>}
      >
        <div onClick={() => clipboard.copy(due)} className="mt-2 flex flex-col">
          <small
            className={
              "w-full text-right text-sm font-semibold uppercase text-gray-400"
            }
          >
            Thành Tiền
          </small>
          <h1
            className={
              "cursor-pointer select-none overflow-hidden text-ellipsis whitespace-nowrap text-right font-semibold leading-none"
            }
          >
            <span>{formatPrice(due)}</span>{" "}
            <small className={"select-none text-xs"}>VND</small>
          </h1>
        </div>
      </Tooltip>
    </div>
  );
};

export default PricingInformation;
