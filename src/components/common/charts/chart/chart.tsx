"use client"

import React from "react";
import _ from "lodash";
import dynamic from "next/dynamic";
import { useChart } from "../context/chart-context";
import { Props } from "react-apexcharts";

// Import ReactApexChart dynamically with ssr: false to prevent server-side rendering
const ReactApexChart = dynamic(
  () => import('react-apexcharts'),
  { ssr: false }
);

export const Chart = ({ options, ...rest }: Props) => {
  const { id } = useChart();
  const newOptions = _.update(options || {}, "chart.id", () => id);

  return <ReactApexChart {...rest} options={newOptions} />;
};
