"use client";

import React, { useState } from "react";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Use a callback ref to avoid recreating this function on every render
  const toggleSidebar = React.useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

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
