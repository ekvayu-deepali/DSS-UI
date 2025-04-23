"use client";

import React, { JSX, useMemo } from "react";

import { useContactsController } from "./geo-political.controller";

import {
  PageHeader,
  TableComponent,
} from "@/components/common";

/**
 * @page {Contacts} - Display Contacts Information
 * @return {JSX.Element}
 */
export default function Confidential(): JSX.Element {
  const { getters, handlers, ref } = useContactsController();
  const {
    headers,
    tablePaginationData,
    newApplication,
    filter,
    contactPagination,
    height,
    isMobileView,
    breadcrumbs,
  } = getters;
  const { changePage, changeRows, getContactInformation } = handlers;

  const table = useMemo(
    () => (
      <TableComponent<any>
        // isLoading={tablePaginationData.isLoading}
        isLoading={false}
        headerField={headers}
        tableBody={newApplication}
        paginationData={{
          onPageChange: changePage,
          onRowsPerPageChange: changeRows,
          total: contactPagination.totalCount,
          page: tablePaginationData.page,
          limit: tablePaginationData.limit,
        }}
        translation={{
          noDataTitle: "No Data Found",
        }}
        maxHeight={height}
      />
    ),
    [
      tablePaginationData.isLoading,
      tablePaginationData.page,
      tablePaginationData.limit,
      headers,
      newApplication,
      changePage,
      changeRows,
      contactPagination.totalCount,
      height,
    ]
  );

  const header = useMemo(
    () => (
      <div ref={ref}>
        <PageHeader
          title="Confidential"
          breadcrumbs={breadcrumbs}
          actions={""}
        />
      </div>
    ),
    [filter, getContactInformation, isMobileView, newApplication, ref]
  );

  return (
    <>
      {header}
      {table}
    </>
  );
}
