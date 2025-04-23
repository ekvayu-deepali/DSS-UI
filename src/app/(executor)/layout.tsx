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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LayoutContainer>
      <Header title={title} onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <MainContent className={sidebarOpen ? '' : 'sidebar-icon-only'}>{children}</MainContent>
    </LayoutContainer>
  );
}
