export interface IAdminLogInRequest {
  email: string;
  password: string;
}

export interface IForgetPasswordRequest {
  email: string;
}

export interface IVerfifyOtpRequest {
  email?: string;
  otp: string;
}
