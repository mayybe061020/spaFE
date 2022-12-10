/**
 * Raw representation data from the server response.
 *
 * `manager` field is generic for populating data purposes.
 * - By default, it's the id of the associated manager.
 * -
 */
import { ServiceModel } from "./service.model";
import { CourseModel } from "./course.model";
import { BillingItemData } from "./_price.model";
import { z } from "zod";
import { invoiceStatusSchema } from "../validation/invoice.schema";
import { CustomerModel } from "./customer.model";
import { StaffModel } from "./staff.model";
import { BranchModel } from "./branch.model";

export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>;
export const InvoiceStatusArray = ["Hủy", "Chờ xác nhận", "Đã xác nhận"];

export type BillingProductItem = {
  quantity: number;
  item: BillingItemData;
};

export interface InvoiceModel {
  id: number;
  branch: BranchModel;
  customer: CustomerModel;
  staff: StaffModel;
  status: InvoiceStatus;
  createDate: string;
  approvedDate: string;
  priceBeforeTax: number;
  priceAfterTax: number;
  item: ServiceModel | CourseModel;
  itemType: "service" | "course";
  addons: BillingProductItem[];
}

export type BillingProductCreateEntity = Omit<BillingProductItem, "item"> & {
  itemId: number;
};

export type InvoiceCreateEntity = Omit<
  InvoiceModel,
  | "id"
  | "branch"
  | "staff"
  | "createDate"
  | "item"
  | "itemType"
  | "addons"
  | "status"
  | "approvedDate"
  | "customer"
> & {
  scheduleId?: number;
  itemId?: number;
  itemType?: "service" | "course";
  customerId?: number;
  addons: BillingProductCreateEntity[];
};

export type InvoiceUpdateEntity = Pick<InvoiceModel, "id" | "status"> &
  Pick<InvoiceCreateEntity, "addons" | "priceBeforeTax" | "priceAfterTax">;
