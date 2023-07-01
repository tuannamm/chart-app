import React, {
  createRef,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import "./homepage.scss";

import { useLocation } from "react-router-dom";
import ReactApexCharts from "react-apexcharts";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { Stage, Layer, Circle, Line, Rect } from "react-konva";
import { toast } from "react-toastify";

import constant from "../../utils/constant";
import DataModal from "./Modal/dataModal";

const HomePage = () => {
  const { state } = useLocation();
  const ref = createRef(null);

  const [showDataModal, setShowDataModal] = useState(false);
  const [isCanvasVisible, setCanvasVisible] = useState(false);
  const [selectedDataIndex, setSelectedDataIndex] = useState(null);

  const [drag, setDrag] = useState({
    isDragging: false,
    x: 50,
    y: 50,
  });

  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const [data, setData] = useState([]);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (
    image,
    { name = `${data[data.length - 1]?.title}`, extension = "jpg" } = {}
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = async () => {
    await takeScreenShot(ref.current).then(download);
    toast.success("Download successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleButtonClick = () => {
    // setCanvasVisible(true);
    // setAnnotateClicked(true);

    if (!isCanvasVisible) {
      setCanvasVisible(true);
    }
  };

  // useEffect(() => {
  //   if (isCanvasVisible && isAnnotateClicked) {
  //     const apexChartContainer = document.querySelector(".apex-chart");
  //     const canvas = document.querySelector("canvas-container");
  //     apexChartContainer.appendChild(canvas);
  //   }
  // }, [isCanvasVisible, isAnnotateClicked]);

  const handleRemoveCanvas = () => {
    setCanvasVisible(false);
  };

  console.log("series", data);

  const chartData = useCallback(
    (chartId) => {
      switch (chartId) {
        case 1:
        case 2:
          return {
            series:
              data && data?.length > 0
                ? [...data[data.length - 1]?.series]
                : [],
            options: {
              chart: {
                height: 350,
                zoom: {
                  enabled: true,
                },
              },
              title: {
                text: data[data.length - 1]?.title
                  ? data[data.length - 1]?.title
                  : "TITLE",
                align: "center",
              },
              dataLabels: {
                enabled: true,
              },
              stroke: {
                curve: "straight",
              },
              grid: {
                row: {
                  colors: ["#f3f3f3", "transparent"],
                  opacity: 0.5,
                },
              },
            },
          };

        default:
          return true;
      }
    },
    [data]
  );

  useEffect(() => {
    chartData(state?.chartId);
  }, [data]);

  // const handleShowDataModal = () => {
  //   setShowDataModal(true);
  // };

  const handleShowDataModal = () => {
    setSelectedDataIndex(null); // Clear the selected index when showing the modal
    setShowDataModal(true);
  };

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <>
      <div className="homepage-container">
        <div className="feature-button">
          <div className="feature-button-left">
            <button className="btn" onClick={handleButtonClick}>
              {constant.annotate}
            </button>
            <button className="btn">{constant.properties}</button>
            <button className="btn" onClick={handleShowDataModal}>
              {constant.data}
            </button>
          </div>
          <div className="feature-button-right">
            <button className="btn">{constant.import_data}</button>
            <button className="btn" onClick={downloadScreenshot}>
              {constant.download}
            </button>
            {isCanvasVisible && (
              <button className="btn cancel" onClick={handleRemoveCanvas}>
                {constant.cancel}
              </button>
            )}
          </div>
        </div>
        <div className="chart-container" ref={ref}>
          {isCanvasVisible && (
            <div className="canvas-container">
              <Stage
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                width={1500}
                height={500}
              >
                <Layer>
                  {lines.map((line, i) => (
                    <Line
                      key={i}
                      points={line.points}
                      stroke="#df4b26"
                      strokeWidth={5}
                      tension={0.5}
                      draggable
                      globalCompositeOperation={
                        line.tool === "eraser"
                          ? "destination-out"
                          : "source-over"
                      }
                    />
                  ))}
                  <Rect
                    width={100}
                    height={100}
                    draggable
                    fill="red"
                    shadowBlur={10}
                  />
                  <Circle
                    x={drag.x}
                    y={drag.y}
                    radius={50}
                    fill="green"
                    draggable
                    onDragStart={() => {
                      setDrag({
                        ...drag,
                        isDragging: true,
                      });
                    }}
                    onDragEnd={(e) => {
                      setDrag({
                        ...drag,
                        isDragging: false,
                        x: e.target.x(),
                        y: e.target.y(),
                      });
                    }}
                  />
                </Layer>
              </Stage>
            </div>
          )}
          <ReactApexCharts
            className="apex-chart"
            options={chartData(state.chartId).options}
            series={chartData(state.chartId).series}
            type="bar"
            height={500}
          />
          <DataModal
            showDataModal={showDataModal}
            setShowDataModal={setShowDataModal}
            data={data}
            setData={setData}
            selectedDataIndex={selectedDataIndex}
            setSelectedDataIndex={setSelectedDataIndex}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
