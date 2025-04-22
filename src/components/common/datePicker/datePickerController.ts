"use client";

import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";

import {
  ALL_PAGE_DATA,
  IPageTableData,
  ITableState,
  useAppSelector,
} from "@/redux";

import { LuxonHelper } from "@/helpers";

import { DatePickerTimeEnum } from "./enum";
import { IDatePickerChange, IDateTimeItem, IExtractTime } from "./interface";

interface IDatePickerControllerProps {
  onChange: (event: IDatePickerChange) => void;
}

interface IDatePickerControllerResponse
  extends Readonly<{
    getters: {
      showCustom: boolean;
      datePickerLabel: string;
      selectedDateTime: number;
      selectedDate: IDatePickerChange;
      dateArray: IDateTimeItem[];
      timeArray: IDateTimeItem[];
      isCustomApplied: boolean;
    };
    handlers: {
      handleCustomPicker: (arg?: boolean) => void;
      setSelectedDateTime: (arg: number) => void;
      handleCustomRange: (dates: IDatePickerChange) => void;
      onChangeLocal: (selectedOption: DatePickerTimeEnum) => void;
    };
    ref: {
      prevDate: RefObject<DatePickerTimeEnum>;
    };
  }> {}

/**
 * @param {IDatePickerControllerProps} props
 * @return {IDatePickerControllerResponse}
 */
