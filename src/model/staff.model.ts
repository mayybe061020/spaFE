import { UserCreateEntity, UserModel, UserUpdateEntity } from "./user.model";
import { USER_ROLE } from "../const/user-role.const";

export interface StaffModel extends UserModel {
  role: USER_ROLE.sale_staff | USER_ROLE.technical_staff;
}

export type StaffCreateEntity = UserCreateEntity;
export type StaffUpdateEntity = UserUpdateEntity;
