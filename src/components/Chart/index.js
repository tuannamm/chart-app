import React from "react";
import ReactApexCharts from "react-apexcharts";
import typeChart from "../../utils/selectTypeChart";

const Chart = ({ data, options, chartId, properties }) => {
  const chartData = {
    series: [
      {
        name: "Nam",
        type: "column",
        data: ["10", "23", "33"],
      },
      {
        name: "Nôm ",
        type: "area",
        data: ["34", "65", "23"],
      },
    ],
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
      labels: ["Tháng 1", "Tháng 2", "Tháng 3"],
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

export default Chart;
