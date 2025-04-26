// import React from "react";
// import { IconButton } from "@mui/material";
// import { faBars } from "@fortawesome/free-solid-svg-icons";

// import { Icon } from "../icon";
// import ThemeToggle from "../themeToggel";
// import {
//   HeaderActions,
//   HeaderContainer,
//   HeaderContent,
//   AppTitle,
// } from "./header.style";

// interface HeaderProps {
//   title?: string;
//   onToggleSidebar?: () => void;
// }

// export const Header: React.FC<HeaderProps> = ({ title, onToggleSidebar }) => {
//   return (
//     <HeaderContainer>
//       <HeaderContent>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             onClick={onToggleSidebar}
//           >
//             <Icon icon={faBars} size="medium" onlyIcon />
//           </IconButton>
//           <AppTitle variant="h6">Decision Support System</AppTitle>
//         </div>
//         <HeaderActions>
//           <ThemeToggle />
//         </HeaderActions>
//       </HeaderContent>
//     </HeaderContainer>
//   );
// };


import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Avatar, Typography, Box, Divider } from "@mui/material";
import { faBars, faUser, faSignOutAlt, faCog, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../icon";
import { useTheme } from "@/context/ThemeContext";
import { ThemeToggleEnum } from "../themeToggel/enum";
import {
  HeaderActions,
  HeaderContainer,
  HeaderContent,
  AppTitle,
} from "./header.style";
import styled from "@emotion/styled";

const MenuItemContent = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

interface HeaderProps {
  title?: string;
  onToggleSidebar?: () => void;
  username?: string;
  role?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onToggleSidebar,
  username = "Abhinandan@gmail.com",
  role = "Admin",
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { mode, toggleTheme } = useTheme();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add your logout logic here
    handleMenuClose();
    console.log("Logged out");
  };

  const handleProfileSettings = () => {
    handleMenuClose();
    console.log("Navigate to profile settings");
  };

  const handleThemeToggle = () => {
    toggleTheme();
    // Don't close the menu so user can see the theme change
  };

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
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 3 // Add gap between elements
          }}>
            {/* User Profile Section */}
            <Box sx={{
              display: "flex",
              alignItems: "center"
            }}>
              <Box sx={{ textAlign: "right", mr: 1 }}>
                <Typography variant="subtitle2" color="inherit">
                  {username}
                </Typography>
                <Typography variant="caption" color="gray">
                  {role}
                </Typography>
              </Box>
              <IconButton onClick={handleMenuOpen} sx={{ ml: 0.5 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "#1976d2" }}>
                  {username[0]}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    minWidth: 200,
                    borderRadius: 2,
                    mt: 1,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 3px 8px rgba(0,0,0,0.15))',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{ p: 2, pb: 1 }}>
                  <Avatar sx={{ width: 50, height: 50, mb: 1, mx: 'auto', bgcolor: "#1976d2" }}>
                    {username[0]}
                  </Avatar>
                  <Typography variant="body1" align="center" fontWeight="bold">{username}</Typography>
                  <Typography variant="caption" align="center" display="block" color="text.secondary">{role}</Typography>
                </Box>

                <Divider />

                <MenuItem onClick={handleProfileSettings} sx={{ py: 1.5 }}>
                  <MenuItemContent>
                    <Icon icon={faUser} size="small" onlyIcon />
                    <Typography variant="body2">Profile</Typography>
                  </MenuItemContent>
                </MenuItem>

                <MenuItem onClick={handleProfileSettings} sx={{ py: 1.5 }}>
                  <MenuItemContent>
                    <Icon icon={faCog} size="small" onlyIcon />
                    <Typography variant="body2">Settings</Typography>
                  </MenuItemContent>
                </MenuItem>

                <MenuItem onClick={handleThemeToggle} sx={{ py: 1.5 }}>
                  <MenuItemContent>
                    <Icon icon={mode === ThemeToggleEnum.LIGHT ? faMoon : faSun} size="small" onlyIcon />
                    <Typography variant="body2">{mode === ThemeToggleEnum.LIGHT ? "Dark Theme" : "Light Theme"}</Typography>
                  </MenuItemContent>
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                  <MenuItemContent>
                    <Icon icon={faSignOutAlt} size="small" onlyIcon />
                    <Typography variant="body2">Logout</Typography>
                  </MenuItemContent>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};
