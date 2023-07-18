import React from "react";
import ReactApexCharts from "react-apexcharts";

import typeChart from "../../utils/selectTypeChart";

const Chart = ({ data, options, chartId }) => {
  const chartData = {
    series: data[0]?.series ? data[0]?.series : [],
    options: {
      ...options,
      chart: {
        height: 350,
        zoom: {
          enabled: true,
        },
        animations: {
          enable: true,
        },
      },
      title: {
        text: data[0]?.title ? data[0]?.title : "TITLE",
        align: "center",
      },
      tooltip: {
        enabled: true,
        shared: true,
        followCursor: true,
        x: {
          show: true,
        },
        y: {
          show: true,
        },
      },
      dataLabels: {
        enabled: true,
      },

      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      theme: {
        palette: "palette4",
      },

      labels: data[0]?.labels ? data[0]?.labels : [],
      fill: {
        type: "solid",
        // opacity: [0.85, 0.25, 1],
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

export default Chart;
