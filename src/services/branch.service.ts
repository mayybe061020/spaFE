import axios, { AxiosError } from "axios";
import {
  BranchCreateEntity,
  BranchModel,
  BranchUpdateEntity,
} from "../model/branch.model";
import {
  IErrorResponse,
  PaginatedResponse,
  SearchParamUrl,
} from "../interfaces/api.interface";
import { jsonToFormData } from "../utilities/form-data.helper";
import { ManagerModel } from "../model/manager.model";

/**
 * Get all available branches in the system.
 * @param page
 * @param pageSize
 * @param searchParams
 */
export async function getAllBranch(
  page: number,
  pageSize = 10,
  searchParams?: SearchParamUrl
) {
  try {
    const apiResult = await axios.get<
      PaginatedResponse<BranchModel<ManagerModel>>
    >("/branch", {
      params: {
        page,
        pageSize,
        ...(searchParams ?? {}),
      },
    });

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

/**
 * Create a new branch.
 * @param payload
 */
export async function createBranch(payload: BranchCreateEntity) {
  try {
    const formData = jsonToFormData(payload);
    const apiResult = await axios.post<boolean>("/branch/save", formData);
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function updateBranch(payload: BranchUpdateEntity) {
  try {
    const formData = jsonToFormData(payload);
    const apiResult = await axios.put<boolean>("/branch/update", formData);
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}
