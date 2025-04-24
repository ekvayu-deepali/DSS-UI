"use client";
import React, { JSX, useMemo } from "react";
import { Button } from "@mui/material";
import { useContactsController } from "./approver.controller";
import { Icon, PageHeader, TableComponent } from "@/components/common";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import AddApproverModal from "./add-approver-modal/AddApproverModal";

/**
 * @page {Approver} - Display Approver Information
 * @return {JSX.Element}
 */
export default function Page(): JSX.Element {
  const { getters, handlers, ref } = useContactsController();
  const {
    headers,
    tablePaginationData,
    newApplication,
    contactPagination,
    height,
    breadcrumbs,
    isModalOpen,
    approverData,
  } = getters;
  const { 
    changePage, 
    changeRows, 
    handleToggle,
    openModal,
    closeModal,
    handleInputChange,
    handleAddApprover,
  } = handlers;

  const table = useMemo(
    () => (
      <TableComponent<any>
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
        onToggle={handleToggle}
      />
    ),
    [
      tablePaginationData.page,
      tablePaginationData.limit,
      headers,
      newApplication,
      changePage,
      changeRows,
      contactPagination.totalCount,
      height,
      handleToggle,
    ]
  );
  
  const header = useMemo(
    () => (
      <div ref={ref}>
        <PageHeader
          title="Approvers"
          breadcrumbs={breadcrumbs}
          actions={
            <Button
              variant="contained"
              size="small"
              startIcon={<Icon icon={faUserPlus} />}
              onClick={openModal}
            >
              Add New Approver
            </Button>
          }
        />
      </div>
    ),
    [breadcrumbs, openModal, ref]
  );

  return (
    <>
      {header}
      {table}
      <AddApproverModal
        open={isModalOpen}
        onClose={closeModal}
        approverData={approverData}
        onInputChange={handleInputChange}
        onAddApprover={handleAddApprover}
      />
    </>
  );
}
