import React, { useState, useEffect, memo } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { setChartData } from "../../store/action/chartAction";

import icons from "../../utils/icons";
import "./mixedModal.scss";
import checkDuplicateLabels from "../../utils/checkDuplicateLabels";
import Toast from "../Toast";

const { AiOutlineDelete, AiOutlinePlus } = icons;

const MixedModal = ({
  showDataModal,
  setShowDataModal,
  data,
  setData,
  selectedIndex,
}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [labels, setLabels] = useState([""]);
  const [series, setSeries] = useState([
    { name: "", type: "line", data: [""] },
  ]);
  const [duplicateWarning, setDuplicateWarning] = useState([]);

  useEffect(() => {
    if (showDataModal) {
      if (
        selectedIndex !== null &&
        selectedIndex >= 0 &&
        selectedIndex < data.length
      ) {
        const selectedData = data[selectedIndex];
        setTitle(selectedData.title);
        setLabels(selectedData.labels);
        setSeries(selectedData.series);
      }
    }
  }, [data, selectedIndex, showDataModal]);

  const handleNameChange = (seriesIndex, value) => {
    const updatedSeries = [...series];
    updatedSeries[seriesIndex].name = value;
    setSeries(updatedSeries);
  };

  const handleTypeChange = (seriesIndex, value) => {
    const updatedSeries = [...series];
    updatedSeries[seriesIndex].type = value;
    setSeries(updatedSeries);
  };

  const handleDataChange = (seriesIndex, dataIndex, value) => {
    const updatedSeries = [...series];
    updatedSeries[seriesIndex].data[dataIndex] = value;
    setSeries(updatedSeries);
  };

  const handleAddData = (seriesIndex) => {
    const updatedSeries = [...series];
    updatedSeries[seriesIndex].data.push("");
    setSeries(updatedSeries);
  };

  const handleAddSeries = () => {
    setSeries([...series, { name: "", type: "line", data: [""] }]);
  };

  const isInputValid = (input) => {
    if (input === undefined || input === null || input === "") return false;

    if (Array.isArray(input)) {
      return input.every((item) => isInputValid(item));
    }

    if (typeof input === "object") {
      return Object.values(input).every((value) => isInputValid(value));
    }

    return true;
  };

  const handleSaveData = () => {
    const newData = { title, labels, series };

    if (isInputValid(newData)) {
      Toast("error", "Invalid input. Please check your data.");
      return;
    }
    if (
      selectedIndex !== null &&
      selectedIndex >= 0 &&
      selectedIndex < data.length
    ) {
      const updatedData = [...data];
      updatedData[selectedIndex] = newData;
      setData(updatedData);
    } else {
      setData([newData]);
    }
    dispatch(setChartData([newData]));
    setShowDataModal(false);
  };

  const handleClose = () => {
    setShowDataModal(false);
  };

  const handleRemoveSeries = (seriesIndex) => {
    const updatedSeries = [...series];
    updatedSeries.splice(seriesIndex, 1);
    setSeries(updatedSeries);
  };

  const handleRemoveData = (seriesIndex, dataIndex) => {
    const updatedSeries = [...series];
    updatedSeries[seriesIndex].data.splice(dataIndex, 1);
    setSeries(updatedSeries);
  };

  const handleAddLabel = () => {
    setLabels([...labels, ""]);
  };

  const handleLabelChange = (labelIndex, value) => {
    const updatedLabels = [...labels];
    updatedLabels[labelIndex] = value;
    setLabels(updatedLabels);
  };

  const handleRemoveLabel = (labelIndex) => {
    const updatedLabels = [...labels];
    updatedLabels.splice(labelIndex, 1);
    setLabels(updatedLabels);
  };

  const isDataLengthExceedLabels = (seriesIndex) => {
    return series[seriesIndex]?.data.length < labels.length;
  };

  return (
    <Modal show={showDataModal} onHide={handleClose} className="mixed-modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">Mixed Data</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="input-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="Chart title"
          />
        </div>

        {labels.map((label, labelIndex) => (
          <div key={labelIndex} className="input-group">
            <input
              type="text"
              value={label}
              onChange={(e) => handleLabelChange(labelIndex, e.target.value)}
              className={`input-field ${
                duplicateWarning[labelIndex] ? "warning" : ""
              }`}
              placeholder={`Label ${labelIndex + 1}`}
            />
            <AiOutlineDelete
              className="icons-remove"
              onClick={() => handleRemoveLabel(labelIndex)}
            />
          </div>
        ))}

        <AiOutlinePlus className="icons-add" onClick={handleAddLabel} />

        <Row className="serie-group">
          {series.map((serie, seriesIndex) => (
            <Col key={seriesIndex} className="dataset">
              <div className="input-group">
                <input
                  type="text"
                  value={serie?.name}
                  onChange={(e) =>
                    handleNameChange(seriesIndex, e.target.value)
                  }
                  className="input-field"
                  placeholder="Name"
                />
                <select
                  value={serie?.type}
                  onChange={(e) =>
                    handleTypeChange(seriesIndex, e.target.value)
                  }
                  className="select-field my-custom-select"
                >
                  <option value="line">Line</option>
                  <option value="area">Area</option>
                  <option value="column">Column</option>
                </select>
                <AiOutlineDelete
                  className="icons-remove"
                  onClick={() => handleRemoveSeries(seriesIndex)}
                />
              </div>

              {serie?.data.map((value, dataIndex) => (
                <div key={dataIndex} className="input-group">
                  <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      handleDataChange(seriesIndex, dataIndex, e.target.value)
                    }
                    className="input-field"
                    placeholder={`Data ${dataIndex + 1}`}
                  />
                  <AiOutlineDelete
                    className="icons-remove"
                    onClick={() => handleRemoveData(seriesIndex, dataIndex)}
                  />
                </div>
              ))}
              {isDataLengthExceedLabels(seriesIndex) ? (
                <AiOutlinePlus
                  className="icons-add"
                  onClick={() => handleAddData(seriesIndex)}
                />
              ) : null}
            </Col>
          ))}

          <Col>
            <AiOutlinePlus className="icons-add" onClick={handleAddSeries} />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSaveData}>Save</Button>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(MixedModal);
