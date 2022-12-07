import { z } from "zod";
import {
  addressSchema,
  descriptionSchema,
  emailSchema,
  nameSchema,
  phoneSchema,
  taxCodeSchema,
} from "./field.schema";

const SupplierModelSchema = z.object({
  name: nameSchema,
  taxCode: taxCodeSchema,
  description: descriptionSchema,
  phone: phoneSchema,
  email: emailSchema,
  address: addressSchema,
});

export default SupplierModelSchema;
