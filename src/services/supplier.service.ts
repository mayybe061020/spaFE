import axios, { AxiosError } from "axios";
import {
  IErrorResponse,
  PaginatedResponse,
  SearchParamUrl,
} from "../interfaces/api.interface";
import {
  SupplierCreateEntity,
  SupplierModel,
  SupplierUpdateEntity,
} from "../model/supplier.model";
import { jsonToFormData } from "../utilities/form-data.helper";

export async function getListSupplier(
  page = 1,
  pageSize = 10,
  searchParams?: SearchParamUrl
) {
  try {
    const apiResult = await axios.get<PaginatedResponse<SupplierModel>>(
      "/supplier",
      {
        params: {
          page,
          pageSize,
          ...(searchParams ?? {}),
        },
      }
    );

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function createSupplier(data: SupplierCreateEntity) {
  try {
    const apiResult = await axios.post<boolean>(
      "/supplier/create",
      jsonToFormData(data)
    );

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function updateSupplier(data: SupplierUpdateEntity) {
  try {
    const apiResult = await axios.put<boolean>(
      "/supplier/update",
      jsonToFormData(data)
    );

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function getSupplierById(id: number) {
  try {
    const apiResult = await axios.get<SupplierModel>("/supplier/getById", {
      params: {
        id,
      },
    });

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    // TODO switch to 404
    if (error.status === 400 || error.status === 404) {
      return null;
    }
    console.error(error);
    throw error.response?.data;
  }
}
