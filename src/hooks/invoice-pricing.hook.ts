import { BasePriceModel } from "../model/_price.model";
import { useEffect, useState } from "react";
import {
  calculateDiscountAmount,
  isBetweenSale,
} from "../utilities/pricing.helper";
import { InvoiceModel } from "../model/invoice.model";

interface CalculatePriceModel {
  subtotal: number;
  discount: number;
  tax: number;
  due: number;
}

type props = Partial<
  Pick<InvoiceModel, "addons" | "priceBeforeTax" | "priceAfterTax"> & {
    item: BasePriceModel;
  }
>;

const useInvoicePricingOf = ({
  priceBeforeTax,
  priceAfterTax,
  item,
  addons,
}: props) => {
  const [priceItem, setPriceItem] = useState({
    subtotal: 0,
    discount: 0,
    tax: 0,
    due: 0,
  } as CalculatePriceModel);

  useEffect(() => {
    let subtotal = 0;
    let discount = 0;
    let due: number;
    let tax: number;
    // price will be
    // subtotal = all product original price x quantity.
    // discount = all product discounted price x quality.
    // tax = 8% of (subtotal - discount)
    // due = (subtotal - discount) + tax

    if (priceBeforeTax && priceAfterTax) {
      // the bill was completed. The price will be fixed!
      subtotal = priceBeforeTax;
      due = priceAfterTax;
      tax = Math.floor((due / 92) * 100) - due;
      discount = subtotal - due + tax;

      setPriceItem({
        subtotal,
        discount,
        tax,
        due,
      });
      return;
    }

    const cal = calWithQuantity(item, 1);
    subtotal += cal.subtotal;
    discount += cal.discount;

    (addons ?? []).forEach((addon) => {
      const cal = calWithQuantity(addon.item, addon.quantity);
      subtotal += cal.subtotal;
      discount += cal.discount;
    });

    due = subtotal - discount;
    tax = Math.floor(due * 0.08); // 8 percent;
    due = due + tax;
    setPriceItem({
      subtotal,
      discount,
      tax,
      due,
    });
  }, [addons, item, priceAfterTax, priceBeforeTax]);

  function calWithQuantity(base?: BasePriceModel, quantity = 1) {
    const sub = (base?.price ?? 0) * quantity;
    let discount = 0;
    if (base && isBetweenSale(base)) {
      discount += Math.floor(calculateDiscountAmount(base)) * quantity;
    }
    return {
      subtotal: sub,
      discount,
    };
  }

  return priceItem;
};

export default useInvoicePricingOf;
