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
import { blob } from "stream/consumers";
import { date } from "zod";

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

export async function exportPdf(id: number) {
  try {
    const apiResult = await axios.get("/bill/pdf", {
      params: {
        id,
      },
    });
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export function exportBill(id: number) {
  fetch('http://localhost:8080/api/bill/pdf?id=' + id)
    .then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'bill_' + id + '.pdf';
        a.click();
      })
    })
    .catch(rejected => {
      console.log(rejected);
    })
}
