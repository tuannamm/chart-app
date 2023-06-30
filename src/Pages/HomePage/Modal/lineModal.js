import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import "./dataModal.scss";

const LineModal = ({
  showDataModal,
  setShowDataModal,
  series,
  setSeries,
  selectedIndex,
}) => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (
      selectedIndex !== null &&
      selectedIndex >= 0 &&
      selectedIndex < series.length
    ) {
      const selectedSeries = series[selectedIndex];
      setName(selectedSeries.name);
      setData(selectedSeries.data);
    }
  }, [series, selectedIndex, showDataModal]);

  const handleSaveData = () => {
    const newSeries = {
      name: name,
      series: data,
    };

    if (
      selectedIndex !== null &&
      selectedIndex >= 0 &&
      selectedIndex < series.length
    ) {
      const updatedSeries = [...series];
      updatedSeries[selectedIndex] = newSeries;
      setSeries(updatedSeries);
    } else {
      setSeries([newSeries]);
    }

    setShowDataModal(false);
  };

  const handleAddData = () => {
    setData([...data, ""]);
  };

  const handleDataChange = (index, value) => {
    const updatedData = [...data];
    updatedData[index] = Number(value);
    setData(updatedData);
  };

  const handleClose = () => {
    setShowDataModal(false);
  };

  const handleDeleteData = (dataIndex) => {
    const updatedData = [...data];
    updatedData.splice(dataIndex, 1);
    setData(updatedData);
  };

  return (
    <Modal show={showDataModal} onHide={handleClose} className="modal">
      <Modal.Header closeButton>
        <Modal.Title>SERIES</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Series Name"
          />
        </div>

        <h3>Data</h3>
        {data.map((dataItem, dataIndex) => (
          <div key={dataIndex} className="data-item">
            <div className="form-group">
              <input
                type="number"
                id={`data-${dataIndex}`}
                value={dataItem}
                onChange={(e) => handleDataChange(dataIndex, e.target.value)}
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => handleDeleteData(dataIndex)}
            >
              Delete Data
            </Button>
          </div>
        ))}
        <Button className="add" variant="secondary" onClick={handleAddData}>
          Add Data
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
