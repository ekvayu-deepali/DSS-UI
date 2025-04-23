"use client";

import React, { useState, useEffect } from "react";
import { useMediaQuery, useTheme as useMuiTheme } from "@mui/material";

import { LayoutContainer, MainContent } from "./executorLayout.style";
import { Header } from "@/components/common/header/header";
import { Sidebar } from "@/components/common/sidebar/sidebar";

interface ExecutorLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function ExecutorLayout({
  children,
  title,
}: ExecutorLayoutProps) {
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Update sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <LayoutContainer>
      <Header title={title} onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <MainContent className={sidebarOpen ? '' : 'sidebar-icon-only'}>
        <div className="content-wrapper">
          {children}
        </div>
      </MainContent>
    </LayoutContainer>
  );
}
