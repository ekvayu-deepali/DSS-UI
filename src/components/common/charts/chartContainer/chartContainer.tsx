"use client";

import React, { JSX, memo, MouseEvent, ReactNode, useState } from "react";
import { CardHeader, Divider, Menu, MenuItem } from "@mui/material";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { Icon } from "@/components/common/icon/icon";

import { ChartCard } from "./chartContainer.style";
import { useChart } from "../context/chart-context";

export interface IChartsContainerProps {
  title: string;
  children: ReactNode;
  description?: string;
  enableDataDownload?: boolean;
  height?: string | number;
  onDataDownload?: () => void;
  disableAction?: boolean;
}

/**
 * Common Chart Container
 * @param {IChartsContainerProps} props
 * @return {JSX.Element}
 */
export function ChartContainer(props: IChartsContainerProps): JSX.Element {
  const {
    title,
    children,
    description,
    enableDataDownload,
    height,
    onDataDownload,
    disableAction,
  } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const value = useChart();

  /**
   * handle click
   * @param  {MouseEvent<HTMLElement>} event
   */
  const handleClick = () => (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * handle close
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ChartCard
      height={height}
      sx={{
        overflow: "visible",
      }}
    >
      <CardHeader
        title={title}
        subheader={description}
        action={
          <>
            {disableAction && (
              <Icon
                icon={faEllipsisVertical}
                onClick={handleClick}
                label="More Options"
              />
            )}
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  value.export.csv();
                  handleClose();
                }}
              >
                Download CSV
              </MenuItem>
              <MenuItem
                onClick={() => {
                  value.export.png();
                  handleClose();
                }}
              >
                Download PNG
              </MenuItem>
              <MenuItem
                onClick={() => {
                  value.export.svg();
                  handleClose();
                }}
              >
                Download SVG
              </MenuItem>
              {enableDataDownload && (
                <MenuItem
                  onClick={() => {
                    if (onDataDownload) {
                      onDataDownload();
                      handleClose();
                    }
                  }}
                >
                  "Download Data",
                </MenuItem>
              )}
            </Menu>
          </>
        }
      />
      <Divider />
      {children}
    </ChartCard>
  );
}
export default memo(ChartContainer);
