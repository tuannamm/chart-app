import React, { useState } from "react";
import "./homepage.scss";
import { useLocation } from "react-router-dom";
import ReactApexCharts from "react-apexcharts";

import DataModal from "./Modal/dataModal";

const HomePage = () => {
  const { state } = useLocation();
  const [showDataModal, setShowDataModal] = useState(false);
  const [data, setData] = useState({
    title: "",
    name: "",
    categories: [],
    dataLabel: [],
  });

  const chartData = (chartId) => {
    switch (chartId) {
      case 1:
        return {
          series: [
            {
              name: data.name ? data.name : "",
              data: [...data.dataLabel],
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
              text: data.title ? data.title : "TITLE",
              align: "center",
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
              },
            },
            xaxis: {
              categories: [...data.categories],
            },
          },
        };
      case 2:
        return {
          series: [
            {
              name: "STOCK ABC",
              data: [...data.dataLabel],
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
              text: data.title ? data.title : "TITLE",
              align: "center",
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

  const handleShowDataModal = () => {
    setShowDataModal(true);
  };

  return (
    <>
      <div className="homepage-container">
        <div className="feature-button">
          <div className="feature-button-left">
            <button className="btn">Annotate</button>
            <button className="btn">Properties</button>
            <button className="btn" onClick={() => handleShowDataModal()}>
              Data
            </button>
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
        <div>
          <DataModal
            showDataModal={showDataModal}
            setShowDataModal={setShowDataModal}
            data={data}
            setData={setData}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