export const useDatePickerControllerResponse = (
  props: IDatePickerControllerProps
): IDatePickerControllerResponse => {
  const { onChange } = props;
  const { extractTime } = LuxonHelper;

  // Redux states
  const allPageData = useAppSelector(ALL_PAGE_DATA);

  // Router
  const searchParams = useSearchParams();
  const pageName = searchParams.keys().next().value; // Get the first query param key

  const pageData = allPageData[pageName as keyof ITableState] as IPageTableData;

  // React states
  const [selectedDateTime, setSelectedDateTime] = useState<DatePickerTimeEnum>(
    DatePickerTimeEnum.HOUR_24
  );
  const [selectedDate, setSelectedDate] = useState<IDatePickerChange>(
    extractTime(selectedDateTime)
  );
  const [showCustom, setShowCustom] = useState<boolean>(false);
  const [isCustomApplied, setIsCustomApplied] = useState<boolean>(false);
  const prevDate = useRef(selectedDateTime);

  const initalTime: DatePickerTimeEnum = useMemo(
    () => DatePickerTimeEnum.HOUR_24,
    []
  );

  /**
   * Dates Listing Array
   * display all the available date.
   * selection options
   */
  const dateArray: IDateTimeItem[] = useMemo(
    () => [
      {
        key: DatePickerTimeEnum.DAY_LAST,
        label: `Last Day`,
      },
      {
        key: DatePickerTimeEnum.DAY_7,
        label: `Last 7 Days`,
      },
      {
        key: DatePickerTimeEnum.DAY_30,
        label: `Last 30 Days`,
      },
      {
        key: DatePickerTimeEnum.DAY_60,
        label: `Last 60 Days`,
      },
      {
        key: DatePickerTimeEnum.DAY_90,
        label: `Last 90 Days`,
      },
    ],
    []
  );

  /**
   * Time Listing Array
   * display all the available date.
   * selection options
   */
  const timeArray: IDateTimeItem[] = useMemo(
    () => [
      {
        key: DatePickerTimeEnum.HOUR_1,
        label: `Last Hour`,
      },
      {
        key: DatePickerTimeEnum.HOUR_6,
        label: `Last 6 Hours`,
      },
      {
        key: DatePickerTimeEnum.HOUR_12,
        label: `Last 12 Hours`,
      },
      {
        key: DatePickerTimeEnum.HOUR_24,
        label: `Last 24 Hours`,
      },
    ],
    []
  );

  /**
   * Generate format to show in Label
   * @param {IExtractTime}time
   * @return {string}
   */
  const generateLabelFormat = useCallback((time: IExtractTime): string => {
    const startTimeString: string = time.startDate.toFormat(time.format);
    const isToday = time.endDate.hasSame(DateTime.now(), "day");
    const isStartToday = time.startDate.hasSame(DateTime.now(), "day");
    const isCurrentHour = time.endDate.hasSame(DateTime.now(), "hour");
    const presentString = `${startTimeString} - present`;

    // If is Current hour or is a time greater than now
    if (isCurrentHour) {
      return presentString;
    }

    if (isToday && time.endDate > DateTime.now()) {
      if (isStartToday) return startTimeString;
      return presentString;
    }

    // If Both are displaying same String show only one
    if (time.showSingle) {
      return startTimeString;
    }

    const endTimeString: string = time.endDate.toFormat(time.format);
    return `${startTimeString} - ${endTimeString}`;
  }, []);

  const [datePickerLabel, setDatePickerLabel] = useState<string>(() => {
    const time: IExtractTime = extractTime(initalTime);
    return generateLabelFormat(time);
  });

  /**
   * Show Custom date in date picker
   * @param {boolean} action
   */
  const handleCustomPicker = (action = false): void => {
    setShowCustom(action);
  };

  /**
   * On change local, handle the Select
   * change event, update selected time and
   * update the date label
   *
   * The Date Label is also updated in accordance with the
   * selected time
   * @param  {DatePickerTimeEnum} selectedOption
   */
  const onChangeLocal = useCallback(
    (selectedOption: DatePickerTimeEnum) => {
      if (selectedOption === DatePickerTimeEnum.CUSTOM) {
        setShowCustom(true);
        return;
      }
      setShowCustom(false);
      setIsCustomApplied(false);
      prevDate.current = selectedOption;

      const time: IExtractTime = extractTime(selectedOption);
      const format: string = generateLabelFormat(time);
      // Dispatch the onChange event
      setDatePickerLabel(format);
      setSelectedDate(time);
      onChange(time);
    },
    [extractTime, generateLabelFormat, onChange]
  );

  /**
   * Custom date picker change handler
   * @param {IDatesOfDatePicker} dates
   */
  const handleCustomRange = useCallback(
    (newDate: IDatePickerChange) => {
      const { startDate, endDate } = newDate;
      const format = LuxonHelper.formats.dateMonth;
      const monthFormat: string = generateLabelFormat({
        startDate,
        endDate,
        format,
      });
      setIsCustomApplied(true);
      prevDate.current = selectedDateTime;
      setDatePickerLabel(monthFormat);
      setSelectedDate(newDate);
      onChange(newDate);
      setShowCustom(false);
    },
    [generateLabelFormat, onChange, selectedDateTime]
  );
  const extractEnumFromTime = useCallback(() => {
    const { to, from } = pageData.time;
    const format = LuxonHelper.formats.dateMonth;
    const startDate = DateTime.fromMillis(from);
    const endDate = DateTime.fromMillis(to);
    const monthFormat: string = generateLabelFormat({
      startDate,
      endDate,
      format,
    });
    setDatePickerLabel(monthFormat);

    const diff = endDate.diff(startDate, ["hours"]);
    const { hours } = diff;

    switch (Math.round(hours)) {
      case 1:
        return DatePickerTimeEnum.HOUR_1;
        break;
      case 6:
        return DatePickerTimeEnum.HOUR_6;
        break;

      case 12:
        return DatePickerTimeEnum.HOUR_12;
        break;
      case 24:
        return DatePickerTimeEnum.HOUR_24;

        break;

      case 168:
        return DatePickerTimeEnum.DAY_7;

        break;

      case 720:
        return DatePickerTimeEnum.DAY_30;
        break;

      case 1464:
        return DatePickerTimeEnum.DAY_60;

        break;
      case 2184:
        return DatePickerTimeEnum.DAY_90;
        break;

      default:
        return DatePickerTimeEnum.CUSTOM;
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateLabelFormat]);

  // Now we are applying only one page so thats why we added this checks
  useEffect(() => {
    if (pageName === "tickethistory") {
      setSelectedDateTime(extractEnumFromTime());
    }
  }, [extractEnumFromTime, pageName]);

  return {
    getters: {
      isCustomApplied,
      selectedDate,
      selectedDateTime,
      dateArray,
      timeArray,
      datePickerLabel,
      showCustom,
    },
    handlers: {
      onChangeLocal,
      setSelectedDateTime,
      handleCustomRange,
      handleCustomPicker,
    },
    ref: {
      prevDate,
    },
  };
};
