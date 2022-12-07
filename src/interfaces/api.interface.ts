/**
 * TODO: verify with team backend.
 * Standard error response.
 */
export interface IErrorResponse {
  path: string;
  error: string;
  message: string;
  status: number;
}

export interface ILoginResponse {
  accessToken: string;
}

export interface PaginatedResponse<T> {
  data: Array<T>;
  pageIndex: number;
  totalElement: number;
  totalPage: number;
}

export interface SearchParamUrl {
  [key: string]: string | number;
}
