import { VERIFICATION_CODE } from "@/constants";

export enum AuthenticationEnum {
  SUCCESS = "Success",
}

export enum AuthFormStateEnum {
  LOGIN = "login",
  OTP = "otp",
  FORGOT_PASSWORD = "forgotPassword",
  FORGOT_PASSWORD_OTP = "forgotPasswordOtp",
  RESET_PASSWORD = "resetPassword",
}

export enum AuthFormTitleEnum {
  LOGIN = "Sign In",
  OTP = "Verification",
  FORGOT_PASSWORD = "Forgot Password",
  FORGOT_PASSWORD_OTP = "Verification",
  RESET_PASSWORD = "Reset Password",
}

export enum AuthFormMessageEnum {
  SENDING_PROCESS = "Sending...",
  ENTER_EMAIL_FOR_VERIFICATION = "Enter your email to receive a verification code",
  BACK_TO_LOGIN = "Back to login",
  FORGOT_PASSWORD = "Forgot password?",
  SIGNING_PROCESS = "Signing in...",
  SIGN_IN = "Sign In",
  CREATE_NEW_PASSWORD = "Create a new password",
}
