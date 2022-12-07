/**
 * Model corresponding to the server response (full data).
 */
export interface SupplierModel {
  id: number;
  name: string;
  // 10 characters
  taxCode: string;
  description?: string;
  phone: string;
  email: string;
  address: string;
  image?: string;
}

/**
 * Interface corresponds to the API create payload.
 */
export interface SupplierCreateEntity
  extends Omit<SupplierModel, "id" | "image"> {
  image?: File;
}

/**
 * Interface corresponds to the API update payload.
 */
export interface SupplierUpdateEntity
  extends Omit<Partial<SupplierModel>, "image"> {
  id: number;
  image?: string | File;
}
