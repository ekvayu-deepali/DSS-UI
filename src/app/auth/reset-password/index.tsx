import React from "react";
import { InputAdornment } from "@mui/material";
import { faLock, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

import { Icon, TextInputField } from "@/components/common";
import { NEW_PASSWORD, CONFIRM_PASSWORD } from "@/constants";
import { ValidationHelper } from "@/helpers";

import { ResetPasswordController } from "./reset-password.controller";
import { AuthFormMessageEnum } from "@/enum";

/**
 * ResetPassword component renders a form to allow users to reset their password.
 * It includes two password fields (new password and confirm password), 
 * along with a toggle to show or hide the password.
 * 
 * The form is controlled by the ResetPasswordController and updates the state 
 * for the new password, confirm password, and loading state while the reset process is ongoing.
 * 
 * @returns {JSX.Element} The JSX markup for the password reset form.
 */
const ResetPassowrd = () => {
  const { getters, handlers, ref } = ResetPasswordController();
  const { showPassword, isProcessing, newPassword, confirmPassword } = getters;

  const {
    handleShowPassword,
    onNewPasswordChange,
    onConfirmPasswordChange,
    handleResetPassword,
  } = handlers;

  const { newPasswordRef, confirmPasswordRef } = ref;
  return (
    <form onSubmit={handleResetPassword}>
      <div className="grid gap-4">
        <div className="text-center mb-4">
          <p>{AuthFormMessageEnum.CREATE_NEW_PASSWORD}</p>
        </div>
        <div className="grid gap-2">
          <TextInputField
            type={showPassword ? "text" : "password"}
            placeholder={NEW_PASSWORD}
            label={NEW_PASSWORD}
            onChange={onNewPasswordChange}
            value={newPassword}
            ref={newPasswordRef}
            validation={ValidationHelper.validateNotEmpty}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon={faLock}
                    title="Password"
                    color="inherit"
                    size="small"
                    onlyIcon
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Icon
                    icon={showPassword ? faEyeSlash : faEye}
                    title={showPassword ? "Hide password" : "Show password"}
                    onClick={handleShowPassword}
                    color="inherit"
                    size="small"
                    onlyIcon
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="grid gap-2">
          <TextInputField
            type={showPassword ? "text" : "password"}
            placeholder={CONFIRM_PASSWORD}
            label={CONFIRM_PASSWORD}
            onChange={onConfirmPasswordChange}
            value={confirmPassword}
            ref={confirmPasswordRef}
            validation={ValidationHelper.validateNotEmpty}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon={faLock}
                    title="Password"
                    color="inherit"
                    size="small"
                    onlyIcon
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Icon
                    icon={showPassword ? faEyeSlash : faEye}
                    title={showPassword ? "Hide password" : "Show password"}
                    onClick={handleShowPassword}
                    color="inherit"
                    size="small"
                    onlyIcon
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button type="submit" className="bg-primary" disabled={isProcessing}>
          {isProcessing ? "Resetting..." : "Reset Password"}
        </Button>
        <div className="text-center">
          <Button
            variant="link"
            className="text-sm text-primary"
            // onClick={() => setFormState("login")}
          >
            {AuthFormMessageEnum.BACK_TO_LOGIN}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ResetPassowrd;
