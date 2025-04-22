import { RefObject, useRef, useState, useCallback } from "react";

import {
  ITextInputFieldData,
  ITextInputFieldRef,
} from "@/components/common/textInputField";
import { SOMETHING_WENT_WRONG, VERIFICATION_CODE_SENT } from "@/constants";
import {
  AuthFormStateEnum,
  SnackbarTypeEnum,
} from "@/enum";
import { useAppSnackbar } from "@/hooks/snackbar.hook";
import { authActions, AuthenticationThunk, useAppDispatch } from "@/redux";
import { IForgetPasswordRequest } from "@/interfaces";
import { StorageHelper } from "@/utills";

interface IAuthControllerResponse {
  getters: {
    email: string;
    isProcessing: boolean;
  };
  handlers: {
    onEmailChange: (event: ITextInputFieldData) => void;
    handleSubmit: () => Promise<void>;
  };
  ref: {
    emailRef: RefObject<ITextInputFieldRef | null>;
  };
}
/**
 * @function ForgetPasswordController
 * @description Controller hook to manage the Forgot Password flow. Handles email input,
 *              form submission, validation, state management, and user notifications.
 * @returns {IAuthControllerResponse} An object containing refs, state values (getters), and handler functions.
 */
export const ForgetPasswordController = (): IAuthControllerResponse => {
  // React State
  const [email, setEmail] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // React Refs
  const emailRef = useRef<ITextInputFieldRef>(null);
  // Custom Hooks
  const { enqueueSnackbar } = useAppSnackbar();
  /**
   * @function {onEmailChange}-  Handle on Change of email
   * @param {ITextInputFieldData} event
   */
  const onEmailChange = useCallback((event: ITextInputFieldData): void => {
    if (!event.event) return;
    const { value } = event.event.target;
    setEmail(value);
  }, []);
  /**
   * @function {handleSubmit} - To handle forgot password request
   * @return {Promise<void>}
   */
  const handleSubmit = useCallback(async (): Promise<void> => {
    const emailValid = emailRef.current?.validateValue();
    if (!emailValid) {
      return;
    }
    setIsProcessing(true);
    const payload: IForgetPasswordRequest = {
      email: email.trim(),
    };
    try {
      StorageHelper.setLocalStorage("forgotPasswordEmail", email.trim());
      await dispatch(AuthenticationThunk.forgetPassword(payload)).unwrap();
      enqueueSnackbar(
        VERIFICATION_CODE_SENT,
        SnackbarTypeEnum.SUCCESS
      );
      dispatch(authActions.setFormState(AuthFormStateEnum.FORGOT_PASSWORD_OTP));
    } catch (error) {
      enqueueSnackbar(SOMETHING_WENT_WRONG, SnackbarTypeEnum.ERROR);
    }
    setIsProcessing(false);
  }, [enqueueSnackbar, dispatch, email]);
  return {
    getters: {
      email,
      isProcessing,
    },
    handlers: {
      onEmailChange,
      handleSubmit,
    },
    ref: {
      emailRef,
    },
  };
};
