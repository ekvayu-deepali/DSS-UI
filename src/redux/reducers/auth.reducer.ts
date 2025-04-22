// Disabled for the Entire file due to no param reassing but its required in
// Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthFormStateEnum, ReducerEnum } from "@/enum";

export interface IAuthState {
  formState: string;
}

const initialState = {
  formState: AuthFormStateEnum.LOGIN,
};

/**
 * Creating the Redux Slice for User
 */
export const authSlice = createSlice({
  name: ReducerEnum.AUTHENTICATION,
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    setFormState: (state: IAuthState, actions: PayloadAction<string>) => {
      state.formState = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const authActions = { ...authSlice.actions };

export default authSlice.reducer;
