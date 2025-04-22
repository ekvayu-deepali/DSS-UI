"use client";

import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";

import {
  MAX_SNACKBAR_AMOUNT,
  SNACKBAR_HORIZONTAL_ALIGNMENT,
  SNACKBAR_VERTICAL_ALIGNMENT,
} from "@/constants";
import { store } from "@/redux";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={MAX_SNACKBAR_AMOUNT}
        autoHideDuration={2000}
        preventDuplicate
        anchorOrigin={{
          vertical: SNACKBAR_VERTICAL_ALIGNMENT,
          horizontal: SNACKBAR_HORIZONTAL_ALIGNMENT,
        }}
      >
        <div>{children}</div>
      </SnackbarProvider>
    </Provider>
  );
}
