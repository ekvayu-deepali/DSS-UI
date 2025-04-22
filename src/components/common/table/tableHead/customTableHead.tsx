import React, { ReactElement } from "react";
import { Box, TableHead, TableRow, Tooltip, TableCell } from "@mui/material";

import { IHeader } from "../interface";
import { StringHelper } from "@/helpers";

interface ICustomTableHeadProps {
  headerField: IHeader[];
}

/**
 * Custom table head component
 * @param {ICustomTableHeadProps} props
 * @return {ReactElement}
 */
export function CustomTableHead(props: ICustomTableHeadProps): ReactElement {
  const { headerField } = props;

  return (
    <TableHead>
      <TableRow>
        {headerField.map((field: IHeader, index: number) => {
          if (field.hidden) {
            return null;
          }
          if (field.subArray) {
            return field.subArray.map((subField: IHeader) => (
              <TableCell key={subField.id}>{subField.name}</TableCell>
            ));
          }

          return (
            <TableCell key={StringHelper.generateUID("tableCell", index)}>
              <Tooltip title={field.tooltip} arrow followCursor>
                <Box sx={field.width ? { width: `${field.width}px` } : {}}>
                  {field.name}
                </Box>
              </Tooltip>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
