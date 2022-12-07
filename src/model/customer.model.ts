import { GENDER } from "../const/gender.const";

export type CustomerModel = {
  id: number;
  name: string;
  phone: string;
  email: string;
  gender: GENDER;
  // ISO format
  dateOfBirth?: string;
  address?: string;
};

export type CustomerCreateEntity = Omit<CustomerModel, "id" | "dateOfBirth"> & {
  dateOfBirth?: Date;
};

export type CustomerUpdateEntity = Omit<
  Partial<CustomerModel>,
  "dateOfBirth"
> & {
  dateOfBirth?: Date;
};
