import React from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Button, FormGroup, InputAdornment } from "@mui/material";

import { Icon, TextInputField } from "@/components/common";
import { EMAIL_ADDRESS, SEND_VERIFICATION_CODE } from "@/constants";
import { ValidationHelper } from "@/helpers";

import { ForgetPasswordController } from "./forget-password.controller";
import { AuthFormMessageEnum } from "@/enum";

/**
 * ForgetPassword Component
 *
 * Renders a form that allows users to initiate the password recovery process by
 * entering their email address. When the user submits the form, a verification
 * code is sent to the provided email.
 *
 * Features:
 * - Email input field with validation and icon adornment.
 * - Submit button to send the verification code.
 * - Visual feedback while the process is ongoing.
 * - Link to navigate back to the login screen.
 */
const ForgetPassword = () => {
  const { getters, handlers, ref } = ForgetPasswordController();
  const { email, isProcessing } = getters;
  const { emailRef } = ref;
  const { onEmailChange, handleSubmit } = handlers;

  return (
    <div className="grid gap-4">
      <div className="text-center mb-4">
        <p>{AuthFormMessageEnum.ENTER_EMAIL_FOR_VERIFICATION}</p>
      </div>
      <div className="grid gap-2">
        <FormGroup>
          <TextInputField
            type="email"
            placeholder={EMAIL_ADDRESS}
            label={EMAIL_ADDRESS}
            onChange={onEmailChange}
            value={email}
            ref={emailRef}
            validation={ValidationHelper.emailValidator}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon={faEnvelope}
                    title="Email"
                    color="inherit"
                    size="small"
                    onlyIcon
                  />
                </InputAdornment>
              ),
            }}
          />
        </FormGroup>
      </div>
      <Button
        onClick={handleSubmit}
        className="bg-primary"
        disabled={isProcessing}
      >
        {isProcessing
          ? AuthFormMessageEnum.SENDING_PROCESS
          : SEND_VERIFICATION_CODE}
      </Button>
      <div className="text-center">
        <Button className="text-sm text-primary">
          {AuthFormMessageEnum.BACK_TO_LOGIN}
        </Button>
      </div>
    </div>
  );
};

export default ForgetPassword;
