import React from "react";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { Icon } from "../icon";
import ThemeToggle from "../themeToggel";
import { HeaderActions, HeaderContainer, HeaderContent, HeaderTitle } from "./header.style";

interface HeaderProps {
  title?: string;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onToggleSidebar }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <HeaderContainer>
      <HeaderContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onToggleSidebar}
            sx={{ mr: 2 }}
          >
            <Icon
              icon={faBars}
              size="medium"
              onlyIcon
              color={theme.palette.text.primary}
            />
          </IconButton>
          <HeaderTitle variant="h6">{title}</HeaderTitle>
        </div>
        <HeaderActions>
          <ThemeToggle />
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};
