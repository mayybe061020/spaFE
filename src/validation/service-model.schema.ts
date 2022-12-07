import { z } from "zod";
import {
  descriptionSchema,
  fileUploadSchema,
  idDbSchema,
  imageTypeSchema,
  nameSchema,
  refineSaleSchema,
  saleSchema,
} from "./field.schema";
import { ProductInServiceModelSchema } from "./product-model.schema";

const BaseServiceModelSchema = z
  .object({
    name: nameSchema,
    description: descriptionSchema,
    duration: z.number().min(0),
    products: ProductInServiceModelSchema.array().min(1),
  })
  .extend(saleSchema.shape);

export default BaseServiceModelSchema;

export function getServiceModelSchema(mode: "view" | "create") {
  const idSchema =
    mode === "create" ? idDbSchema.optional().nullable() : idDbSchema;
  const imageSchema =
    mode === "create"
      ? fileUploadSchema.and(imageTypeSchema).nullable().optional()
      : fileUploadSchema
          .and(imageTypeSchema)
          .or(z.string())
          .nullable()
          .optional();
  return refineSaleSchema(
    BaseServiceModelSchema.merge(z.object({ id: idSchema, image: imageSchema }))
  );
}
