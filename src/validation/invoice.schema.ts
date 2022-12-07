import { z } from "zod";
import { idDbSchema, priceSchema } from "./field.schema";

export const invoiceItemTypeSchema = z.enum(["service", "course"]);

export enum invoiceStatus {
  discarded = 0,
  pending = 1,
  approved = 2,
}

export const invoiceStatusSchema = z.nativeEnum(invoiceStatus);

export const invoiceCreateItemSchema = z.object({
  quantity: z.number().min(1).max(100),
  itemId: idDbSchema,
});

export const invoiceCreateSchema = z.object({
  scheduleId: idDbSchema.optional(),
  customerId: idDbSchema,
  priceBeforeTax: priceSchema,
  priceAfterTax: priceSchema,
  itemId: idDbSchema,
  itemType: invoiceItemTypeSchema,
  addons: z.array(invoiceCreateItemSchema).min(0),
});
