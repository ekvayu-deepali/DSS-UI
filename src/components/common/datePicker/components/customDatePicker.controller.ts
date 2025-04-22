"use client";

// This is old date picker .we are using this untill when we implement new
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import moment from "moment";

export interface ITextInputFieldRef {
  validateValue: () => boolean;
  reset: () => void;
}

export interface IDatePickerChange {
  startDate: DateTime;
  endDate: DateTime;
}

export interface ICustomDatepickerController {
  getters: {
    startDate: Date;
    endDate: Date;
    date: string;
  };
  handlers: {
    handleChange: (handleDates: any) => void;
    handleTimePeriodChange: (type: number) => void;
  };
  ref: {
    dateRef: RefObject<ITextInputFieldRef>;
  };
}

export interface IDatepicker {
  dates: IDatePickerChange;
  dateChange: (dates: IDatePickerChange) => void;
}

/**
 * datePicker controller for date picker logical code.
 * @param {IDatesOfDatePicker} dateChange
 * @param {IDatesOfDatePicker} dates
 * @return {ICustomDatepickerController}
 */
export function CustomDatePickerController({
  dateChange,
  dates,
}: IDatepicker): ICustomDatepickerController {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [date, setDate] = useState<string>("");
  const dateRef = useRef<any>(null);

  /**
   * Handle change function for handling dates
   * @param {Date} handleDates for handling change on datepicker
   */
  const handleChange = useCallback(
    (handleDates: any): void => {
      const [start, end] = handleDates;
      setDate(
        `${moment(start).format("DD/MM/YYYY")} - ${moment(end).format(
          "DD/MM/YYYY"
        )}`
      );
      setStartDate(start);
      setEndDate(end);

      if (start && end) {
        end.setHours(23, 59, 59, 0);
        start.setHours(0, 0, 0, 0);
        dateChange({
          startDate: DateTime.fromJSDate(start),
          endDate: DateTime.fromJSDate(end),
        });
      }
    },
    [dateChange]
  );

  useEffect(() => {
    setDate(
      `${moment(dates.startDate).format("DD/MM/YYYY")} - ${moment(
        dates.endDate ? dates.endDate : ""
      ).format("DD/MM/YYYY")}`
    );
    setStartDate(dates.startDate.toJSDate());
    setEndDate(dates.endDate.toJSDate());
  }, [dates.endDate, dates.startDate]);

  /**
   * handleButtonsChange is a function for handling click of past buttons
   * @param {number} type ref for outside click.
   */
  const handleTimePeriodChange = useCallback(
    (type: number): void => {
      const eDate = new Date();
      const sDate = new Date();

      if (type === 1) {
        eDate.setDate(eDate.getDate() - 1);
        sDate.setDate(sDate.getDate() - 1 * 7);
        sDate.setHours(0, 0, 0, 0);
        eDate.setHours(23, 59, 59, 0);
      } else if (type === 2) {
        eDate.setDate(eDate.getDate() - 1);
        sDate.setMonth(sDate.getMonth() - 1);
        sDate.setHours(0, 0, 0, 0);
        eDate.setHours(23, 59, 59, 0);
      } else if (type === 3) {
        sDate.setDate(sDate.getDate() - 1);
      }
      const start = sDate;
      const end = eDate;
      setStartDate(sDate);
      setEndDate(eDate);
      setDate(
        `${moment(sDate).format("DD/MM/YYYY")} - ${moment(eDate).format(
          "DD/MM/YYYY"
        )}`
      );
      dateChange({
        startDate: DateTime.fromJSDate(start),
        endDate: DateTime.fromJSDate(end),
      });
    },
    [dateChange]
  );

  return {
    getters: {
      startDate,
      endDate,
      date,
    },
    handlers: {
      handleChange,
      handleTimePeriodChange,
    },
    ref: {
      dateRef,
    },
  };
}
