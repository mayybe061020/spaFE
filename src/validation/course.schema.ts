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

const BaseCourseModelSchema = z
  .object({
    name: nameSchema,
    description: descriptionSchema,
    timeOfUse: z.number().min(1),
    duration: z.number().min(1),
    services: idDbSchema.array().min(1),
  })
  .extend(saleSchema.shape);
export default BaseCourseModelSchema;

export function getCourseModelSchema(mode: "view" | "create") {
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
    BaseCourseModelSchema.extend({ id: idSchema, image: imageSchema })
  );
}
