import { ResponseError } from "@/types/miscTypes";
import { STD_ERR_MSG, STD_SRVR_ERR_MSG } from "@/utils/constants";
import axios, { AxiosError } from "axios";

export const api = axios.create({ baseURL: import.meta.env.DEV ? "http://localhost:5000/api" : "/api" });

export const handleAxiosError = (error: AxiosError) => {
  const defaultError = { code: "", message: STD_ERR_MSG };
  if (error.response?.data) {
    const response = error.response;
    if (response.status >= 500) return { code: "", message: STD_SRVR_ERR_MSG };
    if (response.status >= 400) {
      const responseData = response.data as ResponseError;
      if (responseData.errorMessage) {
        return {
          code: responseData.code,
          message: responseData.errorMessage,
        };
      } else return defaultError;
    }
    return defaultError;
  }

  return defaultError;
};

export * from "./user";
