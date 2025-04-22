export interface IAdminLogInResponse {
  email: string;
  message: string;
}

export interface IForgetPasswordResponse {
  email?: string;
  otp: string;
}

export interface IVeryfyOtpResponse {
  otp: string;
  email?: string;
}
