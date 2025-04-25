import { RefObject, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { useAppSnackbar } from "@/hooks";
import { AuthFormStateEnum, SnackbarTypeEnum } from "@/enum";
import { IAdminLogInRequest } from "@/interfaces";
import { useAppDispatch, AuthenticationThunk, authActions } from "@/redux";
import { SIGNIN_SUCCESSFUL, SOMETHING_WENT_WRONG } from "@/constants";
import { ITextInputFieldData, ITextInputFieldRef } from "@/components/common";

interface ILogInControllerResponse {
  getters: {
    email: string;
    password: string;
    showPassword: boolean;
    isProcessing: boolean;
  };
  handlers: {
    onEmailChange: (event: ITextInputFieldData) => void;
    onPasswordChange: (event: ITextInputFieldData) => void;
    handleShowPassword: () => void;
    handleSubmit: () => Promise<void>;
    sendForgetPassword: () => void;
  };
  ref: {
    emailRef: RefObject<ITextInputFieldRef | null>;
    passwordRef: RefObject<ITextInputFieldRef | null>;
  };
}

/**
 * LogInController
 *
 * A custom controller hook for managing the login form's state, logic, and interaction.
 * It encapsulates:
 *
 * - React state: email, password, show/hide password toggle, and processing state
 * - Input change handlers for email and password
 * - Password visibility toggle handler
 * - Form submission handler with validations and Redux dispatch
 * - Navigation to the forget password state
 * - Input validation using ref-based custom input fields
 *
 * Returns an object containing:
 * - `getters`: Current state values
 * - `handlers`: Event handlers for input fields and form submission
 * - `ref`: Refs to email and password input fields
 *
 * @returns {ILogInControllerResponse} Object with state, handlers, and refs for the login form
 */
export const LogInController = (): ILogInControllerResponse => {
  // React State
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Redux State
  const dispatch = useAppDispatch();

  // React Refs
  const emailRef = useRef<ITextInputFieldRef>(null);
  const passwordRef = useRef<ITextInputFieldRef>(null);

  // Next Router
  const router = useRouter();

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
   * @function {onPasswordChange} -  Handle on Change of Password
   * @param {ITextInputFieldData} event
   * @return {void}
   */
  const onPasswordChange = useCallback((event: ITextInputFieldData): void => {
    if (!event.event) return;
    const { value } = event.event.target;
    setPassword(value);
  }, []);

  /**
   * @functions {handleShowPassword} - To handle to show password functionality
   * @return {void}
   */
  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  /**
   * @function {isValidSubmittion} - Validate request before submittion
   * @return {boolean}
   */
  const isValidSubmittion = useCallback((): boolean => {
    const emailError = emailRef.current?.validateValue();
    const passwordError = passwordRef.current?.validateValue();

    if (!(emailError && passwordError)) {
      return true;
    }
    return false;
  }, []);

  /**
   * @function {handleSubmit} - To handle to sign in functionality
   * @return {Promise<void>}
   */
  const handleSubmit = useCallback(async (): Promise<void> => {
    if (isValidSubmittion()) {
      return;
    }
    setIsProcessing(true);

    const payload: IAdminLogInRequest = {
      email: email.trim(),
      password: password.trim(),
    };
    localStorage.setItem("userRole", "executor");
    router.push("/confidential/geo-political");
    // try {
    //   await dispatch(AuthenticationThunk.adminSignIn(payload)).unwrap();
    //   enqueueSnackbar(SIGNIN_SUCCESSFUL, SnackbarTypeEnum.SUCCESS);
    //   dispatch(authActions.setFormState(AuthFormStateEnum.OTP));
    // } catch (error) {
    //   enqueueSnackbar(SOMETHING_WENT_WRONG, SnackbarTypeEnum.ERROR);
    // }
  }, []);

  const sendForgetPassword = () => {
    dispatch(authActions.setFormState(AuthFormStateEnum.FORGOT_PASSWORD));
  };

  return {
    getters: {
      email,
      password,
      showPassword,
      isProcessing,
    },
    handlers: {
      onEmailChange,
      onPasswordChange,
      handleShowPassword,
      handleSubmit,
      sendForgetPassword,
    },
    ref: {
      emailRef,
      passwordRef,
    },
  };
};
