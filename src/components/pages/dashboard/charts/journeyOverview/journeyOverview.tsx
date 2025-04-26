"use client";

import React, { JSX } from "react";
import { CardContent } from "@mui/material";

import { JourneryOverviewController } from "./journeyOverview.controller";
import ChartProvider from "@/components/common/charts/context/chart-context";
import { Chart, ChartContainer, NoDataFound } from "@/components/common";
import { StringHelper } from "@/helpers";

/**
 * Journey Overview Chart
 * @param {IJourneyOverview} props
 * @return {JSX.Element}
 */
export function JourneyOverview(): JSX.Element {
  const { getters } = JourneryOverviewController();
  const { chartOptions, chartSeries, title, enableButton } = getters;

  return (
    <ChartProvider id={StringHelper.replaceSpaceToDash(title)}>
      <ChartContainer
        title={title}
        description="This pie chart displays the count of all the actions performed by the."
        height={chartSeries.length ? 590 : 530}
        disableAction={enableButton}
      >
        <CardContent>
          {chartSeries.length ? (
            <Chart
              height={435}
              options={chartOptions}
              series={chartSeries}
              type="donut"
            />
          ) : (
            <NoDataFound
              title="No data found in selected time period"
              height="200px"
            />
          )}
        </CardContent>
      </ChartContainer>
    </ChartProvider>
  );
}

export default React.memo(JourneyOverview);
