import axios, { AxiosError } from "axios";
import {
  IErrorResponse,
  ILoginResponse,
  PaginatedResponse,
  SearchParamUrl,
} from "../interfaces/api.interface";
import {
  UserCreateEntity,
  UserModel,
  UserUpdateEntity,
} from "../model/user.model";
import { jsonToFormData } from "../utilities/form-data.helper";

export async function loginApi(
  email: string,
  password: string
): Promise<ILoginResponse> {
  try {
    const apiResult = await axios.post("/auth/signin", {
      email,
      password,
    });

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

/**
 * Get all the account based on the user role.
 * @param page
 * @param size
 * @param searchParams
 */
export async function getAllAccount<modelType extends UserModel>(
  page: number,
  size = 10,
  searchParams?: SearchParamUrl
) {
  try {
    const apiResult = await axios.get<PaginatedResponse<modelType>>(`/user`, {
      params: {
        page,
        pageSize: size,
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

export async function getUserDetail<T extends UserModel>(id: number) {
  try {
    const apiResult = await axios.get<T>("/user/getById", {
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

/**
 * TODO: pending server support Multipart content-type.
 * @param payload
 */
export async function createUser<payloadType extends UserCreateEntity, result>(
  payload: payloadType
): Promise<result> {
  try {
    const apiResult = await axios.post<result>(
      "/user/save",
      jsonToFormData(payload)
    );
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function updateUser<payloadType extends UserUpdateEntity>(
  payload: payloadType
): Promise<boolean> {
  try {
    const apiResult = await axios.put<boolean>(
      "/user/update",
      jsonToFormData(payload)
    );
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}
