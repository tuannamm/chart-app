import React, {
  createRef,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import "./homepage.scss";

import ReactApexCharts from "react-apexcharts";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { fabric } from "fabric";
import { toast } from "react-toastify";
import GroupButton from "../../components/ButtonGroup";
import { useSelector } from "react-redux";

import constant from "../../utils/constant";
import Switch from "../../components/Switch/switch";
import DataModal from "./Modal/dataModal";
import LineModal from "./Modal/lineModal";
import MixedModal from "./Modal/mixedModal";

const HomePage = () => {
  const ref = createRef(null);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  const [showDataModal, setShowDataModal] = useState(false);
  const [isCanvasVisible, setCanvasVisible] = useState(false);
  const [selectedDataIndex, setSelectedDataIndex] = useState(null);
  const [chartType, setChartType] = useState("");
  const [theme, setTheme] = useState(false);
  const [lineStyle, setLineStyle] = useState("smooth");
  const [isAnnotateButtonClicked, setAnnotateButtonClicked] = useState(false);
  const [selectedShape, setSelectedShape] = useState("circle");

  const chartId = useSelector((state) => state?.chartReducer);
  const dataChart = useSelector((state) => state?.chartDataReducer.data);

  const [data, setData] = useState(dataChart || []);

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
    if (!isCanvasVisible) {
      setCanvasVisible(true);
      setAnnotateButtonClicked(true);

      setTimeout(() => {
        if (chartRef.current) {
          const fabricCanvas = document.createElement("canvas");
          fabricCanvas.id = "fabric-canvas";
          fabricCanvas.style.position = "absolute";
          fabricCanvas.style.top = "0";
          fabricCanvas.style.left = "0";
          // fabricCanvas.style.opacity = "0";
          fabricCanvas.width = chartRef.current.clientWidth;
          fabricCanvas.height = chartRef.current.clientHeight;
          fabricCanvas.style.zIndex = "1000";

          chartRef.current.appendChild(fabricCanvas);

          const canvas = new fabric.Canvas("fabric-canvas", {
            // isDrawingMode: true,
          });

          canvas.setBackgroundColor(
            "rgba(0,0,0,0)",
            canvas.renderAll.bind(canvas)
          );

          canvasRef.current = canvas;
        }
      }, 0);
    }
  };

  const handleRemoveCanvas = () => {
    setCanvasVisible(false);
  };

  const chartData = useCallback(
    (chartId) => {
      switch (chartId) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
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
    chartData(chartId?.id);
  }, [data]);

  const handleShowDataModal = () => {
    setSelectedDataIndex(null);
    setShowDataModal(true);
  };

  const addShape = () => {
    if (!canvasRef.current) return;

    let newShape;
    const shapeProperties = {
      left: 100,
      top: 100,
      hasControls: true,
    };

    switch (selectedShape) {
      case "circle":
        newShape = new fabric.Circle({ ...shapeProperties, radius: 50 });
        break;
      case "square":
        newShape = new fabric.Rect({
          ...shapeProperties,
          width: 100,
          height: 100,
        });
        break;
      case "triangle":
        newShape = new fabric.Triangle({
          ...shapeProperties,
          width: 100,
          height: 100,
        });
        break;
      default:
        newShape = new fabric.Circle({ ...shapeProperties, radius: 50 });
    }

    canvasRef.current.add(newShape);
  };

  return (
    <>
      <div className="homepage-container">
        <div className="feature-button">
          <div className="feature-button-left">
            <button className="btn" onClick={handleButtonClick}>
              {constant.annotate}
            </button>
            {isAnnotateButtonClicked && (
              <>
                {/* Adding dropdown menu for shapes selection */}
                <select
                  onChange={(e) => setSelectedShape(e.target.value)}
                  value={selectedShape}
                >
                  <option value="circle">Circle</option>
                  <option value="square">Square</option>
                  <option value="triangle">Triangle</option>
                </select>
                <button className="btn" onClick={addShape}>
                  Add Shape
                </button>
              </>
            )}
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
        <div
          className="chart-container"
          ref={chartRef}
          style={{ position: "relative" }}
        >
          {/* {isCanvasVisible && (
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
          )} */}
          <ReactApexCharts
            className="apex-chart"
            options={chartData(chartId.id).options}
            series={chartData(chartId.id).series}
            type="line"
            height={500}
          />

          {chartId?.id === 1 || chartType === "line" ? (
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
