import React, { memo } from "react";
import ReactApexCharts from "react-apexcharts";
import typeChart from "../../utils/selectTypeChart";

const Chart = ({ data, options, chartId, properties }) => {
  const chartData = {
    series: data[0]?.series ? data[0]?.series : [],
    options: {
      chart: {
        id: chartId,
        height: 350,
        background: properties.chartBackgroundColor,
        foreColor: properties.chartFontColor,
        zoom: {
          enabled: properties.enableZoom,
        },
        animations: {
          enabled: properties.showAnimations,
        },
        toolbar: {
          show: properties.showGrid,
        },
      },
      stroke: {
        width: properties.strokeWidth || 4,
        curve: options.stroke.curve,
      },
      title: {
        text: data[0]?.title ? data[0]?.title : "TITLE",
        align: "center",
        style: {
          fontSize: properties.chartFontSize || 12,
          color: properties.chartFontColor,
        },
      },
      tooltip: {
        enabled: properties.showTooltip,
      },
      grid: {
        show: properties.showGrid,
        row: {
          colors: properties.showGridRow
            ? ["#f3f3f3", "transparent"]
            : undefined,
          opacity: properties.showGridRow ? 0.5 : undefined,
        },
      },
      legend: {
        show: properties.showLegend,
      },
      xaxis: {
        labels: {
          style: {
            fontSize: properties.chartFontSize,
            colors: properties.chartFontColor,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: properties.chartFontSize,
            colors: properties.chartFontColor,
          },
        },
      },

      dataLabels: {
        enabled: properties.showDataLabels,
      },
      theme: {
        palette: properties.colorPalette,
      },
      labels: data[0]?.labels ? data[0]?.labels : [],
      fill: {
        type: "solid",
      },
    },
  };

  return (
    <ReactApexCharts
      className="apex-chart"
      options={chartData.options}
      series={chartData.series}
      type={typeChart(chartId)}
      height={500}
    />
  );
};

export default memo(Chart);
