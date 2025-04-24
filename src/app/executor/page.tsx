"use client";

import React, { JSX, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

import { Icon, PageHeader, TableComponent } from "@/components/common";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { RoutePathEnum } from "@/enum";

/**
 * @page {Executor} - Display Executor Information
 * @return {JSX.Element}
 */
export default function Executor(): JSX.Element {
  const router = useRouter();
  
  // Static data for the table
  const executorData = [
    {
      sn: 1,
      executorId: "EXE2023001",
      executorName: "Capt. Sharma",
      department: "Intelligence",
      assignedTasks: 5,
      completedTasks: 3,
      pendingTasks: 2,
      lastActive: "04/05/2025",
      status: "Active",
    },
    {
      sn: 2,
      executorId: "EXE2023002",
      executorName: "Lt. Col. Verma",
      department: "Operations",
      assignedTasks: 8,
      completedTasks: 6,
      pendingTasks: 2,
      lastActive: "05/05/2025",
      status: "Active",
    },
    {
      sn: 3,
      executorId: "EXE2023003",
      executorName: "Maj. Singh",
      department: "Tactical",
      assignedTasks: 4,
      completedTasks: 4,
      pendingTasks: 0,
      lastActive: "03/05/2025",
      status: "Inactive",
    },
  ];

  // Table headers
  const headers = [
    {
      id: "sn",
      name: "SN",
      hidden: false,
      width: 60,
    },
    {
      id: "executorId",
      name: "Executor ID",
      hidden: false,
      width: 120,
    },
    {
      id: "executorName",
      name: "Executor Name",
      hidden: false,
      width: 180,
    },
    {
      id: "department",
      name: "Department",
      hidden: false,
      width: 150,
    },
    {
      id: "assignedTasks",
      name: "Assigned Tasks",
      hidden: false,
      width: 120,
    },
    {
      id: "completedTasks",
      name: "Completed Tasks",
      hidden: false,
      width: 120,
    },
    {
      id: "pendingTasks",
      name: "Pending Tasks",
      hidden: false,
      width: 120,
    },
    {
      id: "lastActive",
      name: "Last Active",
      hidden: false,
      width: 120,
    },
    {
      id: "status",
      name: "Status",
      hidden: false,
      width: 100,
    },
  ];

  const breadcrumbs = [
    {
      name: "Dashboard",
      path: RoutePathEnum.DASHBOARD,
      forwardParam: false,
    },
    {
      name: "Executor",
      path: RoutePathEnum.NONE,
      forwardParam: true,
    },
  ];

  const table = useMemo(
    () => (
      <TableComponent<any>
        isLoading={false}
        headerField={headers}
        tableBody={executorData}
        paginationData={{
          onPageChange: () => {},
          onRowsPerPageChange: () => {},
          total: executorData.length,
          page: 0,
          limit: 10,
        }}
        translation={{
          noDataTitle: "No Data Found",
        }}
      />
    ),
    [headers, executorData]
  );

  const header = useMemo(
    () => (
      <div>
        <PageHeader
          title="Executor"
          breadcrumbs={breadcrumbs}
          actions={
            <Button
              variant="contained"
              size="small"
              startIcon={<Icon icon={faUpload} />}
              onClick={() => {
                // Add action for executor upload or creation
              }}
            >
              Add Executor
            </Button>
          }
        />
      </div>
    ),
    [router]
  );

  return (
    <>
      {header}
      {table}
    </>
  );
}
