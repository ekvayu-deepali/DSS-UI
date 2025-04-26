"use client";

import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
} from 'react';


import ApexCharts from 'apexcharts';

import { IChartContext, IChartProvider, IApexChartExport } from '../interfaces';

export const ChartContext = createContext<IChartContext>({} as IChartContext);

/**
 * Chart Provider
 * @param {IChartProvider}param
 * @return {ReactElement}
 */
export const ChartProvider: FC<IChartProvider> = ({ id, children }) => {
  const downloadSVG = useCallback(() => {
    const { ctx } = ApexCharts.getChartByID(id)
      ?.exports as unknown as IApexChartExport;

    ctx.exports.exportToSVG();
  }, [id]);

  const downloadPNG = useCallback(() => {
    const { ctx } = ApexCharts.getChartByID(id)
      ?.exports as unknown as IApexChartExport;

    ctx.exports.exportToPng();
  }, [id]);

  const downloadCSV = useCallback(() => {
    const { ctx } = ApexCharts.getChartByID(id)
      ?.exports as unknown as IApexChartExport;

    ctx.exportToCSV();
  }, [id]);

  const value = useMemo(
    () => ({
      id,
      export: {
        svg: downloadSVG,
        png: downloadPNG,
        csv: downloadCSV,
      },
    }),
    [downloadCSV, downloadPNG, downloadSVG, id],
  );

  return (
    <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
  );
};

export default ChartProvider;

export const useChart = () => useContext(ChartContext);
