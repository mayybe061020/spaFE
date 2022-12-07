import {
  IErrorResponse,
  PaginatedResponse,
  SearchParamUrl,
} from "../interfaces/api.interface";
import axios, { AxiosError } from "axios";
import {
  ServiceCreateEntity,
  ServiceModel,
  ServiceUpdateEntity,
} from "../model/service.model";
import {
  jsonToFormData,
  StringifyParseStrategy,
} from "../utilities/form-data.helper";

export async function getListSpaServices(
  page = 1,
  pageSize = 10,
  searchParams?: SearchParamUrl
) {
  try {
    const apiResult = await axios.get<PaginatedResponse<ServiceModel>>(
      "/service",
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

export async function getDetailSpaService(id: number) {
  try {
    const apiResult = await axios.get<ServiceModel>("/service/getById", {
      params: {
        id,
      },
    });

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function createSpaService(data: ServiceCreateEntity) {
  try {
    const apiResult = await axios.post<boolean>(
      "/service/create",
      jsonToFormData(data, new FormData(), { strategy: StringifyParseStrategy })
    );

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function updateSpaService(data: ServiceUpdateEntity) {
  try {
    const apiResult = await axios.put<boolean>(
      "/service/update",
      jsonToFormData(data, new FormData(), { strategy: StringifyParseStrategy })
    );

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}
