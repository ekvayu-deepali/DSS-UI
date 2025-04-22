"use client";

import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import { LocalStorageEnum, RoutePathEnum } from "@/enum";
import { StorageHelper } from "@/utills";

axios.defaults.headers.common.timezone =
  Intl.DateTimeFormat().resolvedOptions().timeZone;
axios.defaults.headers.common["Cache-Control"] = "no-cache";

/** Api Helper Class */
export class ApiHelper {
  /**
   * @functions {send} -To make generic API calls (POST, GET, DELETE, UPDATE, etc.)
   * @param {AxiosRequestConfig} config
   * @return {Promise<AxiosResponse<T>>}
   */
  public static async send<T>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const res: AxiosResponse<T, T> = await axios(config);
    return res;
  }

  /**
   * @functions {initRequestManager} Manage Request
   */
  public static initRequestManager() {
    axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const newConfig = config;
        const token = StorageHelper.getLocalStorage(LocalStorageEnum.TOKEN);
        if (token) {
          newConfig.headers.Authorization = `Bearer ${token}`;
        }
        return newConfig;
      },
      (error: AxiosError) => Promise.reject(error)
    );
  }

  /**
   * @functions {responseHandler} Manage response through interceptor
   */
  public static responseHandler() {
    axios.interceptors.response.use(
      (response: AxiosResponse) => response,

      (error: AxiosError) => {
        if (error?.response?.status === 401) {
          // Check if window is defined (client-side only)
          if (typeof window !== "undefined") {
            StorageHelper.clearLocalStorage();
            window.location.href = RoutePathEnum.ADMIN_LOGIN;
          }
        }
        return Promise.reject(error.response?.data);
      }
    );
  }

  /**
   *  @functions {init} To initiate API call
   */
  public static init() {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Accept"] = "application/json";
    ApiHelper.initRequestManager();
    ApiHelper.responseHandler();
  }
}

// Initialize API Helper
ApiHelper.init();
