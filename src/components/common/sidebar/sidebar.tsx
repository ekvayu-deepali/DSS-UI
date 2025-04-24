"use client";

import React, { useEffect, useState } from "react";
import { List, Collapse, useTheme } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import {
  ExpandLess,
  ExpandMore,
  Dashboard,
  Security,
  Description,
  AdminPanelSettings,
  Assignment,
} from "@mui/icons-material";
import {
  faGlobe,
  faFileLines,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

import { Icon } from "@/components/common/icon";
import { LocalStorageEnum } from "@/enum";
import { StorageHelper } from "@/utills";
import {
  SidebarContainer,
  SidebarContent,
  StyledListItem,
  StyledListItemIcon,
  StyledListItemText,
  ExpandIconStyle,
  NestedList,
} from "./sidebar.style";

interface MenuItem {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  faIcon?: any;
  submenu?: MenuItem[];
}

// Regular menu items for executors
const executorMenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Dashboard />,
  },
  {
    title: "Confidential",
    icon: <Security />,
    submenu: [
      {
        title: "Geo Political",
        path: "/confidential/geo-political",
        faIcon: faGlobe,
      },
      {
        title: "Metrology",
        path: "/confidential/metrology",
        faIcon: faFileLines,
      },
      {
        title: "Miscellaneous",
        path: "/confidential/miscellaneous",
        faIcon: faFileLines,
      },
      {
        title: "Organization and Management",
        path: "/confidential/organization-and-management",
        faIcon: faFileLines,
      },
      {
        title: "Training",
        path: "/confidential/training",
        faIcon: faFileLines,
      },
    ],
  },

  {
    title: "OSINT",
    icon: <Security />,
    submenu: [
      {
        title: "Geo Political",
        path: "/osint/geo-political",
        faIcon: faGlobe,
      },
      {
        title: "Metrology",
        path: "/osint/metrology",
        faIcon: faFileLines,
      },
      {
        title: "Miscellaneous",
        path: "/osint/miscellaneous",
        faIcon: faFileLines,
      },
      {
        title: "Organization and Management",
        path: "/osint/organization-and-management",
        faIcon: faFileLines,
      },
      {
        title: "Training",
        path: "/osint/training",
        faIcon: faFileLines,
      },
    ],
  },
];

// Admin menu items
const adminMenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Dashboard />,
  },
  {
    title: "Approver",
    path: "/approver",
    icon: <AdminPanelSettings />,
  },
  {
    title: "Executor",
    path: "/executor",
    icon: <Assignment />,
  },
];

export const Sidebar: React.FC<{ isOpen?: boolean }> = ({ isOpen = true }) => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    // Get user role from localStorage or your auth system
    const userRole = localStorage.getItem("userRole"); // Replace with your actual role storage method

    // Determine which menu to show based on user role
    if (userRole === "admin" || userRole === "approver") {
      setMenuItems(adminMenuItems);
    } else if (userRole === "executor") {
      setMenuItems(executorMenuItems);
    }
  }, []);

  // Set the selected item based on the current path
  useEffect(() => {
    setSelectedItem(pathname);

    // Also open the submenu if the current path is in a submenu
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

  const renderMenuItem = (item: MenuItem) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isOpen = openSubMenu === item.title;
    const isSelected = item.path === selectedItem;

    return (
      <React.Fragment key={item.title}>
        <StyledListItem
          onClick={() => handleClick(item.path, item.title)}
          className={isSelected ? "selected" : ""}
        >
          {item.icon && <StyledListItemIcon>{item.icon}</StyledListItemIcon>}
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
                    {subItem.faIcon && (
                      <StyledListItemIcon>
                        <Icon
                          icon={subItem.faIcon}
                          size="small"
                          onlyIcon
                          color={
                            isSubItemSelected
                              ? theme.palette.primary.main
                              : theme.palette.text.primary
                          }
                        />
                      </StyledListItemIcon>
                    )}
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
