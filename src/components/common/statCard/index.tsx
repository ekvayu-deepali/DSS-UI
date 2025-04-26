"use client";

import React from "react";
import { Box } from "@mui/material";
import {
  StyledCard,
  CardContent,
  HeaderContainer,
  StatName,
  StatValue,
  IconContainer,
  FooterContainer,
  ChangeText,
  PeriodText
} from "./styles";

interface StatCardProps {
  name: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ name, value, icon, change, iconColor }) => {
  // Extract color from icon props if not provided directly
  const extractIconColor = () => {
    if (iconColor) return iconColor;

    // Try to extract color from icon props if it's a React element
    if (React.isValidElement(icon) && icon.props) {
      // Use type assertion to access color property
      const props = icon.props as { color?: string };
      if (props.color) {
        return props.color;
      }
    }

    return undefined;
  };

  const color = extractIconColor();

  return (
    <StyledCard>
      <CardContent>
        <HeaderContainer>
          <Box>
            <StatName variant="body2">
              {name}
            </StatName>
            <StatValue variant="h4">
              {value}
            </StatValue>
          </Box>
          <IconContainer color={color}>
            {icon}
          </IconContainer>
        </HeaderContainer>
        <FooterContainer>
          <ChangeText variant="body2">
            {change}
          </ChangeText>
          <PeriodText variant="body2">
            from last month
          </PeriodText>
        </FooterContainer>
      </CardContent>
    </StyledCard>
  );
};

export default StatCard;
