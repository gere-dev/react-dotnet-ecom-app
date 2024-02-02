import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5027/api/";

const responseBody = (response: AxiosResponse) => response.data;

const handleServerError = (error: AxiosError) => {
  const { data, status } = error.response as AxiosResponse;
  console.log(status, "this is the status");

  switch (status) {
    case 400:
      toast.error(data.title);
      break;
    case 401:
      toast.error(data.title);
      break;
    case 404:
      toast.error(data.title);
      break;
    case 500:
      throw error; // Let the error boundary handle this error
    default:
      break;
  }

  return Promise.reject(error.response);
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return handleServerError(error);
  }
);

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error: AxiosError) => {
//     const { data, status } = error.response as AxiosResponse;
//     console.log(status, "this is the status");
//     switch (status) {
//       case 400:
//         toast.error(data.title);
//         break;
//       case 401:
//         toast.error(data.title);
//         break;
//       case 404:
//         toast.error(data.title);
//         break;
//       case 500:
//         window.location.href = "/server-error";
//         break;
//       default:
//         break;
//     }
//     return Promise.reject(error.response);
//   }
// );

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  details: (id: number) => requests.get(`products/${id}`),
};

const TestError = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/anauthorized"),
  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const Basket = {
  get: () => requests.get("basket"),
  addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const agent = {
  Catalog,
  TestError,
  list: () => requests.get("products"),
  Basket,
};

export default agent;
