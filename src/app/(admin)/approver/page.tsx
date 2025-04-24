"use client";

import React, { JSX, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

import { useContactsController } from "./approver.controller";

import { Icon, PageHeader, TableComponent } from "@/components/common";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { RoutePathEnum } from "@/enum";

/**
 * @page {Contacts} - Display Contacts Information
 * @return {JSX.Element}
 */
export default function Page(): JSX.Element {
  const router = useRouter();
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
          actions={
            <Button
              variant="contained"
              size="small"
              startIcon={<Icon icon={faUpload} />}
              onClick={() =>
                router.push(RoutePathEnum.GEO_POLITICAL_UPLOAD_REPORT)
              }
            >
              Upload Report
            </Button>
          }
        />
      </div>
    ),
    [filter, getContactInformation, isMobileView, newApplication, ref, router]
  );

  return (
    <>
      {header}
      {table}
    </>
  );
}
