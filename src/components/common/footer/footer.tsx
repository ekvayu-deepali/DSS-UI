"use client";

import React from "react";
import { FooterContainer, FooterContent } from "./footer.style";

interface FooterProps {
  // Add any props if needed in the future
}

export const Footer: React.FC<FooterProps> = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        &copy; {currentYear} Ekvayu Tech Private Limited, All rights reserved.
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
