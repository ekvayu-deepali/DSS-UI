import {
  RefObject,
  useRef,
  useState,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import { useRouter } from "next/navigation";

import {
  SOMETHING_WENT_WRONG,
  VERIFICATION_CODE_SENT,
  VERIFICATION_SUCCESS,
} from "@/constants";
import { SnackbarTypeEnum, RoutePathEnum } from "@/enum";
import { useAppSnackbar } from "@/hooks/snackbar.hook";
import { IVerfifyOtpRequest } from "@/interfaces";
import { AuthenticationThunk, useAppDispatch } from "@/redux";
interface IAuthControllerResponse {
  getters: {
    email: string;
    isProcessing: boolean;
    otp: string;
    OTP_LENGTH: number;
  };
  handlers: {
    setOtp: Dispatch<SetStateAction<string>>;
    setIsProcessing: Dispatch<SetStateAction<boolean>>;
    handleOnVerifyOtp: () => void;
    handleResendOtp: () => void;
  };
}

/**
 * @function LogInOTPVerificationController
 * @description Controller hook for handling OTP verification flow during login.
 * It manages state (email, OTP, loading), handles OTP input changes, validation,
 * submission (verification), and resend functionality.
 * Integrates with Redux for async OTP verification and uses snackbar for user feedback.
 *
 * @returns {IAuthControllerResponse} - Returns email, OTP and processing state,
 * OTP input ref, and handlers for OTP change, verification, and resend.
 */
export const LogInOTPVerificationController = (): IAuthControllerResponse => {
  const OTP_LENGTH = 6;
  // React State
  const [email, setEmail] = useState<string>("user@exampldfvfde.com");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");

  // Next Router
  const router = useRouter();

  // Custom Hooks
  const { enqueueSnackbar } = useAppSnackbar();
  const dispatch = useAppDispatch();

  const handleOnVerifyOtp = async (): Promise<void> => {
    const payload: IVerfifyOtpRequest = {
      email,
      otp,
    };
    try {
      if (otp.length === OTP_LENGTH) {
        const response = await dispatch(
          AuthenticationThunk.verifyForgetPasswordOtp(payload)
        ).unwrap();
        localStorage.removeItem("userId");

        // if (response.token) {
        //   dispatch(userActions.setEnvInitated(true));
        //   router.push(RoutePathEnum.ENVIRONMENT);
        //   enqueueSnackbar("login", SnackbarTypeEnum.SUCCESS);
        // }
      } else {
        enqueueSnackbar("noOtpEnter", SnackbarTypeEnum.ERROR);
      }
    } catch (error) {
      enqueueSnackbar("notValid", SnackbarTypeEnum.ERROR);
    }
  };

  /**
   * @function {handleResendOtp} - To handle resending OTP
   * @return {Promise<void>}
   */
  const handleResendOtp = useCallback(async (): Promise<void> => {
    setIsProcessing(true);
    try {
      enqueueSnackbar(VERIFICATION_CODE_SENT, SnackbarTypeEnum.SUCCESS);
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
      OTP_LENGTH,
    },
    handlers: {
      setOtp,
      setIsProcessing,
      handleOnVerifyOtp,
      handleResendOtp,
    },
  };
};
