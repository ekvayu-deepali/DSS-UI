import { useCallback, useMemo, useState } from "react";
import useMeasure from "react-use-measure";
import { Theme, useMediaQuery, useTheme } from "@mui/material";

import { IHeader, TableComponentEnum } from "@/components/common";
import { ChipComponent } from "@/components/common/chipComponent";
import { ViewButton } from "@/components/common/viewButton/viewButton";
import { RoutePathEnum } from "@/enum";
import { MeasureRefType } from "@/interfaces";
import {
  GET_TABLE_PAGINATION_DATA,
  tableActions,
  useAppDispatch,
  useAppSelector,
} from "@/redux";

import { AvatarMenu } from "@/components/common";
import { DownloadButton } from "@/components/common/downloadButton/downloadButton";

export const useContactsController = () => {
  // Static data for the table
  const staticContactInfo = [
    {
      sn: 1,
      documentId: "DOC2023001",
      documentType: "Intelligence Report",
      creatorName: "Capt. Sharma",
      creatorId: "IAF-2345",
      uploadedDate: "04/05/2025",
      approverId: "IAF-5678",
      createdDate: "02/05/2025",
      status: "Approved",
    },
    {
      sn: 2,
      documentId: "DOC2023002",
      documentType: "Border Activity Report",
      creatorName: "Lt. Col. Verma",
      creatorId: "IAF-3456",
      uploadedDate: "05/05/2025",
      approverId: "IAF-7890",
      createdDate: "03/05/2025",
      status: "Pending",
    },
    {
      sn: 3,
      documentId: "DOC2023003",
      documentType: "Diplomatic Analysis",
      creatorName: "Maj. Singh",
      creatorId: "IAF-4567",
      uploadedDate: "06/05/2025",
      approverId: "IAF-8901",
      createdDate: "04/05/2025",
      status: "Approved",
    },
    {
      sn: 4,
      documentId: "DOC2023004",
      documentType: "Regional Stability Assessment",
      creatorName: "Wing Cmdr. Patel",
      creatorId: "IAF-5678",
      uploadedDate: "07/05/2025",
      approverId: "IAF-9012",
      createdDate: "05/05/2025",
      status: "Rejected",
    },
    {
      sn: 5,
      documentId: "DOC2023005",
      documentType: "Threat Analysis",
      creatorName: "Grp. Capt. Kumar",
      creatorId: "IAF-6789",
      uploadedDate: "08/05/2025",
      approverId: "IAF-0123",
      createdDate: "06/05/2025",
      status: "Approved",
    },
    {
      sn: 6,
      documentId: "DOC2023006",
      documentType: "Strategic Report",
      creatorName: "Air Cmdr. Gupta",
      creatorId: "IAF-7890",
      uploadedDate: "09/05/2025",
      approverId: "IAF-1234",
      createdDate: "07/05/2025",
      status: "Pending",
    },
    {
      sn: 7,
      documentId: "DOC2023007",
      documentType: "Intelligence Report",
      creatorName: "Capt. Sharma",
      creatorId: "IAF-2345",
      uploadedDate: "10/05/2025",
      approverId: "IAF-5678",
      createdDate: "08/05/2025",
      status: "Approved",
    },
    {
      sn: 8,
      documentId: "DOC2023008",
      documentType: "Border Activity Report",
      creatorName: "Lt. Col. Verma",
      creatorId: "IAF-3456",
      uploadedDate: "11/05/2025",
      approverId: "IAF-7890",
      createdDate: "09/05/2025",
      status: "Pending",
    },
    {
      sn: 9,
      documentId: "DOC2023009",
      documentType: "Diplomatic Analysis",
      creatorName: "Maj. Singh",
      creatorId: "IAF-4567",
      uploadedDate: "12/05/2025",
      approverId: "IAF-8901",
      createdDate: "10/05/2025",
      status: "Approved",
    },
    {
      sn: 10,
      documentId: "DOC2023010",
      documentType: "Regional Stability Assessment",
      creatorName: "Wing Cmdr. Patel",
      creatorId: "IAF-5678",
      uploadedDate: "13/05/2025",
      approverId: "IAF-9012",
      createdDate: "11/05/2025",
      status: "Rejected",
    },
    {
      sn: 11,
      documentId: "DOC2023011",
      documentType: "Threat Analysis",
      creatorName: "Grp. Capt. Kumar",
      creatorId: "IAF-6789",
      uploadedDate: "14/05/2025",
      approverId: "IAF-0123",
      createdDate: "12/05/2025",
      status: "Approved",
    },
    {
      sn: 12,
      documentId: "DOC2023012",
      documentType: "Strategic Report",
      creatorName: "Air Cmdr. Gupta",
      creatorId: "IAF-7890",
      uploadedDate: "15/05/2025",
      approverId: "IAF-1234",
      createdDate: "13/05/2025",
      status: "Pending",
    },
  ];

  const [ref, { height }] = useMeasure();
  const theme: Theme = useTheme();
  const isMobileView: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([
    'documentId',
    'documentType',
    // 'creatorName',
    // 'creatorId',
    // 'status'
  ]);

  /**
   * @funtions {changeRows} - Update Rows to Show
   * @param {number} newRows
   */
  const changeRows = useCallback(
    (newRows: number): void => {
      dispatch(tableActions.setTableRows(newRows));
    },
    [dispatch]
  );

  /**
   * @functions {changePage} - Update Active Page
   * @param {number} newPage
   */
  const changePage = useCallback(
    (newPage: number): void => {
      dispatch(tableActions.setTablePage(newPage));
    },
    [dispatch]
  );

  const filteredData = useMemo(
    () =>
      staticContactInfo.filter((item) => {
        if (!searchTerm) return true;
        
        const searchLower = searchTerm.toLowerCase();
        return activeFilters.some(filter => {
          const value = item[filter as keyof typeof item];
          return value?.toString().toLowerCase().includes(searchLower);
        });
      }),
    [searchTerm, activeFilters]
  );

  // Remove this first declaration of newApplication
  // const newApplication = useMemo(
  //   () =>
  //     filteredData.map((item) => ({
  //       sn: item.sn,
  //       documentId: item.documentId,
  //       documentType: item.documentType,
  //       uploadedDate: item.uploadedDate,
  //       createdDate: item.createdDate,
  //     })),
  //   [filteredData]
  // );

  const tablePaginationData = useAppSelector(GET_TABLE_PAGINATION_DATA);
  // Static pagination data
  const { page, limit, isLoading } = tablePaginationData;

  const contactPagination = {
    totalCount: filteredData.length,
  };

  // Rest of your code remains same
  const breadcrumbs = [
    {
      name: "Dashboard",
      path: RoutePathEnum.DASHBOARD,
      forwardParam: false,
    },
    {
      name: "Report",
      path: RoutePathEnum.NONE,
      forwardParam: true,
    },
    {
      name: "Monthly Report",
      path: RoutePathEnum.NONE,
      forwardParam: true,
    },
  ];

  const handleSearch = useCallback((term: string, filters: string[]) => {
    setSearchTerm(term);
    setActiveFilters(filters);
    // Reset to first page when searching
    dispatch(tableActions.setTablePage(0));
  }, [dispatch]);

  const handleView = useCallback((documentId: string) => {
    console.log("Viewing document:", documentId);
    // Implement your view logic here
  }, []);

  const handleDownload = useCallback((documentId: string) => {
    console.log("Downloading document:", documentId);
    // Implement your download logic here
  }, []);

  const headers: IHeader[] = [
    {
      id: "sn",
      name: "SN",
      hidden: false,
      width: 60,
      type: TableComponentEnum.STRING,
    },
    {
      id: "documentId",
      name: "Report ID",
      hidden: false,
      width: 150,
      type: TableComponentEnum.STRING,
    },
    {
      id: "reportName",
      name: "Report Name",
      hidden: false,
      width: 180,
      type: TableComponentEnum.STRING,
    },
    {
      id: "documentType",
      name: "Report Type",
      hidden: false,
      width: 180,
      type: TableComponentEnum.STRING,
    },
    // {
    //   id: "uploadedDate",
    //   name: "Uploaded Date",
    //   hidden: false,
    //   width: 180,
    //   type: TableComponentEnum.DATE,
    // },
    {
      id: "createdDate",
      name: "Generated Date",
      hidden: false,
      width: 180,
      type: TableComponentEnum.DATE,
    },
    {
      id: "view",
      name: "View",
      hidden: false,
      width: 70,
      type: TableComponentEnum.COMPONENT,
      component: ViewButton,
    },
    {
      id: "download",
      name: "Download",
      hidden: false,
      width: 70,
      type: TableComponentEnum.COMPONENT,
      component: DownloadButton,
    }
  ];

  const newApplication = useMemo(
    () =>
      filteredData.map((item) => ({
        sn: item.sn,
        documentId: item.documentId,
        reportName: `Report ${item.documentId}`,
        documentType: item.documentType,
        // uploadedDate: item.uploadedDate,
        createdDate: item.createdDate,
        view: {
          component: ViewButton,
          props: {
            onClick: () => handleView(item.documentId)
          }
        },
        download: {
          component: DownloadButton,
          props: {
            onClick: () => handleDownload(item.documentId)
          }
        }
      })),
    [filteredData, handleView, handleDownload]
  );

  return {
    getters: {
      breadcrumbs,
      headers,
      contactPagination,
      tablePaginationData,
      isLoading: false,
      isOpenDrawer: false,
      filter: {} as any,
      newApplication,
      height,
      isMobileView,
    },
    handlers: {
      changePage,
      changeRows,
      handleSearch,
      handleView,
      handleDownload,
      getContactInformation: async () => () => {},
    },
    ref: ref as MeasureRefType,
  };
};
