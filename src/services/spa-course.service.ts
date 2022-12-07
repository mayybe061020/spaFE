import {
  IErrorResponse,
  PaginatedResponse,
  SearchParamUrl,
} from "../interfaces/api.interface";
import axios, { AxiosError } from "axios";
import {
  jsonToFormData,
  SimpleArrayParseStrategy,
} from "../utilities/form-data.helper";
import {
  CourseCreateEntity,
  CourseModel,
  CourseUpdateEntity,
} from "../model/course.model";
import { ServiceModel } from "../model/service.model";

export async function getListSpaCourses(
  page = 1,
  pageSize = 10,
  searchParams?: SearchParamUrl
) {
  try {
    const apiResult = await axios.get<
      PaginatedResponse<CourseModel<ServiceModel>>
    >("/course", {
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

export async function getCourseDetail(id: number) {
  try {
    const apiResult = await axios.get<CourseModel>("/course/getById", {
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

export async function createSpaCourse(data: CourseCreateEntity) {
  try {
    const apiResult = await axios.post<boolean>(
      "/course/create",
      jsonToFormData(data, new FormData(), {
        strategy: SimpleArrayParseStrategy,
      })
    );

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function updateSpaCourse(data: CourseUpdateEntity) {
  try {
    const apiResult = await axios.put<boolean>(
      "/course/update",
      jsonToFormData(data, new FormData(), {
        strategy: SimpleArrayParseStrategy,
      })
    );

    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}
