"use client";

import { useMemo } from "react";
import { Theme, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { ChartsCsvHeaderEnum, ThemeEnum } from "@/enum";

interface ITotalMessageControllerResponses {
  getters: {
    chartOptions: ApexOptions;
    title: string;
    series: number[];
    enableButton: boolean;
  };
}

interface IBarData {
  xAxisLabel: string;
  count: number;
  time: Date;
  day: number;
  month: number;
  year: number;
}

export function TotalMessageController(): ITotalMessageControllerResponses {
  const theme: Theme = useTheme();

  const totalMessagesGraph: IBarData[] = [
    {
      xAxisLabel: "Jan",
      count: 150,
      time: new Date("2024-01-01T00:00:00Z"),
      day: 1,
      month: 1,
      year: 2024,
    },
    {
      xAxisLabel: "Feb",
      count: 280,
      time: new Date("2024-02-01T00:00:00Z"),
      day: 1,
      month: 2,
      year: 2024,
    },
    {
      xAxisLabel: "Mar",
      count: 200,
      time: new Date("2024-03-01T00:00:00Z"),
      day: 1,
      month: 3,
      year: 2024,
    },
    {
      xAxisLabel: "Apr",
      count: 350,
      time: new Date("2024-04-01T00:00:00Z"),
      day: 1,
      month: 4,
      year: 2024,
    },
    {
      xAxisLabel: "May",
      count: 420,
      time: new Date("2024-05-01T00:00:00Z"),
      day: 1,
      month: 5,
      year: 2024,
    },
  ];

  const chartData = totalMessagesGraph?.length;
  const enableButton = !!chartData;

  const series = useMemo(
    () =>
      totalMessagesGraph?.map((graphData: IBarData) => graphData.count) || [],
    [totalMessagesGraph]
  );

  const columns = useMemo(
    () =>
      totalMessagesGraph?.map((graphData: IBarData) => graphData.xAxisLabel) ||
      [],
    [totalMessagesGraph]
  );

  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        background: theme.palette.background.paper,
        stacked: true,
        toolbar: {
          show: false,
          export: {
            csv: {
              headerCategory: ChartsCsvHeaderEnum.TIME_PERIOD,
            },
          },
        },
      },
      colors: [
        theme.palette.info.light,
        theme.palette.info.main,
        theme.palette.info.dark,
      ],
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: true,
          left: 2,
          top: 2,
          opacity: 0.5,
        },
      },
      fill: {
        opacity: 1,
      },
      grid: {
        borderColor: theme.palette.divider,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      states: {
        active: {
          filter: {
            type: "none",
          },
        },
        hover: {
          filter: {
            type: "none",
          },
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        colors: ["transparent"],
        show: true,
        width: 2,
      },
      theme: {
        mode:
          theme.palette.mode === ThemeEnum.DARK
            ? ThemeEnum.DARK
            : ThemeEnum.LIGHT,
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: columns,
        labels: {
          style: {
            colors: theme.palette.text.primary,
          },
        },
      },
      yaxis: {
        labels: {
          offsetX: -12,
          style: {
            colors: theme.palette.text.primary,
          },
        },
      },
    }),
    [columns, theme]
  );

  const title = "Total Messages";

  return {
    getters: { title, chartOptions, series, enableButton },
  };
}
