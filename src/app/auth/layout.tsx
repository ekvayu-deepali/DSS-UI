"use client";

import { CardContent } from "@mui/material";

import { ThemeToggle } from "@/components/common/ThemeToggle";

import { AuthCard, AuthContainer, AuthTitle } from "./layout.style";

const AuthForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContainer>
      <ThemeToggle />
      <AuthCard>
        <AuthTitle variant="h5">Log in to your account</AuthTitle>
        <CardContent>{children}</CardContent>
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthForm;
