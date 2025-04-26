"use client"

import React from "react";
import _ from "lodash";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { useChart } from "../context/chart-context";
import dynamic from "next/dynamic";
import { Props } from "react-apexcharts";

export const Chart = ({ options, ...rest }: Props) => {
  const { id } = useChart();
  const newOptions = _.update(options || {}, "chart.id", () => id);

  return <ReactApexChart {...rest} options={newOptions} />;
};
