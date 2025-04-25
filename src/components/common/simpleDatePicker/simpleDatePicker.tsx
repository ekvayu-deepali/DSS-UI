import React from "react";
import { TextField } from "@mui/material";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";

interface SimpleDatePickerProps {
  value: DateTime | null;
  onChange: (date: DateTime | null) => void;
  label?: string;
  fullWidth?: boolean;
}

export const SimpleDatePicker: React.FC<SimpleDatePickerProps> = ({
  value,
  onChange,
  label = "Date",
  fullWidth = false,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        format="dd/MM/yyyy"
        slotProps={{
          textField: {
            fullWidth,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default SimpleDatePicker;
