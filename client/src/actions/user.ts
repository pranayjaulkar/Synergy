import { User, UserLoginData, UserSignUpData } from "@/types/user";
import { api, handleAxiosError } from "./index";
import { AxiosError, AxiosResponse } from "axios";

export const signUpUser = async (userData: UserSignUpData) => {
  try {
    const response: AxiosResponse<User> = await api.post("/users/signup", userData);
    return { data: response.data };
  } catch (error) {
    console.log("Signup: Axios error: ", error);
    return { error: handleAxiosError(error as AxiosError) };
  }
};
export const loginUser = async (userData: UserLoginData) => {
  try {
    const response: AxiosResponse<User> = await api.post("/users/login", userData);
    return { data: response.data };
  } catch (error) {
    console.log("Login: Axios error: ", error);
    return { error: handleAxiosError(error as AxiosError) };
  }
};
