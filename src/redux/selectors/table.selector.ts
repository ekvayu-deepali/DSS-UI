import { IRootState } from "../store";

export const GET_TABLE = (state: IRootState) => state.table;

export const GET_TABLE_META_DATA = (state: IRootState) => state.table.metaData;

export const GET_TABLE_DATE = (state: IRootState) => state.table.time;

export const GET_TABLE_PAGINATION_DATA = (state: IRootState) =>
  state.table.table;

export const TICKET_HISTORY_PAGE_DATA = (state: IRootState) =>
  state.table.tickethistory;

export const ALL_PAGE_DATA = (state: IRootState) => state.table;
