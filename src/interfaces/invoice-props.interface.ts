import { z } from "zod";
import { invoiceItemTypeSchema } from "../validation/invoice.schema";
import { BasePriceModel } from "../model/_price.model";

export type ItemTableViewData = {
  id: number;
  image?: string;
  name: string;
} & BasePriceModel;

type ItemTableBaseProps = {
  no: number;
  type: z.infer<typeof invoiceItemTypeSchema>;
  quantity: number;
  categoryClass: string;
};

export type ItemTableViewProps = {
  data: ItemTableViewData;
};

export type ItemTableCreateProps = {
  data?: number;
  onQuantityChange?: (quantity?: number) => void;
  quantityDisabled?: boolean;
  onRemove?: (index: number) => void;
};

export type ItemTableProps = ItemTableBaseProps &
  ItemTableViewProps &
  ItemTableCreateProps;
