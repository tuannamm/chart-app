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
import { fabric } from "fabric";
import { Stage, Layer, Circle, Line, Rect } from "react-konva";
import { toast } from "react-toastify";
import GroupButton from "../../components/ButtonGroup";

import constant from "../../utils/constant";
import Switch from "../../components/Switch/switch";
import DataModal from "./Modal/dataModal";
import LineModal from "./Modal/lineModal";
import MixedModal from "./Modal/mixedModal";

const HomePage = () => {
  const { state } = useLocation();
  const ref = createRef(null);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  const [showDataModal, setShowDataModal] = useState(false);
  const [isCanvasVisible, setCanvasVisible] = useState(false);
  const [selectedDataIndex, setSelectedDataIndex] = useState(null);
  const [chartType, setChartType] = useState("");
  const [theme, setTheme] = useState(false);
  const [lineStyle, setLineStyle] = useState("smooth");

  const [drag, setDrag] = useState({
    isDragging: false,
    x: 100,
    y: 100,
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
    // const fabricCanvas = document.querySelector(".canvas-container");
    // if (fabricCanvas) {
    //   fabricCanvas.remove();
    // }
  };
  // const handleButtonClick = () => {
  //   if (!isCanvasVisible) {
  //     setCanvasVisible(true);

  //     setTimeout(() => {
  //       if (chartRef.current) {
  //         const fabricCanvas = document.createElement("canvas");
  //         fabricCanvas.id = "fabric-canvas";
  //         fabricCanvas.style.position = "absolute";
  //         fabricCanvas.style.top = "0";
  //         fabricCanvas.style.left = "0";
  //         fabricCanvas.width = chartRef.current.clientWidth;
  //         fabricCanvas.height = chartRef.current.clientHeight;
  //         fabricCanvas.style.zIndex = "1000";
  //         chartRef.current.appendChild(fabricCanvas);

  //         const canvas = new fabric.Canvas("fabric-canvas", {
  //           isDrawingMode: true,
  //         });
  //       }
  //     }, 0);
  //   }
  // };

  const chartData = useCallback(
    (chartId) => {
      switch (chartId) {
        case 1:
        case 2:
        case 3:
        case 5:
          return {
            series: data && data?.length > 0 ? [...data[0]?.series] : [],
            options: {
              chart: {
                height: 350,
                zoom: {
                  enabled: true,
                },
              },
              title: {
                text: data[0]?.title ? data[0]?.title : "TITLE",
                align: "center",
              },
              dataLabels: {
                enabled: true,
              },
              stroke: {
                curve: lineStyle,
              },
              grid: {
                row: {
                  colors: ["#f3f3f3", "transparent"],
                  opacity: 0.5,
                },
              },
              theme: {
                mode: theme ? "dark" : "light",
                palette: "palette4",
              },
              labels: data[0]?.labels ? data[0]?.labels : [],
              fill: {
                opacity: [0.85, 0.25, 1],
                gradient: {
                  inverseColors: false,
                  shade: "light",
                  type: "vertical",
                  opacityFrom: 0.85,
                  opacityTo: 0.55,
                  stops: [0, 100, 100, 100],
                },
              },
            },
          };
        default:
          return true;
      }
    },
    [data, chartType, theme, lineStyle]
  );

  useEffect(() => {
    chartData(state?.chartId);
  }, [data]);

  const handleShowDataModal = () => {
    setSelectedDataIndex(null);
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

  console.log("Xxxx", data);

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
            type="area"
            height={500}
          />

          {state?.chartId === 1 || chartType === "line" ? (
            <LineModal
              showDataModal={showDataModal}
              setShowDataModal={setShowDataModal}
              data={data}
              setData={setData}
              selectedIndex={selectedDataIndex}
            />
          ) : (
            <DataModal
              showDataModal={showDataModal}
              setShowDataModal={setShowDataModal}
              data={data}
              setData={setData}
              selectedDataIndex={selectedDataIndex}
              setSelectedDataIndex={setSelectedDataIndex}
            />
          )}

          {/* <MixedModal
            showDataModal={showDataModal}
            setShowDataModal={setShowDataModal}
            data={data}
            setData={setData}
            selectedDataIndex={selectedDataIndex}
          /> */}
        </div>
        {data && data?.length > 0 && (
          <div className="chart-properties">
            <Switch
              title="Dark theme"
              onChange={() => setTheme(!theme)}
              state={theme}
            />
            <GroupButton title="Line style" setLineStyle={setLineStyle} />
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
