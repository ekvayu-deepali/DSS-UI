/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableComponentEnum } from '../enum';

export interface IHeader {
  id: string; // Must Match Data from Table
  name: string;
  hidden: boolean;
  type: TableComponentEnum;
  subArray?: IHeader[];
  // Component will be any type of
  component?: any;
  tooltip?: string;
  width?: number;
}

export interface IMetaData {
  isNextPage: boolean;
  totalCount: number;
}

export interface ICustomTablePagination {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}
