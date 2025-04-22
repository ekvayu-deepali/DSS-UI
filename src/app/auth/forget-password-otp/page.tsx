import React from "react";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { Button, InputAdornment } from "@mui/material";

import { Icon, TextInputField } from "@/components/common";
import { VERIFICATION_CODE } from "@/constants";
import { ValidationHelper } from "@/helpers";
import { ForgetPasswordOtpController } from "./forget-password-otp.controller";

/**
 * ForgetPasswordOtp Component
 *
 * This component renders the OTP (One-Time Password) verification step
 * for the "Forgot Password" flow. It retrieves necessary state and handlers
 * from the `ForgetPasswordOtpController`, including the user email, OTP input,
 * and processing state.
 *
 * Features:
 * - Displays a message indicating an OTP was sent to the user's email.
 * - Allows users to input the OTP.
 * - Provides validation for the OTP field.
 * - Handles OTP submission and resending.
 * - Displays loading state while verification is in progress.
 * - Includes a 'Back' button for navigation purposes.
 */
const ForgetPasswordOtp = () => {
  const { getters, handlers, ref } = ForgetPasswordOtpController();
  const { email, isProcessing, otp } = getters;
  const { onOtpChange, handleSubmit, handleResendOtp } = handlers;
  const { otpRef } = ref;

  return (
    <div className="grid gap-4">
      <div className="text-center mb-4">
        <p>We&apos;ve sent a verification code to your email</p>
        <p className="font-medium">{email}</p>
      </div>
      <div className="grid gap-2">
        <TextInputField
          type="text"
          placeholder={VERIFICATION_CODE}
          label={VERIFICATION_CODE}
          onChange={onOtpChange}
          value={otp}
          ref={otpRef}
          validation={ValidationHelper.validateNotEmpty}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon
                  icon={faKey}
                  title="Verification Code"
                  color="inherit"
                  size="small"
                  onlyIcon
                />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Button
        onClick={handleSubmit}
        className="bg-primary"
        disabled={isProcessing}
      >
        {isProcessing ? "Verifying..." : "Verify"}
      </Button>
      <div className="text-center">
        <Button
          className="text-sm text-primary"
          onClick={handleResendOtp}
          disabled={isProcessing}
        >
          Resend verification code
        </Button>
      </div>
      <div className="text-center">
        <Button className="text-sm text-primary">Back</Button>
      </div>
    </div>
  );
};

export default ForgetPasswordOtp;
