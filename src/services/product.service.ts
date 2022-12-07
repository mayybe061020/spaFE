import axios, { AxiosError } from "axios";
import {
  IErrorResponse,
  PaginatedResponse,
  SearchParamUrl,
} from "../interfaces/api.interface";
import {
  ProductCreateEntity,
  ProductModel,
  ProductUpdateEntity,
} from "../model/product.model";
import { jsonToFormData } from "../utilities/form-data.helper";
import { SupplierModel } from "../model/supplier.model";

export async function getListProduct(
  page = 1,
  pageSize = 10,
  searchParams?: SearchParamUrl
) {
  try {
    const apiResult = await axios.get<
      PaginatedResponse<ProductModel<SupplierModel>>
    >("/product", {
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

export async function createProduct(data: ProductCreateEntity) {
  try {
    const apiResult = await axios.post<boolean>(
      "/product/create",
      jsonToFormData(data)
    );

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function updateProduct(data: ProductUpdateEntity) {
  try {
    const apiResult = await axios.put<boolean>(
      "/product/update",
      jsonToFormData(data)
    );

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function getProductById(id: number) {
  try {
    const apiResult = await axios.get<ProductModel>("/product/getById", {
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
