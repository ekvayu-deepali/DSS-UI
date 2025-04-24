"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  InputLabel,
  Select,
  SelectChangeEvent,
  FormHelperText,
  Box,
  MenuItem,
} from "@mui/material";

import { THIS_FILED_IS_REQUIRED } from "@/constants";
import { ChipComponent } from "@/components/common/chipComponent";
import { StyledFormControl } from "../classificationDropdown/classification-dropdown.style";
import {
  ITopicDropdownProps,
  ITopicDropdownRef,
} from "./topicDropdown.interface";

const TOPICS = [
  { value: "security", label: "Security" },
  { value: "technology", label: "Technology" },
  { value: "politics", label: "Politics" },
  { value: "economy", label: "Economy" },
  { value: "environment", label: "Environment" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
  { value: "social", label: "Social" },
];

export const TopicDropdown = forwardRef<ITopicDropdownRef, ITopicDropdownProps>(
  ({ value = [], onChange, fullWidth = false, required = false }, ref) => {
    const [error, setError] = useState<string>("");

    const handleChange = (event: SelectChangeEvent<string[]>) => {
      const newValue = event.target.value;
      onChange(Array.isArray(newValue) ? newValue : []);
      setError("");
    };

    const validateValue = (): boolean => {
      if (required && (!value || value.length === 0)) {
        setError(THIS_FILED_IS_REQUIRED);
        return false;
      }
      setError("");
      return true;
    };

    useImperativeHandle(ref, () => ({
      validateValue,
    }));

    return (
      <StyledFormControl fullWidth={fullWidth} error={!!error}>
        <InputLabel id="topic-select-label">
          {required ? "Topics *" : "Topics"}
        </InputLabel>
        <Select
          labelId="topic-select-label"
          id="topic-select"
          multiple
          value={value}
          label={required ? "Topics *" : "Topics"}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((topicValue) => {
                const topic = TOPICS.find((t) => t.value === topicValue);
                return (
                  <ChipComponent
                    key={topicValue}
                    value={topic?.value || ""}
                    label={topic?.label || ""}
                    size="small"
                  />
                );
              })}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 300 },
            },
          }}
        >
          {TOPICS.map((topic) => (
            <MenuItem key={topic.value} value={topic.value}>
              <ChipComponent
                value={topic.value}
                label={topic.label}
                size="small"
              />
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </StyledFormControl>
    );
  }
);

export default TopicDropdown;
