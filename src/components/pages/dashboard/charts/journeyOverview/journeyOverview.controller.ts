"use client";

import { useMemo } from "react";
import { Theme, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { ChartsCsvHeaderEnum, ThemeEnum } from "@/enum";

export function JourneryOverviewController() {
  const theme: Theme = useTheme();

  const title = "journeyOverview";

  const finalData = [
    { color: "#4CAF50", label: "Active Journeys", data: 44 },
    { color: "#FF9800", label: "Pending Journeys", data: 55 },
    { color: "#2196F3", label: "Completed Journeys", data: 33 },
  ];

  const chartOptions: ApexOptions = {
    chart: {
      background: theme.palette.background.paper,
      stacked: false,
      toolbar: {
        show: false,
        export: {
          csv: {
            headerCategory: ChartsCsvHeaderEnum.ACTIONS,
            headerValue: ChartsCsvHeaderEnum.COUNT,
          },
        },
      },
    },
    colors: finalData.map((item) => item.color),
    dataLabels: {
      enabled: true,
    },
    fill: {
      opacity: 1,
    },
    labels: finalData.map((item) => item.label),
    legend: {
      show: true,
      position: "bottom",
      height: 100,
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode:
        theme.palette.mode === ThemeEnum.DARK
          ? ThemeEnum.DARK
          : ThemeEnum.LIGHT,
    },
  };

  const chartSeries = finalData.map((item) => item.data);
  const enableButton = true;

  return {
    getters: {
      title,
      chartOptions,
      chartSeries,
      finalData,
      enableButton,
    },
  };
}
