import React, { useState, useEffect, memo } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

import Toast from "../Toast";
import { setChartData } from "../../store/action/chartAction";
import { checkDuplicateLabels } from "../../utils/checkDuplicateLabels";
import hasUndefinedValue from "../../utils/validateInputData";

import icons from "../../utils/icons";
import constant from "../../utils/constant";
import "./lineModal.scss";

const { AiOutlineDelete, AiOutlinePlus } = icons;

const LineModal = ({
  showDataModal,
  setShowDataModal,
  data,
  setData,
  selectedIndex,
}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [labels, setLabels] = useState([""]);
  const [series, setSeries] = useState([{ name: "", data: [""] }]);
  const [duplicateWarning, setDuplicateWarning] = useState([]);

  const hasEmptyInput = hasUndefinedValue(data);

  const handleNameChange = (seriesIndex, value) => {
    const updatedSeries = [...series];
    updatedSeries[seriesIndex].name = value;
    setSeries(updatedSeries);
  };

  const handleDataChange = (seriesIndex, dataIndex, value) => {
    const updatedSeries = [...series];
    updatedSeries[seriesIndex].data[dataIndex] = value;
    setSeries(updatedSeries);
  };

  const handleLabelChange = (labelIndex, value) => {
    const updatedLabels = [...labels];
    updatedLabels[labelIndex] = value;
    setDuplicateWarning(checkDuplicateLabels(updatedLabels));
    setLabels(updatedLabels);
  };

  const handleAddData = (seriesIndex) => {
    const updatedSeries = [...series];
    updatedSeries[seriesIndex].data.push("");
    setSeries(updatedSeries);
  };

  const handleAddSeries = () => {
    setSeries([...series, { name: "", data: [""] }]);
  };

  const handleAddLabel = () => {
    setLabels([...labels, ""]);
  };

  const handleSaveData = () => {
    const duplicatedLabels = checkDuplicateLabels(labels);

    if (duplicatedLabels.length > 0) {
      setDuplicateWarning(duplicatedLabels);
      Toast("error", "Duplicated label");
      return;
    }

    if (hasEmptyInput) {
      Toast("error", "Having empty input");
      return;
    }

    const newData = { title, labels, series };
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
    Toast("success", "Create chart successfully");
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

  const handleRemoveLabel = (labelIndex) => {
    const updatedLabels = [...labels];
    updatedLabels.splice(labelIndex, 1);
    setLabels(updatedLabels);
  };

  useEffect(() => {
    if (showDataModal) {
      setDuplicateWarning([]);
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

  useEffect(() => {
    if (showDataModal) {
      const index = selectedIndex !== null ? selectedIndex : 0;
      if (index >= 0 && index < data.length) {
        const selectedData = data[index];
        setTitle(selectedData.title);
        setLabels(selectedData.labels);
        setSeries(selectedData.series);
      }
    }
  }, [data, selectedIndex, showDataModal]);

  return (
    <Modal show={showDataModal} onHide={handleClose} className="line-modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">Data</Modal.Title>
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
          <div key={`label-${labelIndex}`} className="input-group">
            <input
              type="text"
              value={label}
              onChange={(e) => handleLabelChange(labelIndex, e.target.value)}
              className={`input-field ${
                duplicateWarning.includes(labelIndex) ? "warning" : ""
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
            <Col key={`series-${seriesIndex}`} md={4} className="dataset">
              <div className="input-group">
                <input
                  type="text"
                  value={serie.name}
                  onChange={(e) =>
                    handleNameChange(seriesIndex, e.target.value)
                  }
                  className="input-field input-field-name"
                  placeholder={`Dataset ${seriesIndex + 1}`}
                />
                <AiOutlineDelete
                  className="icons-remove"
                  onClick={() => handleRemoveSeries(seriesIndex)}
                />
              </div>
              {serie.data.map((value, dataIndex) => (
                <div key={`data-${dataIndex}`} className="input-group">
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
              {series[seriesIndex].data.length < labels.length && (
                <AiOutlinePlus
                  className="icons-add"
                  onClick={() => handleAddData(seriesIndex)}
                />
              )}
            </Col>
          ))}
          <Col>
            <AiOutlinePlus
              className="icons-add"
              onClick={handleAddSeries}
              style={{ marginTop: "0.625rem" }}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveData}>
          {constant.save}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          {constant.close}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(LineModal);
