import axios, { AxiosError } from "axios";
import { ManagerModel } from "../model/manager.model";
import { IErrorResponse } from "../interfaces/api.interface";

/**
 * Get all free managers - managers that don't associate with any branch.
 */
export async function getAllFreeManager() {
  try {
    const apiResult = await axios.get<ManagerModel[]>("/user/getAllManager");
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}
