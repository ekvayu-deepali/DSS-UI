"use client";

import React, { ReactElement } from "react";

import { ChartBox } from "./top5Journey.style";
import { Top5JournerysController } from "./top5Journey.controller";
import { ChartContainer, Chart, NoDataFound } from "@/components/common";
import ChartProvider from "@/components/common/charts/context/chart-context";
import { NoDataEnum } from "@/enum";
import { StringHelper } from "@/helpers";

/**
 * Top 5 Journey Chart
 * @return {ReactElement}
 */
export function Top5Journerys(): ReactElement {
  const { getters } = Top5JournerysController();
  const { title, chartSeries, chartOptions, enableButton } = getters;

  return (
    <ChartProvider id={StringHelper.replaceSpaceToDash(title)}>
      <ChartContainer
        title={title}
        description="This chart shows the count of top 5 most visited parts of the journey."
        disableAction={enableButton}
      >
        <ChartBox>
          {chartSeries[0]?.name !== NoDataEnum.NO_DATA ? (
            <Chart
              height={300}
              options={chartOptions}
              series={chartSeries}
              type="line"
            />
          ) : (
            <NoDataFound title="No data found in selected time period" />
          )}
        </ChartBox>
      </ChartContainer>
    </ChartProvider>
  );
}

export default React.memo(Top5Journerys);
