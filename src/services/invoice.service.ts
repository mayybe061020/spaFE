import {
  IErrorResponse,
  PaginatedResponse,
  SearchParamUrl,
} from "../interfaces/api.interface";
import axios, { AxiosError } from "axios";
import {
  InvoiceCreateEntity,
  InvoiceModel,
  InvoiceUpdateEntity,
} from "../model/invoice.model";

export async function getListInvoices(
  page = 1,
  pageSize = 10,
  searchParams?: SearchParamUrl
) {
  try {
    const apiResult = await axios.get<PaginatedResponse<InvoiceModel>>(
      "/bill",
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

export async function getDetailInvoice(id: number) {
  try {
    const apiResult = await axios.get<InvoiceModel>("/bill/getById", {
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

export async function createInvoice(data: InvoiceCreateEntity) {
  try {
    const apiResult = await axios.post<boolean>("/bill/create", data);

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function updateInvoiceStatus(data: InvoiceUpdateEntity) {
  try {
    const apiResult = await axios.put<boolean>("/bill/update", data);

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}
