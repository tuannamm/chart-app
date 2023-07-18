import React, { useState, useRef, useEffect } from "react";
import "./homepage.scss";

import { fabric } from "fabric";
import { useSelector } from "react-redux";

import GroupButton from "../../components/ButtonGroup";
import Switch from "../../components/Switch";

import { useDownload } from "../../Hooks/useDownload";

import Chart from "../../components/Chart";
import ShapeModal from "../../components/Modal/shapeModal";
import ModalSelector from "../../components/Modal";
import ExcelImportModal from "../../components/Modal/importModal";
import ButtonLeft from "../../components/Button/ButtonLeft";
import ButtonRight from "../../components/Button/ButtonRight";

import { useClearCanvas } from "../../Hooks/useClearCanvas";
import { useShapeDrawingMode } from "../../Hooks/useDrawing";
import { useKeyboardInteractions } from "../../Hooks/useRemoveShape";
import { useCanvasDoubleClick } from "../../Hooks/useCustomShape";

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
  const [plotOptions, setPlotOptions] = useState({
    pie: {
      expandOnClick: true,
      donut: { size: "50%", labels: { show: true } },
    },
    bar: { horizontal: false },
  });
  const [grid, setGrid] = useState({
    show: true,
    borderColor: "#90A4AE",
    strokeDashArray: 0,
    position: "back",
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  const [markers, setMarkers] = useState({
    size: 4,
    colors: undefined,
    strokeColors: "#fff",
    strokeWidth: 2,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    onClick: undefined,
    onDblClick: undefined,
    hover: { size: undefined, sizeOffset: 3 },
  });
  const [xaxis, setXaxis] = useState({
    categories: [],
    labels: { show: true },
    axisBorder: { show: true },
    axisTicks: { show: true },
  });

  const [yaxis, setYaxis] = useState({
    show: true,
    labels: { show: true },
    axisBorder: { show: true },
    axisTicks: { show: true },
  });
  const [animations, setAnimations] = useState({
    enabled: true,
    easing: "easeinout",
    speed: 600,
    animateGradually: { enabled: true, delay: 150 },
    dynamicAnimation: { enabled: true, speed: 350 },
  });
  const chartId = useSelector((state) => state?.chartReducer);
  const dataChart = useSelector((state) => state?.chartDataReducer.data);

  const [data, setData] = useState(dataChart || []);

  const downloadScreenshot = useDownload(chartRef, data);

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

          const canvas = new fabric.Canvas("fabric-canvas", {});

          canvas.setBackgroundColor(
            "rgba(0,0,0,0)",
            canvas.renderAll.bind(canvas)
          );

          canvasRef.current = canvas;
        }
      }, 0);
    }
  };

  const handleShowDataModal = () => {
    setSelectedDataIndex(null);
    setShowDataModal(true);
  };

  useEffect(() => {
    if (selectedShape !== "freeDraw" && canvasRef.current) {
      canvasRef.current.isDrawingMode = false;
    }
  }, [selectedShape]);

  useClearCanvas(isCanvasVisible, canvasRef);
  useShapeDrawingMode(selectedShape, canvasRef);
  useKeyboardInteractions(canvasRef);
  useCanvasDoubleClick(
    canvasRef,
    setSelectedShapeObject,
    setShapeStrokeWidth,
    setShapeColor,
    setShapeModalVisible
  );

  const chartOptions = {
    plotOptions,
    grid,
    markers,
    xaxis,
    yaxis,
    animations,
    stroke: {
      curve: lineStyle,
    },
  };

  return (
    <div className="homepage-container">
      <div className="feature-button">
        <div className="feature-button-left">
          <ButtonLeft
            className="feature-button-left"
            setSelectedShape={setSelectedShape}
            canvasRef={canvasRef}
            handleButtonClick={handleButtonClick}
            handleShowDataModal={handleShowDataModal}
          />
        </div>
        <div className="feature-button-right">
          <ButtonRight
            setShowImportModal={setShowImportModal}
            downloadScreenshot={downloadScreenshot}
            isCanvasVisible={isCanvasVisible}
            handleRemoveCanvas={useClearCanvas}
          />
        </div>
      </div>
      <div
        className="chart-container"
        ref={chartRef}
        style={{ position: "relative" }}
      >
        <button
          className="btn btn-primary"
          onClick={() =>
            setGrid((prevState) => ({ ...prevState, show: !prevState.show }))
          }
        >
          Toggle Grid
        </button>
        <button
          className="btn btn-secondary"
          onClick={() =>
            setAnimations((prevState) => ({
              ...prevState,
              enabled: !prevState.enabled,
            }))
          }
        >
          Toggle Animations
        </button>

        <Chart
          data={data}
          className="apex-chart"
          options={chartOptions}
          chartId={chartId.id}
        />

        <ModalSelector
          chartId={chartId.id}
          showDataModal={showDataModal}
          setShowDataModal={setShowDataModal}
          data={data}
          setData={setData}
          selectedDataIndex={selectedDataIndex}
        />

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
