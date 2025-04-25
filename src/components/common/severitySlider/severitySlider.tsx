"use client";

import React from "react";
import { Box, Slider, Typography, styled } from "@mui/material";

interface SeveritySliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  description?: string;
}

const SliderContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  height: 8,
  "& .MuiSlider-rail": {
    background: `linear-gradient(90deg, ${theme.palette.success.light} 0%, ${theme.palette.warning.light} 50%, ${theme.palette.error.light} 100%)`,
    opacity: 1,
  },
  "& .MuiSlider-track": {
    border: "none",
    background: "transparent",
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: `2px solid ${theme.palette.primary.main}`,
  },
  "& .MuiSlider-mark": {
    backgroundColor: theme.palette.background.paper,
    height: 8,
    width: 1,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: theme.palette.background.paper,
    },
  },
  "& .MuiSlider-markLabel": {
    fontSize: "0.75rem",
    marginTop: 5,
    color: theme.palette.text.secondary,
  },
}));

const SliderLabelContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1),
}));

const SliderValueContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: theme.spacing(1),
}));

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 10,
    label: "10",
  },
];

export const SeveritySlider: React.FC<SeveritySliderProps> = ({
  value,
  onChange,
  label,
  description,
}) => {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    onChange(newValue as number);
  };

  return (
    <SliderContainer>
      <SliderLabelContainer>
        <Typography variant="subtitle2">{label}</Typography>
        <Typography variant="body2">
          Value: {value}
        </Typography>
      </SliderLabelContainer>
      {description && (
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      <StyledSlider
        value={value}
        onChange={handleChange}
        step={1}
        min={0}
        max={10}
        marks={marks}
        valueLabelDisplay="auto"
      />
      <SliderValueContainer>
        <Typography variant="caption" color="textSecondary">
          Low
        </Typography>
        <Typography variant="caption" color="textSecondary">
          High
        </Typography>
      </SliderValueContainer>
    </SliderContainer>
  );
};

export default SeveritySlider;
