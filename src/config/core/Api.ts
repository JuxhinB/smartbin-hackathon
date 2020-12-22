import axios, { AxiosRequestConfig } from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com";

interface FetchApiProps extends AxiosRequestConfig {
  withBearer?: boolean;
  customHeaders?: object;
}

export async function fetchApi({
  method,
  url,
  data = null,
  headers = null,
  customHeaders,
  withBearer,
  ...restProps
}: FetchApiProps) {
  console.log("ok");

  let config = {
    method: method,
    url: `${baseUrl}${url}`
  };

  const defaultHeaders = {
    Accept: "application/json"
  };

  let withBearerHeader = null;
  let jointHeaders = null;

  try {
    withBearerHeader = {
      Authorization: `Bearer ${getToken()}`
    };
    if (withBearer && getToken()) {
    } else {
      throw new Error("Api: token not set");
    }
  } catch (error) {
    throw new Error("Api: token get fail");
  }

  if (headers) {
    jointHeaders = {
      ...defaultHeaders,
      headers: {
        ...customHeaders,
        ...withBearerHeader
      }
    };
  }

  try {
    return axios({
      ...config,
      ...jointHeaders,
      ...restProps
    });
  } catch (error) {
    return error;
  }
}

function getToken() {
  if (true) {
    return "token";
  } else {
    return false;
  }
}
