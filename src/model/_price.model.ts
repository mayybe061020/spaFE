export interface BasePriceModel {
  price: number;
  discountPercent: number | null;
  discountStart: string | null;
  discountEnd: string | null;
}

export type BillingItemData = {
  id: number;
  name: string;
  image?: string;
  description?: string;
} & BasePriceModel;
