import { RefObject, useRef, useState, useCallback, FormEvent } from "react";

import {
  ITextInputFieldData,
  ITextInputFieldRef,
} from "@/components/common/textInputField";
import { PASSWORD_NOT_MATCHED, RESET_SUCCESSFUL, SOMETHING_WENT_WRONG } from "@/constants";
import { AuthFormMessageEnum, SnackbarTypeEnum } from "@/enum";
import { useAppSnackbar } from "@/hooks/snackbar.hook";
import { AuthenticationThunk } from "@/redux";

interface IAuthControllerResponse {
  getters: {
    showPassword: boolean;
    isProcessing: boolean;
    newPassword: string;
    confirmPassword: string;
  };
  handlers: {
    onNewPasswordChange: (event: ITextInputFieldData) => void;
    onConfirmPasswordChange: (event: ITextInputFieldData) => void;
    handleShowPassword: () => void;
    handleResetPassword: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  };
  ref: {
    newPasswordRef: RefObject<ITextInputFieldRef | null>;
    confirmPasswordRef: RefObject<ITextInputFieldRef | null>;
  };
}

/**
 * ResetPasswordController - Controller to manage password reset functionality
 * 
 * This controller is responsible for handling the state, validation, and actions
 * related to resetting a user's password, including updating the UI, handling
 * form validation, and managing the password reset process.
 *
 * @returns {IAuthControllerResponse} - The object containing the state, handlers, and refs for the password reset form
 */
export const ResetPasswordController = (): IAuthControllerResponse => {
  // React State
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // React Refs
  const newPasswordRef = useRef<ITextInputFieldRef>(null);
  const confirmPasswordRef = useRef<ITextInputFieldRef>(null);
  // Custom Hooks
  const { enqueueSnackbar } = useAppSnackbar();

  /**
   * @function {onNewPasswordChange} -  Handle on Change of New Password
   * @param {ITextInputFieldData} event
   * @return {void}
   */
  const onNewPasswordChange = useCallback(
    (event: ITextInputFieldData): void => {
      if (!event.event) return;
      const { value } = event.event.target;
      setNewPassword(value);
    },
    []
  );

  /**
   * @function {onConfirmPasswordChange} -  Handle on Change of Confirm Password
   * @param {ITextInputFieldData} event
   * @return {void}
   */
  const onConfirmPasswordChange = useCallback(
    (event: ITextInputFieldData): void => {
      if (!event.event) return;
      const { value } = event.event.target;
      setConfirmPassword(value);
    },
    []
  );

  /**
   * @functions {handleShowPassword} - To handle to show password functionality
   * @return {void}
   */
  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  /**
   * @function {isValidResetPassword} - Validate reset password form
   * @return {boolean}
   */
  const isValidResetPassword = useCallback((): boolean => {
    const newPasswordValid = newPasswordRef.current?.validateValue();
    const confirmPasswordValid = confirmPasswordRef.current?.validateValue();

    // Check if validation fails
    if (!(newPasswordValid && confirmPasswordValid)) {
      return true;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      enqueueSnackbar(PASSWORD_NOT_MATCHED, SnackbarTypeEnum.ERROR);
      return true;
    }

    // Return false if all validations pass (no errors)
    return false;
  }, [confirmPassword, enqueueSnackbar, newPassword]);

  /**
   * @function {handleResetPassword} - To handle password reset
   * @return {Promise<void>}
   */
  const handleResetPassword = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      if (isValidResetPassword()) {
        return;
      }

      setIsProcessing(true);

      try {
        // In a real implementation, you would dispatch an action to reset the password
        // dispatch(AuthenticationThunk.resetPassword({
        //   newPassword: newPassword.trim(),
        //   confirmPassword: confirmPassword.trim(),
        //   // newPassword: newPassword.trim()
        // }) as any);
        enqueueSnackbar(RESET_SUCCESSFUL, SnackbarTypeEnum.SUCCESS);
        // setFormState("login");
        setNewPassword("");
        setConfirmPassword("");
      } catch {
        enqueueSnackbar(SOMETHING_WENT_WRONG, SnackbarTypeEnum.ERROR);
      }
      setIsProcessing(false);
    },
    [enqueueSnackbar, isValidResetPassword]
  );

  return {
    getters: {
      showPassword,
      isProcessing,
      newPassword,
      confirmPassword,
    },
    handlers: {
      onNewPasswordChange,
      onConfirmPasswordChange,
      handleShowPassword,
      handleResetPassword,
    },
    ref: {
      newPasswordRef,
      confirmPasswordRef,
    },
  };
};
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

