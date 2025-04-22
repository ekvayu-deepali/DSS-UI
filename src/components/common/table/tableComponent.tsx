"use client";

import React, {
  JSX,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import dynamic from "next/dynamic";

import {
  NoDataFound,
  TableHeightEnum,
  CustomTableBody,
  CustomTableHead,
  CustomTablePagination,
  IHeader,
  ICustomTablePagination,
} from "@/components/common";
import { TableContainer } from "./tableComponent.style";

const Table = dynamic(() => import("@mui/material/Table"));
const TableRow = dynamic(() => import("@mui/material/TableRow"));
const TableFooter = dynamic(() => import("@mui/material/TableFooter"));

interface ITableProps<T> {
  headerField: IHeader[];
  tableBody: T[];
  paginationData: ICustomTablePagination;
  isLoading: boolean;
  translation: {
    noDataTitle: string;
    noDataCaption?: string;
  };
  maxHeight?: number;
  onRowClick?: (index: number) => void;
}

/**
 * Table component
 * @param {ITableProps} tableProps
 * @return {JSX.Element}
 */
export function TableComponent<T>(tableProps: ITableProps<T>): JSX.Element {
  const {
    headerField,
    translation,
    tableBody,
    isLoading,
    maxHeight = 0,
  } = tableProps;
  const newHeight = maxHeight + TableHeightEnum.HEADERHEIGHT;
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  }, [isLoading]);

  /**
   * No Data was Found
   * @return {ReactNode}
   */
  const noData = useCallback((): ReactNode => {
    if (tableBody.length <= 0 && !isLoading) {
      return <NoDataFound title={translation.noDataTitle} />;
    }
    return null;
  }, [isLoading, tableBody.length, translation.noDataTitle]);

  const header = useMemo(
    () => <CustomTableHead headerField={headerField} />,
    [headerField]
  );

  const body = useMemo(
    () => (
      <CustomTableBody<T>
        {...tableProps}
        onRowClick={tableProps.onRowClick || (() => {})}
      />
    ),
    [tableProps]
  );
  const { paginationData } = tableProps;

  return (
    <>
      <TableContainer newHeight={newHeight} ref={tableContainerRef}>
        <Table stickyHeader aria-label="sticky table">
          {header}
          {body}
        </Table>
        {noData()}
      </TableContainer>
      <Table>
        <TableFooter>
          <TableRow>
            {headerField.length > 0 && tableBody.length > 0 && (
              <CustomTablePagination {...paginationData} />
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

export default React.memo(TableComponent);
