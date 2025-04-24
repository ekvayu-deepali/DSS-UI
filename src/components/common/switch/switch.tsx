import React from "react";
import { Switch } from "@mui/material";

export const SwitchComponent = ({ status }: { status: boolean }) => {
  return <Switch checked={status} />;
};
export default SwitchComponent;
