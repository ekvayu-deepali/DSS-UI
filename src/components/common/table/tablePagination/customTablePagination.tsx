"use client";

import React, { JSX } from "react";

import { ROWS_PER_PAGE_OPTIONS } from "../constants";
import { ICustomTablePagination } from "../interface";
import { TablePaginationWrapper } from "./customTablePagination.style";

/**
 * Custom table Pagination Component
 * @param {ICustomTablePagination} props
 * @return {JSX.Element}
 */
export function CustomTablePagination(
  props: ICustomTablePagination
): JSX.Element {
  const { page, limit, total, onPageChange, onRowsPerPageChange } = props;

  return (
    <TablePaginationWrapper
      count={total}
      onPageChange={(_event, newPage: number) => onPageChange(newPage + 1)}
      onRowsPerPageChange={(event) => {
        onRowsPerPageChange(parseInt(event.target.value, 10));
      }}
      page={page - 1}
      rowsPerPage={limit}
      rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
      showFirstButton
      showLastButton
      labelRowsPerPage="Rows Per Page"
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
    />
  );
}
