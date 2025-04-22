import { RefObject, useRef, useState, useCallback, useEffect } from "react";
import {
  ITextInputFieldData,
  ITextInputFieldRef,
} from "@/components/common/textInputField";
import { SOMETHING_WENT_WRONG, VERIFICATION_CODE_SENT, VERIFICATION_SUCCESS } from "@/constants";
import { AuthFormMessageEnum, SnackbarTypeEnum } from "@/enum";
import { useAppSnackbar } from "@/hooks/snackbar.hook";
import { AuthenticationThunk, useAppDispatch } from "@/redux";
import { IForgetPasswordRequest, IVerfifyOtpRequest } from "@/interfaces";
import { StorageHelper } from "@/utills";

interface IForgetPasswordOtpControllerResponse {
  getters: {
    email: string;
    isProcessing: boolean;
    otp: string;
  };
  handlers: {
    onOtpChange: (event: ITextInputFieldData) => void;
    handleSubmit: () => Promise<void>;
    handleResendOtp: () => Promise<void>;
  };
  ref: {
    otpRef: RefObject<ITextInputFieldRef | null>;
  };
}

/**
 * @function ForgetPasswordOtpController
 * @description
 * Custom React controller hook to manage the OTP (One-Time Password) verification
 * process for the "Forgot Password" flow. It handles:
 *
 * - Fetching the user's email from localStorage.
 * - Managing OTP input state and its validation.
 * - Submitting the OTP for verification via a Redux thunk.
 * - Resending the OTP to the user's email.
 *
 * This controller exposes state values, event handlers, and refs needed
 * by the OTP verification UI component.
 *
 * @returns {IForgetPasswordOtpControllerResponse} An object containing:
 * - `getters`: Current values for `email`, `otp`, and `isProcessing`.
 * - `handlers`: Callback functions for OTP change, submit, and resend actions.
 * - `ref`: Reference to the OTP input component.
 */
export const ForgetPasswordOtpController =
  (): IForgetPasswordOtpControllerResponse => {
    // React State
    const [email, setEmail] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    // React Refs
    const otpRef = useRef<ITextInputFieldRef>(null);
    // Custom Hooks
    const { enqueueSnackbar } = useAppSnackbar();
    // Redux Thunk
    const dispatch = useAppDispatch();
    useEffect(() => {
      const storedEmail = StorageHelper.getLocalStorage("forgotPasswordEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }, []);

    /**
     * @function {onOtpChange} -  Handle on Change of OTP
     * @param {ITextInputFieldData} event
     * @return {void}
     */

    const onOtpChange = useCallback((event: ITextInputFieldData): void => {
      if (!event.event) return;
      const { value } = event.event.target;
      setOtp(value);
    }, []);

    /**
     * @function {isValidSubmittion} - Validate OTP before submittion
     * @return {boolean}
     */
    const isValidSubmittion = useCallback((): boolean => {
      const otpValidError = otpRef.current?.validateValue();
      // Return true if validation fails (has errors)
      if (!otpValidError) {
        return true;
      }
      return false;
    }, []);

    /**
     * @function {handleSubmit} - To handle OTP verification for password reset
     * @return {Promise<void>}
     */
    const handleSubmit = useCallback(async (): Promise<void> => {
      if (isValidSubmittion()) {
        return;
      }
      setIsProcessing(true);
      const payload: IVerfifyOtpRequest = {
        otp: otp.trim(),
        email: email.trim(),
      };
      try {
        await dispatch(
          AuthenticationThunk.verifyForgetPasswordOtp(payload)
        ).unwrap();

        enqueueSnackbar(VERIFICATION_SUCCESS, SnackbarTypeEnum.SUCCESS);
        // setFormState("forgotPassword");
      } catch {
        enqueueSnackbar(SOMETHING_WENT_WRONG, SnackbarTypeEnum.ERROR);
      }
      setIsProcessing(false);
    }, [enqueueSnackbar, otp, isValidSubmittion]);

    /**
     * @function {handleResendOtp} - To handle resending OTP
     * @return {Promise<void>}
     */
    const handleResendOtp = useCallback(async (): Promise<void> => {
      setIsProcessing(true);
      StorageHelper.setLocalStorage("forgotPasswordEmail", email.trim());
      const emailStored = StorageHelper.getLocalStorage("forgotPasswordEmail");
      setEmail(emailStored || "");
      const payload: IForgetPasswordRequest = {
        email: email.trim(),
      };
      try {
        await dispatch(AuthenticationThunk.forgetPassword(payload)).unwrap();
        enqueueSnackbar(
          VERIFICATION_CODE_SENT,
          SnackbarTypeEnum.SUCCESS
        );
      } catch {
        enqueueSnackbar(SOMETHING_WENT_WRONG, SnackbarTypeEnum.ERROR);
      }
      setIsProcessing(false);
    }, [enqueueSnackbar]);

    return {
      getters: {
        email,
        isProcessing,
        otp,
      },
      handlers: {
        onOtpChange,
        handleSubmit,
        handleResendOtp,
      },
      ref: {
        otpRef,
      },
    };
  };
