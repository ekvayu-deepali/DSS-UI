// Disabled cause of non null assertion used due to defaultProps
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { JSX, memo, useState } from "react";
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

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <QuickDetailsCard
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
        <AvatarIcon background={backgroundColor} isHovered={isHovered}>
          <Icon icon={icon} size="medium" color="inherit" onlyIcon />
        </AvatarIcon>
      </CardContent>
      <Divider />
      <CardActions
        sx={[
          {
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-start",
            padding: theme.spacing(1, 3),
          },
        ]}
      >
        <Typography
          variant="body2"
          sx={{ color: backgroundColor, fontWeight: 600 }}
        >
          {percentage}%
        </Typography>
        <Typography
          color={theme.palette.text.secondary}
          variant="body2"
          sx={{ ml: 0.5 }}
        >
          from last month
        </Typography>
      </CardActions>
    </QuickDetailsCard>
  );
}

export default memo(QuickDetails);
