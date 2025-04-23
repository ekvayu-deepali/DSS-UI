"use client";

import React from 'react';
import { List, Collapse, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { 
  ExpandLess, 
  ExpandMore, 
  Dashboard,
  Security,
  Description
} from '@mui/icons-material';
import { 
  faGlobe, 
  faFileLines, 
  faShareNodes
} from '@fortawesome/free-solid-svg-icons';

import { Icon } from '@/components/common/icon';
import {
  SidebarContainer,
  SidebarContent,
  StyledListItem,
  StyledListItemIcon,
  StyledListItemText,
  ExpandIconStyle,
  NestedList
} from './sidebar.style';

interface MenuItem {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  faIcon?: any; // FontAwesome icon
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/executor/dashboard',
    icon: <Dashboard />,
  },
  {
    title: 'Confidential',
    icon: <Security />,
    submenu: [
      {
        title: 'Geo Political',
        path: '/executor/confidential/geo-political',
        faIcon: faGlobe
      },
      {
        title: 'Reports',
        path: '/executor/confidential/reports',
        faIcon: faFileLines
      },
    ],
  },
  {
    title: 'Documents',
    icon: <Description />,
    submenu: [
      {
        title: 'All Documents',
        path: '/executor/documents/all',
        faIcon: faFileLines
      },
      {
        title: 'Shared',
        path: '/executor/documents/shared',
        faIcon: faShareNodes
      },
    ],
  },
];

export const Sidebar: React.FC<{ isOpen?: boolean }> = ({ isOpen = true }) => {
  const router = useRouter();
  const theme = useTheme();
  const [openSubMenu, setOpenSubMenu] = React.useState<string | null>(null);

  const handleClick = (path?: string, title?: string) => {
    if (path) {
      router.push(path);
    } else if (title) {
      setOpenSubMenu(openSubMenu === title ? null : title);
    }
  };

  const renderMenuItem = (item: MenuItem) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isOpen = openSubMenu === item.title;

    return (
      <React.Fragment key={item.title}>
        <StyledListItem onClick={() => handleClick(item.path, item.title)}>
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
              {item.submenu?.map((subItem) => (
                <StyledListItem
                  key={subItem.title}
                  onClick={() => handleClick(subItem.path)}
                >
                  {subItem.faIcon && (
                    <StyledListItemIcon>
                      <Icon 
                        icon={subItem.faIcon} 
                        size="small" 
                        onlyIcon 
                        color={theme.palette.text.primary}
                      />
                    </StyledListItemIcon>
                  )}
                  <StyledListItemText primary={subItem.title} />
                </StyledListItem>
              ))}
            </NestedList>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <SidebarContainer className={isOpen ? '' : 'icon-only'}>
      <SidebarContent>
        <List component="nav">
          {menuItems.map(renderMenuItem)}
        </List>
      </SidebarContent>
    </SidebarContainer>
  );
};
