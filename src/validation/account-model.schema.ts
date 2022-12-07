import { z } from "zod";
import {
  addressSchema,
  ageSchemaFn,
  emailSchema,
  fileUploadSchema,
  genderSchema,
  imageTypeSchema,
  nameSchema,
  passwordSchema,
  phoneSchema,
} from "./field.schema";
import { staffRoleSchema } from "../const/user-role.const";

/**
 * base validation schema for user model.
 */
export const baseUserSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  dateOfBirth: ageSchemaFn(),
  gender: genderSchema,
  address: addressSchema,
  image: fileUploadSchema
    .and(imageTypeSchema)
    // or the avatar field can be url src of the image.
    .or(z.string())
    // this field is not required.
    .nullable()
    .optional(),
});

/**
 * Validation schema for the manager model.
 * It extends from the baseUserSchema with role fixed to be 'manager'
 */
export const managerModelSchema = baseUserSchema;

/**
 * Validation schema for the employee model.
 * It extends from the baseUserSchema with role fixed to be 'employee'
 */
export const employeeModelSchema = baseUserSchema.extend({
  role: staffRoleSchema,
});

/**
 * Zod Validation schema for the form related to user-model
 * with password/confirm password field.
 * @param baseUserModelSchema
 * @param withConfirmPassword
 */
export const userRegisterSchemaFn = <T extends typeof baseUserSchema.shape>(
  baseUserModelSchema: z.ZodObject<T>,
  withConfirmPassword = true
) => {
  if (withConfirmPassword) {
    return baseUserModelSchema
      .merge(
        z.object({
          password: passwordSchema,
          confirmPassword: passwordSchema,
        })
      )
      .refine(
        (data) => {
          /**
           * Typescript was not able to detect a nested type in merge schema.
           * So we're manually parsing the type to silent the error.
           */
          const safeparseData = data as unknown as {
            password: string;
            confirmPassword: string;
          };
          return safeparseData.password === safeparseData.confirmPassword;
        },
        {
          message: "Passwords don't match",
          path: ["confirmPassword"], // path of error,
        }
      );
  }
  return baseUserModelSchema.merge(
    z.object({
      password: passwordSchema,
    })
  );
};
