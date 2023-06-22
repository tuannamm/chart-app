import React, { createRef, useState } from "react";
import "./homepage.scss";

import { useLocation, useNavigate } from "react-router-dom";
import ReactApexCharts from "react-apexcharts";
import { useScreenshot, createFileName } from "use-react-screenshot";

import DataModal from "./Modal/dataModal";

const HomePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ref = createRef(null);

  const [showDataModal, setShowDataModal] = useState(false);
  const [isCanvasVisible, setCanvasVisible] = useState(false);
  const [data, setData] = useState({
    title: "",
    name: "",
    categories: [],
    dataLabel: [],
  });
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (
    image,
    { name = `${data.title}`, extension = "jpg" } = {}
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  const handleButtonClick = () => {
    setCanvasVisible(true);
    const apexChartContainer = document.querySelector(".apex-chart");
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "10";
    apexChartContainer.appendChild(canvas);
  };

  const handleRemoveCanvas = () => {
    setCanvasVisible(false);
    const canvasElements = document.querySelectorAll(".apex-chart canvas");
    canvasElements.forEach((canvas) => canvas.remove());
  };

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

  const handleDownload = () => {
    navigate("/download");
  };

  return (
    <>
      <div className="homepage-container">
        <div className="feature-button">
          <div className="feature-button-left">
            <button className="btn" onClick={handleButtonClick}>
              Annotate
            </button>
            <button className="btn">Properties</button>
            <button className="btn" onClick={handleShowDataModal}>
              Data
            </button>
          </div>
          <div className="feature-button-right">
            <button className="btn ">Import data</button>
            <button className="btn" onClick={downloadScreenshot}>
              Download
            </button>
            {isCanvasVisible && (
              <button className="btn cancel" onClick={handleRemoveCanvas}>
                Cancel
              </button>
            )}
          </div>
        </div>
        <div className="chart-container" ref={ref}>
          <ReactApexCharts
            className="apex-chart"
            options={chartData(state.chartId).options}
            series={chartData(state.chartId).series}
            type="line"
            height={500}
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
