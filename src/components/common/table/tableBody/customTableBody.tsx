// Any is used in case of Array values which need to be Shown on the Table
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { Box, Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { MathHelper, StringHelper } from '@/helpers';

import { TableCellGenerator } from '../tableCellGenerator';
import { IHeader, ICustomTablePagination } from '../interface';
import { TableComponentEnum } from '../enum';

interface ICustomTableBodyProps<T> {
  headerField: IHeader[];
  paginationData: ICustomTablePagination;
  isLoading: boolean;
  tableBody: T[];
  onRowClick: (index: number) => void;
}

/**
 * Custom table body component
 * @param {ICustomTableBodyProps<T>} props
 * @return {ReactElement}
 */
export function CustomTableBody<T>(
  props: ICustomTableBodyProps<T>,
): ReactElement {
  const { headerField, tableBody, isLoading, paginationData, onRowClick } =
    props;

  /**
   * Arrange the Table in Form as Header
   * @param {unknown[]} responseArray
   * @param {IHeader[]} header
   * @return {T[]}
   */
  function generateRowsInOrder(
    responseArray: unknown[],
    header: IHeader[],
  ): T[] {
    // Any type because this both can have data of any type
    const finalRowArray: any = [];
    let objectHeaderOrder: any = {};

    for (let index = 0; index < header.length; index += 1) {
      const headerItem: IHeader = header[index];
      objectHeaderOrder = { [headerItem.id]: null, ...objectHeaderOrder };
    }

    for (let i = 0; i < responseArray.length; i += 1) {
      const shadowHeaderOrder = { ...objectHeaderOrder };
      const responseElement = responseArray[i];
      const addObjectResource = Object.assign(
        shadowHeaderOrder,
        responseElement,
      );
      finalRowArray.push({ ...addObjectResource });
    }

    return finalRowArray as T[];
  }

  /**
   * Arrange the Table in Form as SubHeader
   * @param {unknown[]} responseArray
   * @param {IHeader[]} header
   * @return {T[]}
   */
  function generateSubArrayInOrder(
    responseArray: unknown[],
    header: IHeader[],
  ): T[] {
    const finalRowArray: { [x: string]: string }[] = [];
    let objectOrder = {};
    for (let index = 0; index < header.length; index += 1) {
      const headerItem: IHeader = header[index];
      objectOrder = { [headerItem.id]: null, ...objectOrder };
    }
    Object.keys(objectOrder).forEach((key) => {
      // any-the key will be any type.
      const filterData: any = responseArray.find((res: any) => res.key === key);
      if (filterData && key === filterData.key) {
        finalRowArray.push({
          [key]: filterData.value,
        });
      } else {
        finalRowArray.push({
          [key]: '-',
        });
      }
    });

    return finalRowArray as unknown as T[];
  }

  if (isLoading) {
    return (
      <TableBody key={uuidv4().toString()}>
        {Array.from(Array(paginationData.limit).keys()).map(() => (
          <TableRow key={uuidv4().toString()}>
            {headerField.map(
              (item) =>
                !item.hidden &&
                item.type !== TableComponentEnum.ARRAY && (
                  <TableCell key={uuidv4().toString()}>
                    <Skeleton
                      sx={{ width: `${MathHelper.generateRandom(25, 50)}%` }}
                      variant="text"
                      animation="wave"
                    />
                  </TableCell>
                ),
            )}
            {headerField.map(
              (item) =>
                item.subArray &&
                item.subArray.map(
                  (items: IHeader) =>
                    !items.hidden && (
                      <TableCell key={uuidv4().toString()}>
                        <Skeleton
                          sx={{ width: '100%' }}
                          variant="text"
                          animation="wave"
                        />
                      </TableCell>
                    ),
                ),
            )}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <TableBody>
      {generateRowsInOrder(tableBody, headerField).map(
        (data: unknown, rowIndex: number) => (
          <TableRow
            key={StringHelper.generateUID('tableRow', rowIndex)}
            onClick={() => onRowClick(rowIndex)}
          >
            {[...Object.values(data as object).reverse()].map(
              (value, index: number) => {
                if (headerField && headerField[index]?.hidden) {
                  return null;
                }
                if (
                  Array.isArray(value) &&
                  headerField[index].type === TableComponentEnum.ARRAY
                ) {
                  const subArray = headerField[index].subArray || [];

                  return (
                    generateSubArrayInOrder(value, subArray)
                      .reverse()
                      // any subheader will be any type
                      .map((res: any, subIndex: number) => (
                        <TableCell key={uuidv4().toString()}>
                          <Box
                            sx={
                              subArray[subIndex].width
                                ? {
                                    width: `${subArray[subIndex].width}px`,
                                    textOverflow: 'ellipsis',
                                  }
                                : {}
                            }
                          >
                            <TableCellGenerator
                              header={subArray[subIndex]}
                              value={res[subArray[subIndex].id]}
                              index={rowIndex}
                            />
                          </Box>
                        </TableCell>
                      ))
                  );
                }

                return (
                  <TableCell key={uuidv4().toString()}>
                    <Box
                      sx={
                        headerField[index].width
                          ? {
                              width: `${headerField[index].width}px`,
                              textOverflow: 'ellipsis',
                            }
                          : {}
                      }
                    >
                      <TableCellGenerator
                        header={headerField[index]}
                        value={value}
                        index={rowIndex}
                      />
                    </Box>
                  </TableCell>
                );
              },
            )}
          </TableRow>
        ),
      )}
    </TableBody>
  );
}
