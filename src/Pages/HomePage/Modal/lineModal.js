import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import "./lineModal.scss";
import icons from "../../../utils/icons";

const { AiOutlineDelete } = icons;

const LineModal = ({
  showDataModal,
  setShowDataModal,
  data,
  setData,
  selectedIndex,
}) => {
  const [title, setTitle] = useState("");
  const [series, setSeries] = useState([{ name: "", data: [""] }]);

  useEffect(() => {
    if (showDataModal) {
      if (
        selectedIndex !== null &&
        selectedIndex >= 0 &&
        selectedIndex < data.length
      ) {
        const selectedData = data[selectedIndex];
        setTitle(selectedData.title);
        setSeries(selectedData.series);
      }
    }
  }, [data, selectedIndex, showDataModal]);

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

  const handleAddData = (seriesIndex) => {
    const updatedSeries = [...series];
    updatedSeries[seriesIndex].data.push("");
    setSeries(updatedSeries);
  };

  const handleAddSeries = () => {
    setSeries([...series, { name: "", data: [""] }]);
  };

  const handleSaveData = () => {
    const newData = { title, series };
    if (
      selectedIndex !== null &&
      selectedIndex >= 0 &&
      selectedIndex < data.length
    ) {
      const updatedData = [...data];
      updatedData[selectedIndex] = newData;
      setData(updatedData);
    } else {
      setData([newData]); // replace previous data entirely with new data
    }
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

  return (
    <Modal show={showDataModal} onHide={handleClose} className="line-modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">Line Data</Modal.Title>
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

        {series.map((serie, seriesIndex) => (
          <div key={seriesIndex} className="serie-group">
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
              <div key={dataIndex} className="input-group">
                <input
                  type="number"
                  value={value}
                  onChange={(e) =>
                    handleDataChange(seriesIndex, dataIndex, e.target.value)
                  }
                  className="input-field"
                  placeholder={`Data ${dataIndex}`}
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
            >
              Add Data
            </Button>
          </div>
        ))}

        <Button variant="secondary" onClick={handleAddSeries}>
          Add Series
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSaveData}>Save</Button>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LineModal;
