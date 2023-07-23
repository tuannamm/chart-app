import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import "./lineModal.scss";
import icons from "../../utils/icons";
import { setChartData } from "../../store/action/chartAction";

const { AiOutlineDelete } = icons;

const LineModal = ({
  showDataModal,
  setShowDataModal,
  data,
  setData,
  selectedIndex,
}) => {
  const [title, setTitle] = useState("");
  const [labels, setLabels] = useState([""]);
  const [series, setSeries] = useState([{ name: "", data: [""] }]);
  const dispatch = useDispatch();

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
    setLabels(updatedLabels);
  };

  const handleAddData = (seriesIndex) => {
    if (series[seriesIndex].data.length < labels.length) {
      const updatedSeries = [...series];
      updatedSeries[seriesIndex].data.push("");
      setSeries(updatedSeries);
    } else {
      alert("Cannot add more data points than labels");
    }
  };

  const handleAddSeries = () => {
    setSeries([...series, { name: "", data: [""] }]);
  };

  const handleAddLabel = () => {
    setLabels([...labels, ""]);
  };

  const handleSaveData = () => {
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

  return (
    <Modal show={showDataModal} onHide={handleClose} className="line-modal ">
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
              className="input-field"
              placeholder={`Label ${labelIndex + 1}`}
            />
            <AiOutlineDelete
              className="icons-remove"
              onClick={() => handleRemoveLabel(labelIndex)}
            />
          </div>
        ))}

        <Button
          variant="secondary"
          style={{ marginBottom: "0.5rem" }}
          onClick={handleAddLabel}
        >
          Add Label
        </Button>

        {series.map((serie, seriesIndex) => (
          <div key={`series-${seriesIndex}`} className="serie-group">
            <div className="input-group">
              <input
                type="text"
                value={serie.name}
                onChange={(e) => handleNameChange(seriesIndex, e.target.value)}
                className="input-field"
                placeholder="Name"
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

            <Button
              variant="secondary"
              onClick={() => handleAddData(seriesIndex)}
              disabled={series[seriesIndex].data.length >= labels.length}
            >
              Add Data
            </Button>
          </div>
        ))}

        <Button variant="secondary" onClick={handleAddSeries}>
          Add Dataset
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveData}>
          Save
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LineModal;
