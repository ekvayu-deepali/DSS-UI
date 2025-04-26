// import { useEffect, useMemo, useState } from "react";
// import { ApexOptions } from "apexcharts";
// import { Theme, useTheme } from "@mui/material";

// import { TOP_FIVE_JOURNEY_DATA, useAppSelector } from "@/datastore";
// import {
//   ICustomLabelReturn,
//   IDynamicKey,
//   TranslationFunctionType,
// } from "@/src/interfaces";
// import { ChartsCsvHeaderEnum, NoDataEnum } from "@/src/enum";
// import { ThemeEnum } from "@/src/theme";

// import {
//   IJourneyData,
//   ISerise,
//   ITop5GraphDisplayData,
// } from "../../../interfaces";

// interface ITop5JournerysControllerResponse {
//   getters: {
//     title: string;
//     theme: Theme;
//     chartSeries: ITop5GraphDisplayData["serise"];
//     chartOptions: ApexOptions;
//     enableButton: boolean;
//   };
// }

// /**
//  * Top 5 Journey Chart controller
//  * @return {ITop5JournerysControllerResponse}
//  */
// export function Top5JournerysController(): ITop5JournerysControllerResponse {
//   const journeyChartColor = [
//     "#4CAF50",
//     "#FF9800",
//     "#0C7CD5",
//     "#FFCC33",
//     "#64b6f7",
//   ];

//   const staticJourneyData: IDynamicKey<IJourneyData[]> = {
//     "Journey 1": [
//       {
//         xAxisLabel: "Jan",
//         count: 50,
//         time: "",
//         info_intent: "",
//       },
//       {
//         xAxisLabel: "Feb",
//         count: 75,
//         time: "",
//         info_intent: "",
//       },
//       {
//         xAxisLabel: "Mar",
//         count: 60,
//         time: "",
//         info_intent: "",
//       },
//     ],
//     "Journey 2": [
//       {
//         xAxisLabel: "Jan",
//         count: 30,
//         time: "",
//         info_intent: "",
//       },
//       {
//         xAxisLabel: "Feb",
//         count: 45,
//         time: "",
//         info_intent: "",
//       },
//       {
//         xAxisLabel: "Mar",
//         count: 80,
//         time: "",
//         info_intent: "",
//       },
//     ],
//     "Journey 3": [
//       {
//         xAxisLabel: "Jan",
//         count: 65,
//         time: "",
//         info_intent: "",
//       },
//       {
//         xAxisLabel: "Feb",
//         count: 35,
//         time: "",
//         info_intent: "",
//       },
//       {
//         xAxisLabel: "Mar",
//         count: 55,
//         time: "",
//         info_intent: "",
//       },
//     ],
//   };
//   const theme = useTheme();
//   // const journeyData: IDynamicKey<IJourneyData[]> = useAppSelector(
//   //   TOP_FIVE_JOURNEY_DATA
//   // );

//   const journeyData: IDynamicKey<IJourneyData[]> = staticJourneyData;

//   const finalData: ITop5GraphDisplayData = useMemo(() => {
//     const keys: string[] = Object.keys(journeyData);
//     const values: IJourneyData[][] = Object.values(journeyData);
//     let labels: string[] | undefined;

//     const serise = keys.map((key: string, index: number) => ({
//       name: key,
//       color: journeyChartColor[index],
//       data: values[index].map((journey) => journey.count),
//     }));

//     for (let index = 0; index < values.length; index += 1) {
//       const element = values[index];
//       labels = element.map(
//         (journeyItem: IJourneyData) => journeyItem.xAxisLabel
//       );
//     }

//     return { serise, labels };
//   }, [journeyData]);

//   const [selectedSeries, setSelectedSeries] = useState<string[]>([]);

//   // useEffect(() => {
//   //   setSelectedSeries(
//   //     finalData.serise.map((seriesData: ISerise) => seriesData.name)
//   //   );
//   // }, [finalData]);

//   const chartSeries = finalData.serise.filter((seriesData: ISerise) =>
//     selectedSeries.includes(seriesData.name)
//   );
//   const chartData = chartSeries[0]?.name === NoDataEnum.NO_DATA;
//   const enableButton = !chartData;

//   const title = "Top 5 Journeys";

//   const chartOptions: ApexOptions = {
//     chart: {
//       background: theme.palette.background.paper,
//       stacked: false,
//       toolbar: {
//         show: false,
//         export: {
//           csv: {
//             headerCategory: ChartsCsvHeaderEnum.TIME_PERIOD,
//           },
//         },
//       },
//       zoom: {
//         enabled: false,
//       },
//       dropShadow: {
//         enabled: true,
//         color: "#000",
//         top: 18,
//         left: 7,
//         blur: 10,
//         opacity: 0.2,
//       },
//     },
//     colors: finalData.serise.map((item) => item.color),
//     dataLabels: {
//       enabled: true,
//       offsetY: -5,
//       offsetX: 5,
//     },
//     fill: {
//       opacity: 1,
//     },
//     grid: {
//       borderColor: theme.palette.divider,
//       xaxis: {
//         lines: {
//           show: true,
//         },
//       },
//       yaxis: {
//         lines: {
//           show: true,
//         },
//       },
//     },
//     legend: {
//       show: true,
//       position: "top",
//       horizontalAlign: "left",
//     },
//     markers: {
//       hover: {
//         size: undefined,
//         sizeOffset: 2,
//       },
//       radius: 2,
//       shape: "circle",
//       size: 4,
//       strokeWidth: 0,
//     },
//     stroke: {
//       curve: "smooth",
//       lineCap: "butt",
//       width: 3,
//     },
//     theme: {
//       mode:
//         theme.palette.mode === ThemeEnum.DARK
//           ? ThemeEnum.DARK
//           : ThemeEnum.LIGHT,
//     },
//     xaxis: {
//       tickAmount: 7,
//       tickPlacement: "between",
//       axisBorder: {
//         color: theme.palette.divider,
//         show: true,
//       },
//       axisTicks: {
//         color: theme.palette.divider,
//         show: true,
//       },
//       categories: finalData.labels || [],
//       labels: {
//         style: {
//           colors: theme.palette.text.primary,
//         },
//       },
//     },
//     yaxis: {
//       axisTicks: {
//         color: theme.palette.divider,
//         show: true,
//       },
//       axisBorder: {
//         color: theme.palette.divider,
//         show: true,
//       },
//       labels: {
//         style: {
//           colors: theme.palette.text.primary,
//         },
//       },
//     },
//   };

