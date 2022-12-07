import { BasePriceModel } from "../model/_price.model";
import dayjs from "dayjs";

export function formatPrice(price: number) {
  // 123456 -> 123.456
  return new Intl.NumberFormat("vi-VN").format(price);
}

/**
 * the date is between the sale duration
 * Either:
 * - After the starting date
 *  + Without the ending date.
 * - After the starting date
 *  + Before the ending date
 * - Before ending date
 *  + Without the starting date
 */
export function isBetweenSale(priceInfo?: BasePriceModel) {
  if (
    (!priceInfo?.discountEnd && !priceInfo?.discountStart) ||
    !priceInfo?.discountPercent
  ) {
    return false;
  }

  if (priceInfo.discountStart) {
    if (dayjs().isBefore(new Date(priceInfo.discountStart), "date")) {
      return false;
    }
  }

  if (priceInfo.discountEnd) {
    if (dayjs().isAfter(new Date(priceInfo.discountEnd), "date")) {
      return false;
    }
  }
  return true;
}

/**
 * Return true if the sale is in the past, or not available.
 * @param priceInfo
 */
export function isSaleNotViable(priceInfo?: BasePriceModel) {
  if (
    (!priceInfo?.discountEnd && !priceInfo?.discountStart) ||
    !priceInfo?.discountPercent
  ) {
    return true;
  }

  if (priceInfo.discountEnd) {
    // the current date is after the ending sale.
    return dayjs().isAfter(new Date(priceInfo.discountEnd), "date");
  }

  // the current date is either before / within sale.
  return false;
}

/**
 * Calculate the discounting price after discount.
 * @param discountData
 */
export function calculateDiscountAmount(discountData: BasePriceModel) {
  return ((discountData.discountPercent ?? 0) * discountData.price) / 100;
}

export function discountedAmount(priceInfo?: BasePriceModel, quantity = 1) {
  if (!priceInfo) {
    return 0;
  }

  return calculateDiscountAmount(priceInfo) * quantity;
}
