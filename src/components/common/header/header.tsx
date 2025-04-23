import React from "react";
import { IconButton } from "@mui/material";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { Icon } from "../icon";
import ThemeToggle from "../themeToggel";
import {
  HeaderActions,
  HeaderContainer,
  HeaderContent,
  AppTitle,
} from "./header.style";

interface HeaderProps {
  title?: string;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onToggleSidebar }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onToggleSidebar}
          >
            <Icon icon={faBars} size="medium" onlyIcon />
          </IconButton>
          <AppTitle variant="h6">Decision Support System</AppTitle>
        </div>
        <HeaderActions>
          <ThemeToggle />
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};