//   return {
//     getters: {
//       title,
//       theme,
//       chartSeries,
//       chartOptions,
//       enableButton,
//     },
//   };
// }

"use client";

import { NoDataEnum, ChartsCsvHeaderEnum, ThemeEnum } from "@/enum";
import { IDynamicKey } from "@/interfaces";
import { Theme, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useMemo, useState, useEffect } from "react";



interface IJourneyData {
  xAxisLabel: string;
  count: number;
  time: string;
  info_intent: string;
}

const staticJourneyData: IDynamicKey<IJourneyData[]> = {
  "Journey 1": [
    {
      xAxisLabel: "Jan",
      count: 50,
      time: "",
      info_intent: "",
    },
    {
      xAxisLabel: "Feb",
      count: 75,
      time: "",
      info_intent: "",
    },
    {
      xAxisLabel: "Mar",
      count: 60,
      time: "",
      info_intent: "",
    },
  ],
  "Journey 2": [
    {
      xAxisLabel: "Jan",
      count: 30,
      time: "",
      info_intent: "",
    },
    {
      xAxisLabel: "Feb",
      count: 45,
      time: "",
      info_intent: "",
    },
    {
      xAxisLabel: "Mar",
      count: 80,
      time: "",
      info_intent: "",
    },
  ],
  "Journey 3": [
    {
      xAxisLabel: "Jan",
      count: 65,
      time: "",
      info_intent: "",
    },
    {
      xAxisLabel: "Feb",
      count: 35,
      time: "",
      info_intent: "",
    },
    {
      xAxisLabel: "Mar",
      count: 55,
      time: "",
      info_intent: "",
    },
  ],
};
interface ISerise {
  name: string;
  color: string;
  data: number[];
}

interface ITop5GraphDisplayData {
  serise: Array<ISerise>;
  labels?: string[];
}

interface ITop5JournerysControllerResponse {
  getters: {
    title: string;
    theme: Theme;
    chartSeries: ITop5GraphDisplayData["serise"];
    chartOptions: ApexOptions;
    enableButton: boolean;
  };
}
export function Top5JournerysController(): ITop5JournerysControllerResponse {
  const journeyChartColor = [
    "#4CAF50",
    "#FF9800",
    "#0C7CD5",
    "#FFCC33",
    "#64b6f7",
  ];
  const theme = useTheme();
  const journeyData = staticJourneyData;

  const finalData: ITop5GraphDisplayData = useMemo(() => {
    const keys: string[] = Object.keys(journeyData);
    const values: IJourneyData[][] = Object.values(journeyData);
    let labels: string[] | undefined;

    const serise = keys.map((key: string, index: number) => ({
      name: key,
      color: journeyChartColor[index],
      data: values[index].map((journey) => journey.count),
    }));

    for (let index = 0; index < values.length; index += 1) {
      const element = values[index];
      labels = element.map(
        (journeyItem: IJourneyData) => journeyItem.xAxisLabel
      );
    }

    return { serise, labels };
  }, [journeyData]);

  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);

  useEffect(() => {
    setSelectedSeries(
      finalData.serise.map((seriesData: { name: string }) => seriesData.name)    );
  }, [finalData]);

  const chartSeries = finalData.serise.filter((seriesData: ISerise) =>
    selectedSeries.includes(seriesData.name)
  );
  const chartData = chartSeries[0]?.name === NoDataEnum.NO_DATA;
  const enableButton = !chartData;

  const title = "Top 5 Journeys";

  const chartOptions: ApexOptions = {
    chart: {
      background: theme.palette.background.paper,
      stacked: false,
      toolbar: {
        show: false,
        export: {
          csv: {
            headerCategory: ChartsCsvHeaderEnum.TIME_PERIOD,
          },
        },
      },
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    colors: finalData.serise.map((item) => item.color),
    dataLabels: {
      enabled: true,
      offsetY: -5,
      offsetX: 5,
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
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    markers: {
      hover: {
        size: undefined,
        sizeOffset: 2,
      },
      // radius: 2,
      shape: "circle",
      size: 4,
      strokeWidth: 0,
    },
    stroke: {
      curve: "smooth",
      lineCap: "butt",
      width: 3,
    },
    theme: {
      mode:
        theme.palette.mode === ThemeEnum.DARK
          ? ThemeEnum.DARK
          : ThemeEnum.LIGHT,
    },
    xaxis: {
      tickAmount: 7,
      tickPlacement: "between",
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: finalData.labels || [],
      labels: {
        style: {
          colors: theme.palette.text.primary,
        },
      },
    },
    yaxis: {
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      labels: {
        style: {
          colors: theme.palette.text.primary,
        },
      },
    },
  };

  return {
    getters: {
      title,
      theme,
      chartSeries,
      chartOptions,
      enableButton,
    },
  };
}
