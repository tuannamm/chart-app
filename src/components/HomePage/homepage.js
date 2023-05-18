import React, { useLayoutEffect } from "react";
import "./homepage.scss";

import { useLocation } from "react-router-dom";
import ReactApexCharts from "react-apexcharts";

const HomePage = () => {
  const { state } = useLocation();

  const chartData = (chartId) => {
    switch (chartId) {
      case 1:
        return {
          series: [
            {
              name: "Desktops",
              data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
            },
          ],
          options: {
            chart: {
              height: 350,
              type: "bar",
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: "straight",
            },
            title: {
              text: "Product Trends by Month",
              align: "left",
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
              ],
            },
          },
        };
      case 2:
        return {
          series: [
            {
              name: "STOCK ABC",
              data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
            },
          ],
          options: {
            chart: {
              type: "area",
              height: 350,
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "straight",
            },

            title: {
              text: "Fundamental Analysis of Stocks",
              align: "left",
            },
            subtitle: {
              text: "Price Movements",
              align: "left",
            },
            // labels: series.monthDataSeries1.dates,
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              opposite: true,
            },
            legend: {
              horizontalAlign: "left",
            },
          },
        };
      default:
        return true;
    }
  };

  return (
    <div className="homepage-container">
      <div className="feature-button">
        <div className="feature-button-left">
          <button className="btn">Annotate</button>
          <button className="btn">Properties</button>
          <button className="btn">Data</button>
        </div>
        <div className="feature-button-right">
          <button className="btn ">Import data</button>
          <button className="btn">Download</button>
        </div>
      </div>
      <div className="chart-container">
        <ReactApexCharts
          className="apex-chart"
          options={chartData(state.chartId).options}
          series={chartData(state.chartId).series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default HomePage;
