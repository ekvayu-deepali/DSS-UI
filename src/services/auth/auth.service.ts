import { AxiosResponse } from "axios";

// import { LocalStorageEnum } from '@/src/enum';
import {
  IAdminLogInRequest,
  IAdminLogInResponse,
  IApiResponseWithBody,
  IVerfifyOtpRequest,
  IForgetPasswordResponse,
  IForgetPasswordRequest,
} from "@/interfaces";
import { ApiHelper } from "@/helpers/api.helper";
import { AuthApiRoutes } from "./api.route";
import { ApiMethodEnum } from "@/enum";

/**
 * Authentication Service
 */
export class AuthService {
  /**
   * @functions {SignIn} - For  Sign In
   * @param {IAdminLogInRequest} payload
   * @return {Promise<IAdminLogInResponse>}
   */
  public static async AdminLogIn(
    payload: IAdminLogInRequest
  ): Promise<IApiResponseWithBody<IAdminLogInResponse>> {
    const res: AxiosResponse<IApiResponseWithBody<IAdminLogInResponse>> =
      await ApiHelper.send<IApiResponseWithBody<IAdminLogInResponse>>({
        url: AuthApiRoutes.ADMIN_SIGN_IN,
        method: ApiMethodEnum.POST,
        data: payload,
      });
    // const { token } = res.data.body;
    // StorageHelper.setLocalStorage(LocalStorageEnum.TOKEN, token);

    return res.data;
  }

  public static async SendOtp(
    payload: IForgetPasswordRequest
  ): Promise<IApiResponseWithBody<IForgetPasswordResponse>> {
    const res: AxiosResponse<IApiResponseWithBody<IForgetPasswordResponse>> =
      await ApiHelper.send<IApiResponseWithBody<IForgetPasswordResponse>>({
        url: AuthApiRoutes.FORGOT_PASSWORD,
        method: ApiMethodEnum.POST,
        data: payload,
      });
    return res.data;
  }

  public static async VerifyOtp(
    payload: IVerfifyOtpRequest
  ): Promise<IApiResponseWithBody<IVerfifyOtpRequest>> {
    const res: AxiosResponse<IApiResponseWithBody<IVerfifyOtpRequest>> =
      await ApiHelper.send<IApiResponseWithBody<IVerfifyOtpRequest>>({
        url: AuthApiRoutes.VERIFY_OTP,
        method: ApiMethodEnum.POST,
        data: payload,
      });
    return res.data;
  }
}
