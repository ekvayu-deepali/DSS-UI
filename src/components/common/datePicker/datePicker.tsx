"use client";

import React, { ReactElement } from "react";
import {
  Box,
  ClickAwayListener,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { DatePickerTimeEnum } from "./enum";
import CustomDatePicker from "./components";
import { FormControl } from "./datePicker.style";
import { useDatePickerControllerResponse } from "./datePickerController";
import { IDateTimeItem, IDatePickerChange } from "./interface";

interface IDatePickerProps {
  fullWidth?: boolean;
  onChange: (event: IDatePickerChange) => void;
}

/**
 * Date Picker Component
 * Dropdown Selector for picking Date
 * Time Range for User
 * @param {IDatePickerProps} props
 * @return {ReactElement}
 */
export function DatePicker(props: IDatePickerProps): ReactElement {
  const { fullWidth } = props;
  const { getters, handlers, ref } = useDatePickerControllerResponse(props);
  const {
    isCustomApplied,
    selectedDate,
    dateArray,
    datePickerLabel,
    selectedDateTime,
    timeArray,
    showCustom,
  } = getters;
  const {
    onChangeLocal,
    setSelectedDateTime,
    handleCustomRange,
    handleCustomPicker,
  } = handlers;
  const { prevDate } = ref;

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel id="date-picker-label">{datePickerLabel}</InputLabel>
      <Select<number>
        labelId="date-picker-label"
        id="date-picker-select"
        label={datePickerLabel}
        value={selectedDateTime}
        onChange={(event: SelectChangeEvent<number>) => {
          const intValue: number = parseInt(event.target.value as string, 10);
          setSelectedDateTime(intValue);
          onChangeLocal(intValue);
        }}
      >
        {timeArray.map((time: IDateTimeItem) => (
          <MenuItem key={time.key} value={time.key}>
            {time.label}
          </MenuItem>
        ))}
        <Divider />
        {dateArray.map((date: IDateTimeItem) => (
          <MenuItem key={date.key} value={date.key}>
            {date.label}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          key="custom-date-picker"
          value={DatePickerTimeEnum.CUSTOM}
          onClick={() => handleCustomPicker(true)}
        >
          Custom Components
        </MenuItem>
      </Select>
      {showCustom && (
        <ClickAwayListener
          onClickAway={() => {
            if (!isCustomApplied) {
              setSelectedDateTime(prevDate.current);
            }
            handleCustomPicker();
          }}
        >
          <Box>
            <CustomDatePicker
              dates={selectedDate}
              dateChange={handleCustomRange}
            />
          </Box>
        </ClickAwayListener>
      )}
    </FormControl>
  );
}

export default React.memo(DatePicker);
