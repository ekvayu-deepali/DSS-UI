import { useCallback, useMemo, useState } from "react";
import useMeasure from "react-use-measure";
import { Theme, useMediaQuery, useTheme } from "@mui/material";

import { IHeader, TableComponentEnum } from "@/components/common";
import { RoutePathEnum } from "@/enum";
import { MeasureRefType } from "@/interfaces";
import {
  GET_TABLE_PAGINATION_DATA,
  tableActions,
  useAppDispatch,
  useAppSelector,
} from "@/redux";

import SwitchComponent from "@/components/common/switch/switch";

export const useContactsController = () => {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [approverData, setApproverData] = useState({
    email: "",
    password: "",
  });

  // Static data for the table
  const staticContactInfo = [
    {
      sn: 1,
      documentId: "IAF2023001",
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
      documentId: "IAF2023002",
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
      documentId: "IAF2023003",
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
      documentId: "IAF2023004",
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
      documentId: "IAF2023005",
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
      documentId: "IAF2023006",
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
      documentId: "IAF2023007",
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
      documentId: "IAF2023008",
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
      documentId: "IAF2023009",
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
      documentId: "IAF2023010",
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
      documentId: "IAF2023011",
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
      documentId: "IAF2023012",
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

  /**
   * @functions {handleToggle} - Handle toggle action
   * @param {number} rowIndex
   * @param {boolean} newValue
   */
  const handleToggle = useCallback(
    (rowIndex: number, newValue: boolean): void => {
      console.log(`Toggle changed for row ${rowIndex} to ${newValue}`);
      // Here you would typically update the state or make an API call
    },
    []
  );

  /**
   * @functions {openModal} - Open the add approver modal
   */
  const openModal = useCallback((): void => {
    setIsModalOpen(true);
  }, []);

  /**
   * @functions {closeModal} - Close the add approver modal
   */
  const closeModal = useCallback((): void => {
    setIsModalOpen(false);
    setApproverData({ email: "", password: "" });
  }, []);

  /**
   * @functions {handleInputChange} - Handle input changes in the modal
   */
  const handleInputChange = useCallback((event: any): void => {
    if (!event.event) return;
    const { name, value } = event.event.target;
    setApproverData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  /**
   * @functions {handleAddApprover} - Handle adding a new approver
   */
  const handleAddApprover = useCallback((): void => {
    console.log("Adding new approver:", approverData);
    // Here you would typically make an API call to add the approver
    // For now, we'll just close the modal
    closeModal();
  }, [approverData, closeModal]);

  const newApplication = useMemo(
    () =>
      staticContactInfo.map((item) => ({
        sn: item.sn,
        id: item.documentId, // Add the documentId as id
        name: item.creatorName,
        email: `${item.creatorId.toLowerCase()}@example.com`,
        createdDate: item.createdDate,
        action: true,
      })),
    []
  );

  const tablePaginationData = useAppSelector(GET_TABLE_PAGINATION_DATA);
  // Static pagination data

  const contactPagination = {
    totalCount: staticContactInfo.length,
  };

  // Rest of your code remains same
  const headers: IHeader[] = [
    {
      id: "sn",
      name: "SNo",
      hidden: false,
      width: 60,
      type: TableComponentEnum.STRING,
    },
    {
      id: "id",
      name: "ID",
      hidden: false,
      width: 120,
      type: TableComponentEnum.STRING,
    },
    {
      id: "name",
      name: "Name",
      hidden: false,
      width: 180,
      type: TableComponentEnum.STRING,
    },
    {
      id: "email",
      name: "Email",
      hidden: false,
      width: 200,
      type: TableComponentEnum.STRING,
    },
    {
      id: "createdDate",
      name: "Created Date",
      hidden: false,
      width: 180,
      type: TableComponentEnum.DATE,
    },
    {
      id: "action",
      name: "Action",
      hidden: false,
      width: 100,
      type: TableComponentEnum.COMPONENT,
      component: SwitchComponent,
    },
  ];

  const breadcrumbs = [
    {
      name: "Dashboard",
      path: RoutePathEnum.DASHBOARD,
      forwardParam: false,
    },
    {
      name: "Approver",
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
      isModalOpen,
      approverData,
    },
    handlers: {
      changePage,
      changeRows,
      getContactInformation: async () => () => { },
      handleToggle,
      openModal,
      closeModal,
      handleInputChange,
      handleAddApprover,
    },
    ref: ref as MeasureRefType,
  };
};
