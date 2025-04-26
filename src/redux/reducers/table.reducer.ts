// Disabled for the Entire file due to no pram reassing but its required in
// Redux
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

import {
  ITimePayload,
  ITableWithLoadingPayload,
  IDatePayload,
  IDatePayload2,
} from "@/interfaces";

import { ReducerEnum } from "@/enum";
import { LuxonHelper } from "@/helpers";
import { DatePickerTimeEnum } from "@/components/common/datePicker";

export interface IMetaData {
  isNextPage: boolean;
  totalCount: number;
}

export interface IPageTableData {
  table: ITableWithLoadingPayload;
  time: ITimePayload;
  metaData: IMetaData;
}

export interface ITableState {
  table: ITableWithLoadingPayload;
  time: ITimePayload;
  metaData: IMetaData;
  hasError: boolean;
  tickethistory: IPageTableData;
}
export interface ITablePayloadNumber {
  pageName: string;
  value: number;
}

export interface ITablePayloadBoolean {
  pageName: string;
  value: boolean;
}
export interface ITablePayloadMetadata {
  pageName: string;
  value: IMetaData;
}

// Helper function to get initial time values without directly calling LuxonHelper in the initialState
const getInitialTimeValues = () => {
  const now = DateTime.now();
  const startDate = now.minus({ day: 1 });
  const endDate = now;

  return {
    from: startDate.toMillis(),
    to: endDate.toMillis()
  };
};

const initialTimeValues = getInitialTimeValues();

const initialState: ITableState = {
  tickethistory: {
    metaData: { isNextPage: false, totalCount: 0 } as IMetaData,
    table: {
      page: 1,
      limit: 10,
      isLoading: true,
    },
    time: {
      from: initialTimeValues.from,
      to: initialTimeValues.to,
    },
  },
  metaData: { isNextPage: false, totalCount: 0 } as IMetaData,
  table: {
    page: 1,
    limit: 10,
    isLoading: true,
  },
  time: {
    from: initialTimeValues.from,
    to: initialTimeValues.to,
  },
  hasError: false,
};

export const tableSlice = createSlice({
  name: ReducerEnum.TABLE,
  initialState,
  reducers: {
    reset: () => {
      const timeValues = getInitialTimeValues();
      return {
        ...initialState,
        time: {
          from: timeValues.from,
          to: timeValues.to,
        },
      };
    },
    setTableRows: (state: ITableState, action: PayloadAction<number>) => {
      state.table.limit = action.payload;
      state.table.page = initialState.table.page;
    },
    setTableRows2: (
      state: ITableState,
      action: PayloadAction<ITablePayloadNumber>
    ) => {
      (
        state[action.payload.pageName as keyof ITableState] as IPageTableData
      ).table.limit = action.payload.value;

      state.table.page = initialState.table.page;
    },
    setTablePage: (state: ITableState, action: PayloadAction<number>) => {
      state.table.page = action.payload;
    },
    setTablePage2: (
      state: ITableState,
      action: PayloadAction<ITablePayloadNumber>
    ) => {
      (
        state[action.payload.pageName as keyof ITableState] as IPageTableData
      ).table.page = action.payload.value;
    },
    setTableLoading: (state: ITableState, action: PayloadAction<boolean>) => {
      state.table.isLoading = action.payload;
    },
    setTableLoading2: (
      state: ITableState,
      action: PayloadAction<ITablePayloadBoolean>
    ) => {
      (
        state[action.payload.pageName as keyof ITableState] as IPageTableData
      ).table.isLoading = action.payload.value;
    },
    setMetadata: (state: ITableState, action: PayloadAction<IMetaData>) => {
      state.metaData = action.payload;
    },
    setMetadata2: (
      state: ITableState,
      action: PayloadAction<ITablePayloadMetadata>
    ) => {
      (
        state[action.payload.pageName as keyof ITableState] as IPageTableData
      ).metaData = action.payload.value;
    },
    setTableCount: (state: ITableState, action: PayloadAction<number>) => {
      state.metaData.totalCount = action.payload;
    },
    setTableCount2: (
      state: ITableState,
      action: PayloadAction<ITablePayloadNumber>
    ) => {
      (
        state[action.payload.pageName as keyof ITableState] as IPageTableData
      ).metaData.totalCount = action.payload.value;
    },
    setTableDate: (state: ITableState, action: PayloadAction<IDatePayload>) => {
      const { startDate, endDate } = action.payload;
      const utcEndDate = DateTime.fromISO(endDate).toUTC();
      const utcStartDate = DateTime.fromISO(startDate).toUTC();
      state.table.page = initialState.table.page;
      state.time.from = utcStartDate.toMillis();
      state.time.to = utcEndDate.toMillis();
    },
    setTableDate2: (
      state: ITableState,
      action: PayloadAction<IDatePayload2>
    ) => {
      const { startDate, endDate } = action.payload.value;
      const utcEndDate = DateTime.fromISO(endDate).toUTC();
      const utcStartDate = DateTime.fromISO(startDate).toUTC();
      (
        state[action.payload.pageName as keyof ITableState] as IPageTableData
      ).table.page = initialState.table.page;
      (
        state[action.payload.pageName as keyof ITableState] as IPageTableData
      ).time.from = utcStartDate.toMillis();

      (
        state[action.payload.pageName as keyof ITableState] as IPageTableData
      ).time.to = utcEndDate.toMillis();
    },

    hasError: (state: ITableState, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const tableActions = { ...tableSlice.actions };

export default tableSlice.reducer;
