import React, { useState, useRef, useEffect, memo } from "react";
import { fabric } from "fabric";
import { useSelector } from "react-redux";

import Chart from "../../components/Chart";
import Navbar from "../../components/Navbar";
import ShapeModal from "../../components/Modal/shapeModal";
import ModalSelector from "../../components/Modal";
import ExcelImportModal from "../../components/Modal/importModal";
import ChartPropertiesModal from "../../components/Modal/propertiesModal";
import ButtonLeft from "../../components/Button/ButtonLeft";
import ButtonRight from "../../components/Button/ButtonRight";
import ChartPropertiesControl from "../../components/ChartProperties";
import BreadcrumbComponent from "../../components/Breadcrumb";

import { useDownload } from "../../Hooks/useDownload";
import { useClearCanvas } from "../../Hooks/useClearCanvas";
import { useShapeDrawingMode } from "../../Hooks/useDrawing";
import { useKeyboardInteractions } from "../../Hooks/useRemoveShape";
import { useCanvasDoubleClick } from "../../Hooks/useCustomShape";

import "./homepage.scss";

const HomePage = () => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  const [showDataModal, setShowDataModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [isCanvasVisible, setCanvasVisible] = useState(false);
  const [selectedDataIndex, setSelectedDataIndex] = useState(null);
  const [lineStyle, setLineStyle] = useState("smooth");
  const [selectedShape, setSelectedShape] = useState("circle");
  const [shapeModalVisible, setShapeModalVisible] = useState(false);
  const [selectedShapeObject, setSelectedShapeObject] = useState(null);
  const [shapeStrokeWidth, setShapeStrokeWidth] = useState(null);
  const [shapeColor, setShapeColor] = useState("#000000");
  const [shapeLineStyle, setShapeLineStyle] = useState(null);
  const [shapeStrokeColor, setShapeStrokeColor] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [chartProperties, setChartProperties] = useState({
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    showDataLabels: true,
    showGridRow: true,
    showAnimations: true,
  });
  const [fabricCanvas, setFabricCanvas] = useState(null);

  const chartId = useSelector((state) => state?.chartReducer);
  const dataChart = useSelector((state) => state?.chartDataReducer.data);

  const dataFromStore = chartId.id === 4 || chartId.id === 6 ? [] : dataChart;
  const [data, setData] = useState(dataFromStore);

  const downloadScreenshot = useDownload(chartRef, data);

  const isBiggerChart = data && data[0]?.series.length >= 10;
  const bigger = isBiggerChart ? "chart-container-bigger" : "chart-container";

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
          setFabricCanvas(canvas);
        }
      }, 0);
    }
  };

  const handleShowDataModal = () => {
    setSelectedDataIndex(null);
    setShowDataModal(true);
  };

  const handleShowPropertyModal = () => {
    setShowPropertyModal(true);
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

  const handleCancelClick = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      setCanvasVisible(false);
    }
  };

  const chartOptions = {
    stroke: {
      curve: lineStyle,
    },
  };

  console.log(data);

  return (
    <div>
      <Navbar />

      <div className="homepage-container">
        <div>
          <BreadcrumbComponent chartId={chartId} />
        </div>
        <div className="feature-button">
          <div className="feature-button-left">
            <ButtonLeft
              setSelectedShape={setSelectedShape}
              canvasRef={canvasRef}
              handleButtonClick={handleButtonClick}
              handleShowDataModal={handleShowDataModal}
              handleShowPropertyModal={handleShowPropertyModal}
            />
          </div>
          <div className="feature-button-right">
            <ButtonRight
              setShowImportModal={setShowImportModal}
              downloadScreenshot={downloadScreenshot}
              isCanvasVisible={isCanvasVisible}
              handleRemoveCanvas={handleCancelClick}
              data={data}
            />
          </div>
        </div>

        <div className="chart-and-properties-container">
          {data && data[0]?.series.length < 10 && (
            <div className="chart-properties">
              <ChartPropertiesControl
                properties={chartProperties}
                onPropertiesChange={setChartProperties}
                setData={setData}
                setLineStyle={setLineStyle}
              />
            </div>
          )}
          <div
            className={bigger}
            ref={chartRef}
            style={{ position: "relative" }}
          >
            <Chart
              data={data}
              options={chartOptions}
              chartId={chartId.id}
              properties={chartProperties}
            />
          </div>
        </div>

        <ChartPropertiesModal
          showPropertyModal={showPropertyModal}
          setShowPropertyModal={setShowPropertyModal}
          properties={chartProperties}
          onPropertiesChange={setChartProperties}
          setData={setData}
          setLineStyle={setLineStyle}
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
    </div>
  );
};

export default memo(HomePage);
