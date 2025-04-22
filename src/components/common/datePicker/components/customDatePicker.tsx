import React, { ReactElement } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import { CustomDatePickerController } from "./customDatePicker.controller";
import {
  DatePickerWrapper,
  DateInner,
  CalWrapper,
} from "./customDatePicker.style";
import { IDatePickerChange } from "..";

export interface IDatepicker {
  dates: IDatePickerChange;
  dateChange: (dates: IDatePickerChange) => void;
}

/**
 * Component for custom date picker.
 * @param {IDatepicker} props
 * @return {ReactElement}
 */
export function CustomDatePicker(props: IDatepicker): ReactElement {
  const { getters, handlers } = CustomDatePickerController(props);
  const { startDate, endDate } = getters;
  const { handleChange } = handlers;

  return (
    <DatePickerWrapper>
      <DateInner>
        <CalWrapper>
          <DatePicker
            startDate={startDate}
            onChange={handleChange}
            selected={startDate}
            endDate={endDate}
            dropdownMode="select"
            inline
            monthsShown={2}
            selectsRange
            maxDate={new Date()}
            dateFormat={moment().creationData().locale.longDateFormat("L")}
          />
        </CalWrapper>
      </DateInner>
    </DatePickerWrapper>
  );
}

export default React.memo(CustomDatePicker);
