import useMeasure from "react-use-measure";

import { IHeader, TableComponentEnum } from "@/components/common";
import { RoutePathEnum } from "@/enum";
import { MeasureRefType } from "@/interfaces";
import {
  GET_TABLE_PAGINATION_DATA,
  tableActions,
  useAppDispatch,
  useAppSelector,
} from "@/redux";
import { Theme, useMediaQuery, useTheme } from "@mui/material";
import { useCallback, useMemo } from "react";

export const useContactsController = () => {
  // Static data for the table
  const staticContactInfo = [
    {
      sn: 1,
      reportName: "Metetrological Report",
      origin: "IAF Meterology Department",
      category: "softcopy",
      uploadDate: "04/05/2025",
    },
    {
      sn: 2,
      reportName: "Squadron Training Feedback",
      origin: "Air Force station, Gujrat",
      category: "Hardcopy",
      uploadDate: "04/05/2025",
    },
    {
      sn: 3,
      reportName: "Annual Operational Curriculum",
      origin: "IAF Training command",
      category: "softcopy",
      uploadDate: "04/05/2025",
    },
    {
      sn: 4,
      reportName: "Metetrological Report",
      origin: "IAF Meterology Department",
      category: "softcopy",
      uploadDate: "04/05/2025",
    },
    {
      sn: 5,
      reportName: "Squadron Training Feedback",
      origin: "Air Force station, Gujrat",
      category: "Hardcopy",
      uploadDate: "04/05/2025",
    },
    {
      sn: 6,
      reportName: "Annual Operational Curriculum",
      origin: "IAF Training command",
      category: "softcopy",
      uploadDate: "04/05/2025",
    },
    {
      sn: 7,
      reportName: "Metetrological Report",
      origin: "IAF Meterology Department",
      category: "softcopy",
      uploadDate: "04/05/2025",
    },
    {
      sn: 8,
      reportName: "Squadron Training Feedback",
      origin: "Air Force station, Gujrat",
      category: "Hardcopy",
      uploadDate: "04/05/2025",
    },
    {
      sn: 9,
      reportName: "Annual Operational Curriculum",
      origin: "IAF Training command",
      category: "softcopy",
      uploadDate: "04/05/2025",
    },
    {
      sn: 10,
      reportName: "Metetrological Report",
      origin: "IAF Meterology Department",
      category: "softcopy",
      uploadDate: "04/05/2025",
    },
    {
      sn: 11,
      reportName: "Squadron Training Feedback",
      origin: "Air Force station, Gujrat",
      category: "Hardcopy",
      uploadDate: "04/05/2025",
    },
    {
      sn: 12,
      reportName: "Annual Operational Curriculum",
      origin: "IAF Training command",
      category: "softcopy",
      uploadDate: "04/05/2025",
    },
  ];

  const [ref, { height }] = useMeasure();
  const theme: Theme = useTheme();
  const isMobileView: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();

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

  const newApplication = useMemo(
    () =>
      staticContactInfo.map((item) => ({
        sn: item.sn,
        reportName: item.reportName,
        origin: item.origin,
        category: item.category,
        uploadDate: item.uploadDate,
        // issue: item.issue || "None",
      })),
    []
  );

  const tablePaginationData = useAppSelector(GET_TABLE_PAGINATION_DATA);
  // Static pagination data
  const { page, limit, isLoading } = tablePaginationData;

  const contactPagination = {
    totalCount: staticContactInfo.length,
  };

  // Rest of your code remains same
  const headers: IHeader[] = [
    {
      id: "sn",
      name: "SN",
      hidden: false,
      width: 80,
      type: TableComponentEnum.STRING,
    },
    {
      id: "reportName",
      name: "Report Name",
      hidden: false,
      width: 150,
      type: TableComponentEnum.STRING,
    },
    {
      id: "origin",
      name: "Origin",
      hidden: false,
      width: 180,
      type: TableComponentEnum.STRING,
    },
    {
      id: "category",
      name: "Category",
      hidden: false,
      width: 180,
      type: TableComponentEnum.STRING,
    },
    {
      id: "uploadDate",
      name: "Upload Date",
      hidden: false,
      width: 150,
      type: TableComponentEnum.STRING,
    },
    // {
    //   id: "validityTill",
    //   name: "ValidityTill",
    //   hidden: false,
    //   width: 150,
    //   type: TableComponentEnum.STRING,
    // },
    // {
    //   id: "issue",
    //   name: "Issue",
    //   hidden: false,
    //   width: 180,
    //   type: TableComponentEnum.STRING,
    // },
  ];

  const breadcrumbs = [
    {
      name: "Dashboard",
      path: RoutePathEnum.DASHBOARD,
      forwardParam: false,
    },
    {
      name: "Confidential",
      path: RoutePathEnum.NONE, 
      forwardParam: true,
    },
    {
      name: "Geo Political",
      path: RoutePathEnum.NONE,
      forwardParam: true,
    },
  ];

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
      getContactInformation: async () => () => {},
    },

    ref: ref as MeasureRefType,
  };
};
