import React, { InputHTMLAttributes } from "react";
import OtpInput from "react-otp-input";
import { useMediaQuery, useTheme } from "@mui/material";

import { Button } from "@/components/ui/button";
import { Spacing, SpacingEnum } from "@/components/common";

import { LogInOTPVerificationController } from "./login-otp-verification.controller";

/**
 * LoginOTPVerification Component
 *
 * This component handles the OTP (One-Time Password) verification step
 * after a user attempts to log in. It retrieves the user's email and displays
 * a prompt for entering the OTP sent to that email. It includes:
 *
 * - An email display indicating where the verification code was sent.
 * - A (currently commented out) input field for entering the OTP.
 * - A "Verify" button to submit the OTP for validation.
 * - A "Resend verification code" option in case the user didn’t receive the code.
 * - A disabled "Back to login" button for navigating back to the login form.
 *
 * The component uses handlers and state from LogInOTPVerificationController.
 */
const LoginOTPVerification = () => {
  const { getters, handlers } = LogInOTPVerificationController();
  const { email, isProcessing, otp, OTP_LENGTH } = getters;
  const { handleOnVerifyOtp, handleResendOtp, setOtp } = handlers;

  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="grid gap-4">
      <div className="text-center mb-4">
        <p>We&apos;ve sent a verification code to your email</p>
        <p className="font-medium">{email}</p>
      </div>
      <div className="grid gap-2">
        {/* <OtpTextfieldWrapper> */}
        {isMobileView ? (
          <OtpInput
            value={otp}
            shouldAutoFocus
            onChange={setOtp}
            inputType="tel"
            numInputs={OTP_LENGTH}
            inputStyle={{
              width: "20px",
              height: "30px",
              fontSize: "1em",
              textAlign: "center",
              border: "1.5px solid black",
            }}
            renderSeparator={
              <Spacing spacing={1} variant={SpacingEnum.HORIZONTAL} />
            }
            renderInput={(props: InputHTMLAttributes<HTMLInputElement>) => (
              <input {...props} />
            )}
          />
        ) : (
          <OtpInput
            value={otp}
            shouldAutoFocus
            onChange={setOtp}
            inputType="tel"
            numInputs={6}
            inputStyle={{
              width: "36px",
              height: "36px",
              fontSize: "1em",
              textAlign: "center",
              border: "1.5px solid black",
            }}
            renderSeparator={
              <Spacing spacing={1} variant={SpacingEnum.HORIZONTAL} />
            }
            renderInput={(props: InputHTMLAttributes<HTMLInputElement>) => (
              <input {...props} />
            )}
          />
        )}
        {/* </OtpTextfieldWrapper> */}
      </div>
      <Button
        type="submit"
        className="bg-primary"
        disabled={isProcessing}
        onClick={handleOnVerifyOtp}
      >
        {isProcessing ? "Verifying..." : "Verify"}
      </Button>
      <div className="text-center">
        <Button
          variant="link"
          className="text-sm text-primary"
          onClick={handleResendOtp}
          disabled={isProcessing}
        >
          Resend verification code
        </Button>
      </div>
      <div className="text-center">
        <Button
          variant="link"
          className="text-sm text-primary"
          // onClick={() => setFormState("login")}
        >
          Back to login
        </Button>
      </div>
    </div>
  );
};

export default LoginOTPVerification;
