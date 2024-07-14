import axios, { AxiosRequestConfig, ResponseType } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

const HTTPService = {
  sendRequest: (
    method: HttpMethod,
    url: string,
    headerParams?: object,
    body?: object,
    { timeout = 60000 } = {},
    responseType: ResponseType = "json",
  ): Promise<any> => {
    const headers = headerParams || {};
    const request: AxiosRequestConfig<any> = {
      url,
      method,
      timeout,
      headers,
      responseType,
    };
    if (method.match(/GET|HEAD|DELETE/)) {
      request.params = body || {};
    } else {
      request.params = body || {};
    }
    return new Promise((resolve) => {
      axiosInstance.request(request).then((res: any) => {
        if (res.status >= 200 && res.status < 300) {
          resolve(res.data);
        } else {
          resolve({ isError: true, ...res.data });
        }
      });
    });
  },

  sendRequestWithToken: (
    method: HttpMethod,
    url: string,
    headerParams?: object,
    body?: object,
    { timeout = 60000 } = {},
    responseType: ResponseType = "json",
  ): Promise<any> => {
    const headers = headerParams || {};
    const request: AxiosRequestConfig<any> = {
      url,
      method,
      timeout,
      headers,
      responseType,
    };
    if (method.match(/GET|HEAD|DELETE/)) {
      request.params = body || {};
    } else {
      request.params = body || {};
    }
    const token = localStorage.getItem("access_token");
    request.headers = { Authorization: `Bearer ${token}` };

    return new Promise((resolve, reject) => {
      axiosInstance
        .request(request)
        .then((res: any) => {
          if (res.status >= 200 && res.status < 300) {
            resolve(res.data);
          } else {
            resolve({ isError: true, ...res.data });
          }
        })
        .catch((err) => {
          console.log(err.response.data)
          resolve({ isError: true, status: err.response.status, data: err.response.data });
        });
    });
  },
};

export default HTTPService;
