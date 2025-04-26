// Disabled cause of non null assertion used due to defaultProps
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { JSX, memo } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Box, Typography, Divider, useTheme, CardActions } from "@mui/material";

import { AvatarIcon, CardContent, QuickDetailsCard } from "./quickDetail.style";

import { Icon } from "@/components/common";

interface IQuickDetail {
  title: string;
  count: number;
  percentage?: number;
  icon: IconDefinition;
  backgroundColor: string;
}

/**
 * Quick Details Card
 * @param {IQuickDetail} props
 * @return {JSX.Element}
 */
export function QuickDetails(props: IQuickDetail): JSX.Element {
  const { title, count, percentage, icon, backgroundColor } = props;

  const theme = useTheme();

  return (
    <QuickDetailsCard>
      <CardContent>
        <Box>
          <Typography
            color={theme.palette.dashboardCard.textMain}
            variant="body1"
            fontWeight={600}
          >
            {title}
          </Typography>
          <Typography
            sx={{ mt: 1 }}
            variant="h5"
            color={theme.palette.dashboardCard.textSecondary}
          >
            {count}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions
        sx={[
          {
            alignItems: "center",
            display: "flex",
          },
        ]}
      >
        <AvatarIcon background={backgroundColor}>
          <Icon icon={icon} size="small" color="inherit" onlyIcon />
        </AvatarIcon>
        <Typography
          color={theme.palette.dashboardCard.textSecondary}
          sx={{ ml: 1 }}
          variant="body2"
        >
          {percentage}%
        </Typography>
      </CardActions>
    </QuickDetailsCard>
  );
}

export default memo(QuickDetails);
