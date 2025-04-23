"use client";

import React, { ReactElement, useEffect, useRef, useState } from "react";
import Image from "next/legacy/image";
import { Typography, Tooltip } from "@mui/material";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { DateTime } from "luxon";

import {
  CalenderIcon,
  DateCellWrapper,
  TableImage,
  TableTextBox,
} from "./tableCellGenerator.style";
import { TableComponentEnum } from "../enum";
import { IHeader } from "../interface";

interface ITableCellGeneratorProps {
  header: IHeader;
  value: unknown;
  index: number;
}

/**
 * Generate Table Cell
 * @param {IHeader} header
 * @param {unknown} value
 * @param {number}index
 * @return {ReactElement}
 */
export function TableCellGenerator({
  header,
  value,
  index,
}: ITableCellGeneratorProps): ReactElement {
  const [isOverflowed, setIsOverflow] = useState<boolean>(false);
  const textElementRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (textElementRef.current) {
      setIsOverflow(
        textElementRef.current.scrollWidth > textElementRef.current.clientWidth
      );
    }
  }, []);

  /**
   * Generate Table Cell Data
   * @return {ReactElement}
   */
  const generate = (): ReactElement => {
    switch (header?.type) {
      case TableComponentEnum.DATE:
        if (!value) {
          return <>-</>;
        }

        if (value === "-") {
          return <>-</>;
        }
        return (
          <DateCellWrapper>
            <CalenderIcon icon={faCalendarAlt} color="default" />
            <Typography variant="body2">
              {DateTime.fromJSDate(new Date(value as string))
                .setLocale("en-US")
                .toLocaleString({
                  ...DateTime.DATETIME_SHORT,
                  hour12: true,
                })}
            </Typography>
          </DateCellWrapper>
        );

      case TableComponentEnum.COMPONENT:
        return <header.component value={value} index={index} />;
      case TableComponentEnum.TAG:
        return <header.component value={value} />;
      case TableComponentEnum.IMAGE:
        return (
          <TableImage>
            <Image src={value as string} layout="fill" />
          </TableImage>
        );
      case TableComponentEnum.NUMBER:
      default:
        if (!value) {
          return <> - </>;
        }
        if (typeof value === "object") {
          return <Typography>{value.toString()}</Typography>;
        }
        return (
          <Tooltip
            title={value as string}
            arrow
            followCursor
            disableHoverListener={!isOverflowed}
          >
            <TableTextBox
              ref={textElementRef}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {(value as string) || ""}
            </TableTextBox>
          </Tooltip>
        );
    }
  };

  return generate();
}
