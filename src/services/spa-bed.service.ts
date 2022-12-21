import axios, { AxiosError } from "axios";
import { IErrorResponse, PaginatedResponse } from "../interfaces/api.interface";
import {
  SpaBedCreateEntity,
  SpaBedModel,
  SpaBedUpdateEntity,
} from "../model/spa-bed.model";

export async function getListSpaBed() {
  try {
    const apiResult = await axios.get<PaginatedResponse<SpaBedModel>>("/bed", {
      params: {
        page: 1,
        pageSize: 100,
      },
    });
    return apiResult.data?.data ?? [];
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function updateSpaBed(data: SpaBedUpdateEntity) {
  try {
    const apiResult = await axios.put<boolean>("/bed/update", data);
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function createSpaBed(data: SpaBedCreateEntity) {
  try {
    const apiResult = await axios.post<boolean>("/bed/create", data);
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function deleteSpaBed(id: number) {
  try {
    const apiResult = await axios.post<boolean>("/bed/delete", { id });
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}
