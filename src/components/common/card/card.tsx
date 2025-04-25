import React from "react";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../icon";

interface CardComponentProps {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const CardComponent: React.FC<CardComponentProps> = ({
  title,
  children,
  onClose,
}) => {
  return (
    <Card>
      {title && (
        <CardHeader
          title={title}
          action={
            onClose && (
              <IconButton onClick={onClose} size="small">
                <Icon icon={faTimes} size="small" onlyIcon />
              </IconButton>
            )
          }
        />
      )}
      <CardContent sx={{ pt: title ? 2 : 3, pb: 3 }}>{children}</CardContent>
    </Card>
  );
};

export default CardComponent;
