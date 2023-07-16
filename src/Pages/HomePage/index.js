import React, { useState, useRef, useEffect } from "react";
import "./homepage.scss";

import ReactApexCharts from "react-apexcharts";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { fabric } from "fabric";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import GroupButton from "../../components/ButtonGroup";

import constant from "../../utils/constant";
import icons from "../../utils/icons";

import Switch from "../../components/Switch";
import DataModal from "../../components/Modal/dataModal";
import LineModal from "../../components/Modal/lineModal";
import MixedModal from "../../components/Modal/mixedModal";
import ShapeModal from "../../components/Modal/shapeModal";
import PieModal from "../../components/Modal/pieModal";
import ExcelImportModal from "../../components/Modal/importModal";
import DropdownAnnotate from "../../components/Dropdown";

const { BiData, BiDownload, BiImport, BiExport } = icons;

const HomePage = () => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  const [showDataModal, setShowDataModal] = useState(false);
  const [isCanvasVisible, setCanvasVisible] = useState(false);
  const [selectedDataIndex, setSelectedDataIndex] = useState(null);
  const [theme, setTheme] = useState(false);
  const [lineStyle, setLineStyle] = useState("smooth");
  const [selectedShape, setSelectedShape] = useState("circle");
  const [shapeModalVisible, setShapeModalVisible] = useState(false);
  const [selectedShapeObject, setSelectedShapeObject] = useState(null);
  const [shapeStrokeWidth, setShapeStrokeWidth] = useState(null);
  const [shapeColor, setShapeColor] = useState("#000000");
  const [shapeLineStyle, setShapeLineStyle] = useState(null);
  const [shapeStrokeColor, setShapeStrokeColor] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);

  const chartId = useSelector((state) => state?.chartReducer);
  const dataChart = useSelector((state) => state?.chartDataReducer.data);

  const [data, setData] = useState(dataChart || []);

  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  console.log(data);
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

  const chartData = {
    series: data[0]?.series ? data[0]?.series : [],
    options: {
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
        palette: "palette4",
      },

      labels: data[0]?.labels ? data[0]?.labels : [],
      fill: {
        type: "solid",
        // opacity: [0.85, 0.25, 1],
      },
    },
  };

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
      case "arrow":
        newShape = new fabric.Line([50, 100, 200, 200], {
          left: 170,
          top: 150,
          stroke: "black",
          strokeWidth: 2,
        });
        let triangle = new fabric.Triangle({
          left: newShape.x2,
          top: newShape.y2,
          angle: -45,
          width: 20,
          height: 20,
          fill: "black",
        });
        canvasRef.current.add(newShape, triangle);
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

  // free draw
  useEffect(() => {
    if (selectedShape !== "freeDraw" && canvasRef.current) {
      canvasRef.current.isDrawingMode = false;
    }
  }, [selectedShape]);

  // delete selected shape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        if (canvasRef.current) {
          const activeObject = canvasRef.current.getActiveObject();
          if (
            activeObject &&
            !(activeObject instanceof fabric.IText && activeObject.isEditing)
          ) {
            canvasRef.current.remove(activeObject);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // double click to open modal properties shape
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.on("mouse:dblclick", function (event) {
        if (event.target) {
          setSelectedShapeObject(event.target);
          setShapeStrokeWidth(event.target.width);
          setShapeColor(event.target.fill);
          setShapeModalVisible(true);
        }
      });
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.off("mouse:dblclick");
      }
    };
  });

  const modal = (chartId) => {
    switch (chartId) {
      case 1:
      case 2:
        return (
          <LineModal
            showDataModal={showDataModal}
            setShowDataModal={setShowDataModal}
            data={data}
            setData={setData}
            selectedIndex={selectedDataIndex}
          />
        );
      case 3:
      case 6:
        return (
          <DataModal
            showDataModal={showDataModal}
            setShowDataModal={setShowDataModal}
            data={data}
            setData={setData}
            selectedDataIndex={selectedDataIndex}
          />
        );
      case 4:
        return (
          <PieModal
            showDataModal={showDataModal}
            setShowDataModal={setShowDataModal}
            data={data}
            setData={setData}
            selectedIndex={selectedDataIndex}
          />
        );
      case 5:
        return (
          <MixedModal
            showDataModal={showDataModal}
            setShowDataModal={setShowDataModal}
            data={data}
            setData={setData}
            selectedDataIndex={selectedDataIndex}
          />
        );
      default:
        return;
    }
  };

  const typeChart = (chartId) => {
    switch (chartId) {
      case 1:
        return "line";
      case 2:
        return "area";
      case 3:
        return "bar";
      case 4:
        return "pie";
      case 5:
        return "mixed";
      default:
        return;
    }
  };

  return (
    <div className="homepage-container">
      <div className="feature-button">
        <div className="feature-button-left">
          <DropdownAnnotate
            setSelectedShape={setSelectedShape}
            addShape={addShape}
            handleButtonClick={handleButtonClick}
          />
          <button className="btn" onClick={handleShowDataModal}>
            <span>
              <BiData className="icons text" /> {constant.data}
            </span>
            <span>
              <BiData className="icons text" />
            </span>
          </button>
        </div>
        <div className="feature-button-right">
          <button className="btn" onClick={() => setShowImportModal(true)}>
            <span>
              <BiImport className="icons text" /> {constant.import_data}
            </span>
            <span>
              <BiImport className="icons text" />
            </span>
          </button>
          <button className="btn">
            <span>
              <BiExport className="icons text" /> {constant.export_data}
            </span>
            <span>
              <BiExport className="icons text" />
            </span>
          </button>
          <button className="btn" onClick={downloadScreenshot}>
            <span>
              <BiDownload className="icons text" /> {constant.download}
            </span>
            <span>
              <BiDownload className="icons text" />
            </span>
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
          options={chartData.options}
          series={chartData.series}
          type={typeChart(chartId?.id)}
          height={500}
        />

        {modal(chartId.id)}

        <ShapeModal
          selectedShapeObject={selectedShapeObject}
          shapeModalVisible={shapeModalVisible}
          setShapeModalVisible={setShapeModalVisible}
          shapeStrokeWidth={shapeStrokeWidth}
          setShapeStrokeWidth={setShapeStrokeWidth}
          shapeColor={shapeColor}
          setShapeColor={setShapeColor}
          canvasRef={canvasRef}
          shapeLineStyle={shapeLineStyle}
          setShapeLineStyle={setShapeLineStyle}
          shapeStrokeColor={shapeStrokeColor}
          setShapeStrokeColor={setShapeStrokeColor}
        />

        <ExcelImportModal
          showImportModal={showImportModal}
          setShowImportModal={setShowImportModal}
          setData={setData}
          chartId={chartId.id}
        />
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
  );
};

export default HomePage;
