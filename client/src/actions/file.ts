import { AxiosError } from "axios";
import { api, handleAxiosError } from "./index";

export const fetchFile = async (fileId: string) => {
  try {
    const response = await api.get(`/files/${fileId}`);
    const data = await response.data;
    if (data) return { data };
    else return { error: "Received null as response" };
  } catch (error) {
    return { error: handleAxiosError(error as AxiosError) };
  }
};
