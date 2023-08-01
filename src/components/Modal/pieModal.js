import React, { useState, useEffect, memo } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { setChartData } from "../../store/action/chartAction";

import constant from "../../utils/constant";
import icons from "../../utils/icons";

import "./pieModal.scss";

const { AiOutlineDelete, AiOutlinePlus } = icons;

const PineModal = ({
  showDataModal,
  setShowDataModal,
  data,
  setData,
  selectedIndex,
}) => {
  const [title, setTitle] = useState("");
  const [labelDataPairs, setLabelDataPairs] = useState([
    { label: "", data: "" },
  ]);
  const dispatch = useDispatch();

  const handleLabelChange = (index, value) => {
    const updatedPairs = [...labelDataPairs];
    updatedPairs[index].label = value;
    setLabelDataPairs(updatedPairs);
  };

  const handleDataChange = (index, value) => {
    const updatedPairs = [...labelDataPairs];
    updatedPairs[index].data = Number(value);
    setLabelDataPairs(updatedPairs);
  };

  const handleAddPair = () => {
    setLabelDataPairs([...labelDataPairs, { label: "", data: "" }]);
  };

  const handleRemovePair = (index) => {
    const updatedPairs = [...labelDataPairs];
    updatedPairs.splice(index, 1);
    setLabelDataPairs(updatedPairs);
  };

  const handleSaveData = () => {
    const newData = {
      title,
      labels: labelDataPairs.map((pair) => pair.label),
      series: labelDataPairs.map((pair) => pair.data),
    };

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

  useEffect(() => {
    if (showDataModal) {
      const index = selectedIndex !== null ? selectedIndex : 0;
      if (index >= 0 && index < data.length) {
        const selectedData = data[index];
        setTitle(selectedData.title);
        const pairs = selectedData.labels.map((label, i) => ({
          label: label,
          data: selectedData.series[i],
        }));
        setLabelDataPairs(pairs);
      } else {
        setTitle("");
        setLabelDataPairs([{ label: "", data: "" }]);
      }
    }
  }, [data, selectedIndex, showDataModal]);

  const handleClose = () => {
    setShowDataModal(false);
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
        setLabelDataPairs(selectedData.labelDataPairs);
      }
    }
  }, [data, selectedIndex, showDataModal]);

  return (
    <Modal show={showDataModal} onHide={handleClose} className="line-modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">Pine Data</Modal.Title>
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

        {labelDataPairs.map((pair, index) => (
          <div key={`pair-${index}`} className="pair-group">
            <div className="input-group">
              <input
                type="text"
                value={pair.label}
                onChange={(e) => handleLabelChange(index, e.target.value)}
                className="input-field"
                placeholder={`Label ${index + 1}`}
              />
            </div>
            <div className="input-group">
              <input
                type="number"
                value={pair.data}
                onChange={(e) =>
                  handleDataChange(index, Number(e.target.value))
                }
                className="input-field"
                placeholder={`Data ${index + 1}`}
              />
            </div>
            <AiOutlineDelete
              className="icons-remove"
              onClick={() => handleRemovePair(index)}
            />
          </div>
        ))}

        <AiOutlinePlus
          className="icons-add"
          onClick={handleAddPair}
          style={{ marginTop: "0.625rem" }}
        />
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

export default memo(PineModal);
