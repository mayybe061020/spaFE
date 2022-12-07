import { USER_ROLE } from "../const/user-role.const";
import { UserCreateEntity, UserModel, UserUpdateEntity } from "./user.model";

/**
 * Raw representation data from the server response.
 */
export interface ManagerModel extends UserModel {
  // this field is fixed to be manager role.
  role: USER_ROLE.manager;
}

/**
 * Interface for the payload to register manager.
 * This payload interface will not have id field,
 * and dataType of dateOfBirth and avatar will be different.
 */
export type ManagerCreateEntity = UserCreateEntity;

/**
 * Interface for the payload to update manager.
 * This payload interface will have dataType of dateOfBirth and avatar different.
 */
export type ManagerUpdateEntity = UserUpdateEntity;
