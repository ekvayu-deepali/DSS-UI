"use client";

import React from "react";
import {
  Box,
  Button,
  FormGroup,
  InputAdornment,
} from "@mui/material";
import {
  faEnvelope,
  faEyeSlash,
  faEye,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import { ValidationHelper } from "@/helpers";
import { EMAIL_ADDRESS, PASSWORD } from "@/constants";
import { AuthFormMessageEnum } from "@/enum";
import {
  Icon,
  Spacing,
  SpacingEnum,
  TextInputField,
} from "@/components/common";

import { LogInController } from "./login.controller";

/**
 * Login Component
 *
 * Renders a login form with email and password input fields,
 * including validation, show/hide password toggle, and form submission handling.
 * It uses a controller hook (LogInController) to manage state, handlers, and refs.
 *
 * Features:
 * - Email input with validation and icon.
 * - Password input with show/hide toggle and icon.
 * - Sign In button that shows loading text while processing.
 * - "Forgot password?" button to trigger reset flow.
 */
const Page = () => {
  const { getters, handlers, ref } = LogInController();
  const { email, password, showPassword, isProcessing } = getters;
  const {
    onEmailChange,
    onPasswordChange,
    handleShowPassword,
    handleSubmit,
    sendForgetPassword,
  } = handlers;
  const { emailRef, passwordRef } = ref;

  return (
    <Box>
      <FormGroup>
        <TextInputField
          type="email"
          fullWidth
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
      <Spacing spacing={2} variant={SpacingEnum.TOP} />
      <FormGroup>
        <TextInputField
          type={showPassword ? "text" : "password"}
          fullWidth
          placeholder={PASSWORD}
          label={PASSWORD}
          onChange={onPasswordChange}
          ref={passwordRef}
          value={password}
          validation={ValidationHelper.validateNotEmpty}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon
                  icon={showPassword ? faEyeSlash : faEye}
                  title={showPassword ? "hide" : "show"}
                  onClick={handleShowPassword}
                  color="inherit"
                  size="small"
                  onlyIcon
                />
              </InputAdornment>
            ),
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
          }}
        />
      </FormGroup>
      <Spacing spacing={2} variant={SpacingEnum.TOP} />
      <Button variant="contained" onClick={handleSubmit} fullWidth>
        {isProcessing
          ? AuthFormMessageEnum.SIGNING_PROCESS
          : AuthFormMessageEnum.SIGN_IN}
      </Button>

      {/* <Button variant="text" onClick={sendForgetPassword}>
        {AuthFormMessageEnum.FORGOT_PASSWORD}
      </Button> */}
    </Box>
  );
};

export default Page;
