import {
  AxiosInstance,
  AxiosRequestHeaders,
  RawAxiosRequestHeaders,
} from "axios";

export const HOST_INTERCEPT_SKIP_HEADER = "host-intercept-skip";

/**
 * Intercept the axios and add the domain to the request.
 * @param instance
 * @param baseUrl
 * @param headers
 * @constructor
 */
export function ApiHostRequestInterceptor(
  instance: AxiosInstance,
  baseUrl: string,
  headers?: RawAxiosRequestHeaders
) {
  return instance.interceptors.request.use(
    (config) => {
      const header = config.headers?.[HOST_INTERCEPT_SKIP_HEADER];
      if (header && Boolean(header)) {
        return config;
      }
      const { url } = config;
      if (!url) return config;
      if (url.startsWith("/")) {
        config.url = `${baseUrl}${config.url}`;
      } else {
        config.url = `${baseUrl}/${config.url}`;
      }
      if (headers) {
        Object.keys(headers).forEach((fieldName) => {
          (config.headers ?? {})[fieldName] = headers[fieldName];
        });
      }
      return config;
    },
    (e) => e,
    { synchronous: true }
  );
}
