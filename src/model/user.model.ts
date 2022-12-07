import { USER_ROLE } from "../const/user-role.const";
import { GENDER } from "../const/gender.const";

/**
 * Base model for the user in the system.
 *
 * All users must have these fields included.
 */
export interface UserModel {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: USER_ROLE;
  image?: string;
  dateOfBirth: string;
  phone: string;
  gender: GENDER;
  address: string;
}

export interface UserCreateEntity
  extends Omit<UserModel, "id" | "role" | "image" | "dateOfBirth"> {
  // must have in payload
  password: string;
  image?: File;
  dateOfBirth?: Date;
}

export interface UserUpdateEntity
  extends Omit<Partial<UserModel>, "id" | "role" | "image" | "dateOfBirth"> {
  id: number;
  // if the user does not update the avatar,
  // the datatype will remain the same (as string)
  // otherwise the avatar will be a File.
  image?: File | string;
  dateOfBirth?: Date;
}
