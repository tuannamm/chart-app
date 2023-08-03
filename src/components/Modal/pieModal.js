import React, { useState, useEffect, memo } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setChartData } from "../../store/action/chartAction";

import Toast from "../Toast";
import { checkDuplicateLabels } from "../../utils/checkDuplicateLabels";
import hasUndefinedValue from "../../utils/validateInputData";

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
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [labelDataPairs, setLabelDataPairs] = useState([
    { label: "", data: "" },
  ]);
  const [duplicateWarning, setDuplicateWarning] = useState([]);

  const hasEmptyInput = hasUndefinedValue(data);

  const handleLabelChange = (index, value) => {
    const updatedPairs = [...labelDataPairs];
    updatedPairs[index].label = value;
    setDuplicateWarning(
      checkDuplicateLabels(updatedPairs.map((pair) => pair.label))
    );
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
    const duplicatedLabels = checkDuplicateLabels(
      labelDataPairs.map((pair) => pair.label)
    );

    if (duplicatedLabels.length > 0) {
      setDuplicateWarning(duplicatedLabels);
      Toast("error", "Duplicated label");
      return;
    }

    if (hasEmptyInput) {
      Toast("error", "Having empty input");
      return;
    }

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
                className={`input-field ${
                  duplicateWarning.includes(index) ? "warning" : ""
                }`}
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
          {constant.save}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          {constant.close}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(PineModal);
