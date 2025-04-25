"use client";

import React, { useEffect, useState } from "react";
import { List, Collapse, useTheme } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { Icon } from "@/components/common/icon";
import {
  SidebarContainer,
  SidebarContent,
  StyledListItem,
  StyledListItemIcon,
  StyledListItemText,
  ExpandIconStyle,
  NestedList,
} from "./sidebar.style";
import { executorMenuItems } from "@/json/sidebarData/executor";
import { adminMenuItems } from "@/json/sidebarData/admin";
import { IMenuItem } from "@/interfaces";

export const Sidebar: React.FC<{ isOpen?: boolean }> = ({ isOpen = true }) => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);

  useEffect(() => {
    // Get user role from localStorage
    const userRole = localStorage.getItem("userRole");

    // Determine which menu to show based on user role
    if (userRole === "admin" || userRole === "approver") {
      setMenuItems(adminMenuItems);
    } else if (userRole === "executor") {
      setMenuItems(executorMenuItems);
    }
  }, []);

  useEffect(() => {
    setSelectedItem(pathname);
    menuItems.forEach((item) => {
      if (item.submenu) {
        const hasSelectedChild = item.submenu.some(
          (subItem) => subItem.path === pathname
        );
        if (hasSelectedChild) {
          setOpenSubMenu(item.title);
        }
      }
    });
  }, [pathname, menuItems]);

  const handleClick = (path?: string, title?: string) => {
    if (path) {
      setSelectedItem(path);
      router.push(path);
    } else if (title) {
      setOpenSubMenu(openSubMenu === title ? null : title);
    }
  };

  const renderMenuItem = (item: IMenuItem) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isOpen = openSubMenu === item.title;
    const isSelected = item.path === selectedItem;

    return (
      <React.Fragment key={item.title}>
        <StyledListItem
          onClick={() => handleClick(item.path, item.title)}
          className={isSelected ? "selected" : ""}
        >
          <StyledListItemIcon>
            <Icon
              icon={item.icon}
              size="small"
              onlyIcon
              color={
                isSelected
                  ? theme.palette.primary.main
                  : theme.palette.text.primary
              }
            />
          </StyledListItemIcon>
          <StyledListItemText primary={item.title} />
          {hasSubmenu && (
            <ExpandIconStyle>
              {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ExpandIconStyle>
          )}
        </StyledListItem>

        {hasSubmenu && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <NestedList>
              {item.submenu?.map((subItem) => {
                const isSubItemSelected = subItem.path === selectedItem;
                return (
                  <StyledListItem
                    key={subItem.title}
                    onClick={() => handleClick(subItem.path)}
                    className={isSubItemSelected ? "selected" : ""}
                  >
                    <StyledListItemIcon>
                      <Icon
                        icon={subItem.icon}
                        size="small"
                        onlyIcon
                        color={
                          isSubItemSelected
                            ? theme.palette.primary.main
                            : theme.palette.text.primary
                        }
                      />
                    </StyledListItemIcon>
                    <StyledListItemText primary={subItem.title} />
                  </StyledListItem>
                );
              })}
            </NestedList>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <SidebarContainer className={isOpen ? "" : "icon-only"}>
      <SidebarContent>
        <List component="nav">{menuItems.map(renderMenuItem)}</List>
      </SidebarContent>
    </SidebarContainer>
  );
};
