import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES } from "../const/file.const";
import { GENDER } from "../const/gender.const";
import dayjs from "dayjs";
import { USER_ROLE } from "../const/user-role.const";
import { ZodObject } from "zod/lib/types";
import { MAX_PRICE } from "../const/_const";

export const idDbSchema = z.number().min(1);
export const unitProductSchema = z.string().min(1);
export const amountPerUnitSchema = z.number().min(0);
export const priceSchema = z.number().min(1).max(MAX_PRICE);
export const nameSchema = z.string().min(3).max(120);
export const taxCodeSchema = z.string().length(10);
export const descriptionSchema = z.string().max(200);
export const emailSchema = z.string().email().max(120);
export const phoneSchema = z
  .string()
  .refine((p) => !!p && p.match(/^0\d{9}$/), {
    message: "Phone number does not have correct format.",
  });

export const addressSchema = z.string().min(3).max(200);
export const fileUploadSchema = z
  .any()
  .refine((f) => !!f, { message: "A file is required" })
  .refine((f) => !!f && f.size <= 5000000, {
    message: "Max file size is 5MB",
  });

export const imageTypeSchema = z
  .any()
  .refine((f) => !!f && ACCEPTED_IMAGE_TYPES.includes(f.type), {
    message: "Only accept .jpg, .jpeg, .png and .webp",
  });

export const ageSchemaFn = (config?: { minAge?: number; maxAge?: number }) => {
  // the default limit the age to be manager is 18 years old.
  const dateOfAgeMin = dayjs(new Date()).subtract(
    config?.minAge ?? 18,
    "years"
  );
  // the default max the age to be manager is 64 years old.
  const dateOfAgeMax = dayjs(new Date()).subtract(
    config?.maxAge ?? 64,
    "years"
  );
  return z.date().min(dateOfAgeMax.toDate()).max(dateOfAgeMin.toDate());
};

export const genderSchema = z.nativeEnum(GENDER);

export const passwordSchema = z.string().min(3).max(32);

export const createPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

// for no need confirm
export const createPassword2Schema = z.object({
  password: passwordSchema,
});

export const roleSchema = z.nativeEnum(USER_ROLE, {
  required_error: "The role is required.",
  invalid_type_error: "The role type is invalid",
});

export const refineSaleSchema = <
  T extends ZodObject<{
    price: z.ZodNumber;
    discountPercent: z.ZodNullable<z.ZodNumber>;
    discountStart: z.ZodNullable<z.ZodDate>;
    discountEnd: z.ZodNullable<z.ZodDate>;
  }>
>(
  schema: T
): T => {
  return (
    schema
      .refine(
        ({ discountPercent, discountEnd, discountStart }) => {
          if (discountPercent !== undefined) {
            return discountEnd !== undefined || discountStart !== undefined;
          }

          return true;
        },
        { path: ["discountPercent"] }
      )
      // Refine time end sale
      .refine(
        ({ discountEnd, discountStart }) => {
          if (discountEnd && dayjs(discountEnd).isBefore(new Date())) {
            // sale end date cannot start before today.
            return false;
          }
          if (discountEnd && discountStart) {
            // if both dates are available, discountEnd must after discountStart.
            return dayjs(discountEnd).isAfter(discountStart);
          }

          return true;
        },
        {
          message:
            "Invalid sale ending time. It must after the current date, and after the sale start date.",
          path: ["discountEnd"],
        }
      )
      .refine(
        ({ discountStart }) =>
          !discountStart || dayjs(discountStart).isAfter(new Date()),
        {
          path: ["discountStart"],
          message: "Start date must be after today date!",
        }
      ) as unknown as T
  );
};

export const saleSchema = z.object({
  price: priceSchema,
  discountStart: z.date().optional().nullable(),
  discountEnd: z.date().optional().nullable(),
  discountPercent: z.number().optional().nullable(),
}) as unknown as ZodObject<{
  price: z.ZodNumber;
  discountStart: z.ZodNullable<z.ZodDate>;
  discountEnd: z.ZodNullable<z.ZodDate>;
  discountPercent: z.ZodNullable<z.ZodNumber>;
}>;
