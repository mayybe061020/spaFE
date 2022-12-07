import { ManagerModel } from "./manager.model";

/**
 * Raw representation data from the server response.
 *
 * `manager` field is generic for populating data purposes.
 * - By default, it's the id of the associated manager.
 * -
 */
export interface BranchModel<
  managerType extends number | ManagerModel | ManagerModel[] = number
> {
  id: number;
  name: string;
  manager: managerType;
  phone: string;
  address: string;
  email: string;
  logo: string;
}

/**
 * Interface for the payload to register branch.
 * This payload interface will not have id field,
 * and dataType of the logo will be different.
 */
export interface BranchCreateEntity<
  managerType extends number | ManagerModel = number
> extends Omit<BranchModel<managerType>, "id" | "logo"> {
  // if the user does not update the logo,
  // the datatype will remain the same (as string)
  // otherwise the logo will be a File.
  logo?: File | string;
}

/**
 * Interface for the payload to update branch.
 * This payload interface will not have id field,
 * and dataType of the logo will be different.
 */
export interface BranchUpdateEntity<
  managerType extends number | ManagerModel = number
> extends Omit<BranchModel<managerType>, "logo"> {
  // if the user does not update the logo,
  // the datatype will remain the same (as string)
  // otherwise the logo will be a File.
  logo?: File | string;
}
