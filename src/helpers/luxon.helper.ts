import { DateTime, Settings } from "luxon";

import {
  DatePickerTimeEnum,
  IExtractTime,
} from "@/components/common/datePicker";

/**
 * Luxon Helper
 * General Methods required in the Luxon Library
 */
export class LuxonHelper {
  public static formats = {
    time: "t",
    date: "D",
    dateTime: "D t",
    dateMonth: "dd LLL",
  };

  public static intlFormats = {
    time: DateTime.TIME_SIMPLE,
    date: DateTime.DATE_SHORT,
    dateTime: DateTime.DATETIME_SHORT,
  };

  /**
   * Get Initial Date
   * @return {IExtractTime}
   */
  public static initialDate(): IExtractTime {
    return LuxonHelper.extractTime(DatePickerTimeEnum.HOUR_24);
  }

  /**
   * Get format for Date Format
   * @return {void}
   */
  public static configure(): void {
    Settings.defaultLocale = navigator.language;
    Settings.defaultZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  /**
   * Get Default format for displaying date time
   * @return {Intl.DateTimeFormatOptions}
   */
  public static getFormat(): Intl.DateTimeFormatOptions {
    return LuxonHelper.intlFormats.dateTime;
  }

  /**
   * Get ISO String in JS Date Format
   * @param {DateTime} date Luxon Date
   * @return {string} ISO String in JS Date Format
   */
  public static toISO(date: DateTime): string {
    return date.toJSDate().toISOString();
  }

  /**
   * Extract Time according to the provided
   * {DatePickerTimeEnum} and return in format
   * of {IExtractTime}
   *
   * @example
   * return {
   *  startDate: Moment Time,
   *  endDate: Moment Time,
   *  format: Moment Format,
   *  showSingle: boolean,
   * }
   * @param {DatePickerTimeEnum}selectedOption
   * @return {IExtractTime}
   */
  public static extractTime(selectedOption: DatePickerTimeEnum): IExtractTime {
    const now: DateTime = DateTime.now();
    const dayFormat = "h a";
    const monthFormat = "dd MMM";

    switch (selectedOption) {
      case DatePickerTimeEnum.HOUR_1:
        return {
          startDate: now.minus({ hour: 1 }),
          endDate: now,
          format: dayFormat,
        };
      case DatePickerTimeEnum.HOUR_6:
        return {
          startDate: now.minus({ hour: 6 }),
          endDate: now,
          format: dayFormat,
        };
      case DatePickerTimeEnum.HOUR_12:
        return {
          startDate: now.minus({ hour: 12 }),
          endDate: now,
          format: dayFormat,
        };
      case DatePickerTimeEnum.HOUR_24:
        return {
          startDate: now.minus({ day: 1 }),
          endDate: now,
          format: monthFormat,
        };
      case DatePickerTimeEnum.DAY_7:
        return {
          startDate: now.minus({ day: 7 }).startOf("day"),
          endDate: now.minus({ day: 1 }).endOf("day"),
          format: monthFormat,
        };
      case DatePickerTimeEnum.DAY_30:
        return {
          startDate: now.minus({ month: 1 }).startOf("day"),
          endDate: now.minus({ day: 1 }).endOf("day"),
          format: monthFormat,
        };
      case DatePickerTimeEnum.DAY_60:
        return {
          startDate: now.minus({ month: 2 }).startOf("day"),
          endDate: now.minus({ day: 1 }).endOf("day"),
          format: monthFormat,
        };
      case DatePickerTimeEnum.DAY_90:
        return {
          startDate: now.minus({ month: 3 }).startOf("day"),
          endDate: now.minus({ day: 1 }).endOf("day"),
          format: monthFormat,
        };
      case DatePickerTimeEnum.DAY_LAST:
      default:
        return {
          startDate: now.minus({ day: 1 }).startOf("day"),
          endDate: now.minus({ day: 1 }).endOf("day"),
          format: monthFormat,
          showSingle: true,
        };
    }
  }
}

export default LuxonHelper;
