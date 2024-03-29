import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import "./dataModal.scss";
import icons from "../../utils/icons";
import { setChartData } from "../../store/action/chartAction";

const { AiOutlineDelete } = icons;

const DataModal = ({
  showDataModal,
  setShowDataModal,
  data,
  setData,
  selectedDataIndex,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [series, setSeries] = useState([]);
  const [newName, setNewName] = useState("");
  const [newItems, setNewItems] = useState([{ x: "", y: "" }]);

  const handleSaveData = () => {
    const newData = {
      title: title,
      series: series,
    };

    if (
      selectedDataIndex !== null &&
      selectedDataIndex >= 0 &&
      selectedDataIndex < data.length
    ) {
      const updatedData = [...data];
      updatedData[selectedDataIndex] = newData;
      setData(updatedData);
    } else {
      setData([newData]);
    }

    dispatch(setChartData([newData]));
    setShowDataModal(false);
  };

  const handleAddItem = () => {
    setNewItems([...newItems, { x: "", y: "" }]);
  };

  useEffect(() => {
    if (
      selectedDataIndex !== null &&
      selectedDataIndex >= 0 &&
      selectedDataIndex < data.length
    ) {
      const selectedData = data[selectedDataIndex];
      setTitle(selectedData.title);
      setSeries(selectedData.series);
    }
  }, [data, selectedDataIndex, showDataModal]);

  const handleItemChange = (
    index,
    field,
    value,
    isExistingItem = false,
    seriesIndex
  ) => {
    if (isExistingItem) {
      const updatedSeries = [...series];
      updatedSeries[seriesIndex].data[index][field] = value;
      setSeries(updatedSeries);
    } else {
      const updatedItems = [...newItems];
      updatedItems[index][field] = value;
      setNewItems(updatedItems);
    }
  };

  const handleAddNewName = () => {
    const newSeries = {
      name: newName,
      data: newItems,
    };

    setSeries([...series, newSeries]);
    setNewName("");
    setNewItems([{ x: "", y: "" }]);
  };

  const handleClose = () => {
    setShowDataModal(false);
  };

  const handleDeleteItem = (itemIndex, seriesIndex) => {
    const updatedSeries = [...series];
    updatedSeries[seriesIndex].data.splice(itemIndex, 1);
    setSeries(updatedSeries);
  };

  return (
    <Modal show={showDataModal} onHide={handleClose} className="modal">
      <Modal.Header closeButton>
        <Modal.Title>DATA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Chart title"
          />
        </div>

        <h3>Dataset</h3>
        {series.map((seriesItem, seriesIndex) => (
          <div key={seriesIndex} className="series-item">
            <h5>Dataset name: {seriesItem.name}</h5>
            {seriesItem.data.map((item, itemIndex) => (
              <div key={itemIndex} className="item">
                <div className="form-group">
                  <input
                    type="text"
                    id={`x-${seriesIndex}-${itemIndex}`}
                    value={item.x}
                    onChange={(e) =>
                      handleItemChange(
                        itemIndex,
                        "x",
                        e.target.value,
                        true,
                        seriesIndex
                      )
                    }
                    placeholder="Label"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    id={`y-${seriesIndex}-${itemIndex}`}
                    value={item.y}
                    onChange={(e) =>
                      handleItemChange(
                        itemIndex,
                        "y",
                        e.target.value,
                        true,
                        seriesIndex
                      )
                    }
                    placeholder="Value"
                  />
                </div>
                <AiOutlineDelete
                  className="icons-remove"
                  onClick={() => handleDeleteItem(itemIndex, seriesIndex)}
                />
              </div>
            ))}
          </div>
        ))}

        <div className="form-group">
          <input
            type="text"
            id="newName"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New Name"
          />
        </div>
        {newItems.map((item, index) => (
          <div key={index} className="item">
            <div className="form-group">
              <input
                type="text"
                id={`new-x-${index}`}
                value={item.x}
                onChange={(e) => handleItemChange(index, "x", e.target.value)}
                placeholder="Label"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                id={`new-y-${index}`}
                value={item.y}
                onChange={(e) => handleItemChange(index, "y", e.target.value)}
                placeholder="Value"
              />
            </div>
          </div>
        ))}
        <Button
          className="add"
          variant="secondary"
          onClick={handleAddItem}
          style={{ marginTop: "0.5rem" }}
        >
          Add Item
        </Button>
        <Button
          className="add ml-3"
          variant="secondary"
          onClick={handleAddNewName}
          style={{ marginTop: "0.5rem" }}
        >
          Add Dataset
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveData}>
          Save
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DataModal;
