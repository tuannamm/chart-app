import React, { useState, useRef, useEffect, useCallback } from "react";
import "./homepage.scss";

import ReactApexCharts from "react-apexcharts";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { fabric } from "fabric";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import GroupButton from "../../components/ButtonGroup";

import constant from "../../utils/constant";
import Switch from "../../components/Switch/switch";
import DataModal from "./Modal/dataModal";
import LineModal from "./Modal/lineModal";
import MixedModal from "./Modal/mixedModal";
import icons from "../../utils/icons";

const {
  IoTextOutline,
  BsCircle,
  BsSquare,
  BsTriangle,
  BsPencil,
  GiStraightPipe,
  BiRectangle,
} = icons;

const HomePage = () => {
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
  const [selectedShapeObject, setSelectedShapeObject] = useState(null);
  const [shapeModalVisible, setShapeModalVisible] = useState(false);

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
    await takeScreenShot(chartRef.current).then(download);
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

      setTimeout(() => {
        if (chartRef.current) {
          const fabricCanvas = document.createElement("canvas");
          fabricCanvas.id = "fabric-canvas";
          fabricCanvas.style.position = "absolute";
          fabricCanvas.style.top = "0";
          fabricCanvas.style.left = "0";
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
    const allCanvases = document.getElementsByTagName("canvas");
    while (allCanvases.length > 0) {
      allCanvases[0].parentNode.removeChild(allCanvases[0]);
    }
    setCanvasVisible(false);
    canvasRef.current = null;
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

  const addShape = (shape) => {
    if (!canvasRef.current) return;

    let newShape;
    const shapeProperties = {
      left: 100,
      top: 100,
      hasControls: true,
      fill: "transparent",
      stroke: "black",
      strokeWidth: 2,
    };

    switch (shape) {
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
      case "line":
        newShape = new fabric.Line([50, 100, 200, 200], {
          left: 170,
          top: 150,
          stroke: "black",
          strokeWidth: 2,
        });
        break;
      case "text":
        newShape = new fabric.IText("Hello, World!", {
          left: 100,
          top: 100,
          fontSize: 30,
          editable: true,
        });
        break;
      case "freeDraw":
        canvasRef.current.isDrawingMode = true;
        canvasRef.current.freeDrawingBrush.width = 5;
        canvasRef.current.freeDrawingBrush.color = "#000000";
        return;
      case "rectangle":
        newShape = new fabric.Rect({
          ...shapeProperties,
          width: 200,
          height: 100,
        });
        break;
      default:
        return;
    }

    canvasRef.current.add(newShape);
  };

  useEffect(() => {
    if (selectedShape !== "freeDraw" && canvasRef.current) {
      canvasRef.current.isDrawingMode = false;
    }
  }, [selectedShape]);

  const removeSelectedShape = () => {
    const activeObject = canvasRef.current.getActiveObject();

    if (activeObject) {
      canvasRef.current.remove(activeObject);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        const activeObject = canvasRef.current.getActiveObject();
        if (
          activeObject &&
          !(activeObject instanceof fabric.IText && activeObject.isEditing)
        ) {
          canvasRef.current.remove(activeObject);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.on("mouse:dblclick", (event) => {
        if (event.target) {
          setSelectedShapeObject(event.target);
          setShapeModalVisible(true);
        }
      });
    }
    return () => {
      if (canvasRef.current) {
        // Clean up event listeners
        canvasRef.current.off("mouse:dblclick");
      }
    };
  }, [canvasRef]);

  const handleModalSubmit = ({ width, color }) => {
    if (selectedShapeObject) {
      selectedShapeObject.set({ width, fill: color });
      canvasRef.current.renderAll();
    }
    setShapeModalVisible(false);
  };

  return (
    <>
      <div className="homepage-container">
        <div className="feature-button">
          <div className="feature-button-left">
            <>
              <Dropdown
                onSelect={(selectedKey) => {
                  setSelectedShape(selectedKey);
                  addShape(selectedKey);
                }}
                onClick={handleButtonClick}
              >
                <Dropdown.Toggle>Annotation</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="circle">
                    <BsCircle /> Circle
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="square">
                    <BsSquare /> Square
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="triangle">
                    <BsTriangle /> Triangle
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="freeDraw">
                    <BsPencil /> Free Draw
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="line">
                    <GiStraightPipe /> Line
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="rectangle">
                    <BiRectangle /> Rectangle
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="text">
                    <IoTextOutline /> Text
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>

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
          <ReactApexCharts
            className="apex-chart"
            options={chartData(chartId.id).options}
            series={chartData(chartId.id).series}
            type="line"
            height={500}
          />

          {chartId?.id === 1 || chartType === "line" ? (
            // <LineModal
            //   showDataModal={showDataModal}
            //   setShowDataModal={setShowDataModal}
            //   data={data}
            //   setData={setData}
            //   selectedIndex={selectedDataIndex}
            //   className="modal-dialog modal-dialog-centered"
            // />
            <MixedModal
              showDataModal={showDataModal}
              setShowDataModal={setShowDataModal}
              data={data}
              setData={setData}
              selectedDataIndex={selectedDataIndex}
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
