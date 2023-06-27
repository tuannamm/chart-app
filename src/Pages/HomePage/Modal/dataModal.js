import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const DataModal = ({ showDataModal, setShowDataModal, data, setData }) => {
  const [title, setTitle] = useState("");
  const [series, setSeries] = useState([]);
  const [newName, setNewName] = useState("");
  const [newItems, setNewItems] = useState([{ x: "", y: "" }]);

  useEffect(() => {
    if (data.length > 0) {
      const lastData = data[data.length - 1];
      setTitle(lastData.title);
      setSeries(lastData.series);
    }
  }, [data]);

  const handleSaveData = () => {
    const newData = {
      title: title,
      series: series,
    };

    setData([...data, newData]);
    setTitle("");
    setSeries([]);
    setShowDataModal(false);
  };

  const handleAddItem = () => {
    setNewItems([...newItems, { x: "", y: "" }]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...newItems];
    updatedItems[index][field] = value;
    setNewItems(updatedItems);
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

  return (
    <Modal show={showDataModal} onHide={handleClose}>
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

        <h3>Series</h3>
        {series.map((seriesItem, seriesIndex) => (
          <div key={seriesIndex} className="series-item">
            <h5>Series Name: {seriesItem.name}</h5>
            {seriesItem.data.map((item, itemIndex) => (
              <div key={itemIndex} className="item">
                <div className="form-group">
                  <label htmlFor={`x-${seriesIndex}-${itemIndex}`}>X</label>
                  <input
                    type="text"
                    id={`x-${seriesIndex}-${itemIndex}`}
                    value={item.x}
                    onChange={(e) =>
                      handleItemChange(itemIndex, "x", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`y-${seriesIndex}-${itemIndex}`}>Y</label>
                  <input
                    type="text"
                    id={`y-${seriesIndex}-${itemIndex}`}
                    value={item.y}
                    onChange={(e) =>
                      handleItemChange(itemIndex, "y", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ))}

        <h3>Add New Name</h3>
        <div className="form-group">
          <label htmlFor="newName">Name</label>
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
              <label htmlFor={`new-x-${index}`}>X</label>
              <input
                type="text"
                id={`new-x-${index}`}
                value={item.x}
                onChange={(e) => handleItemChange(index, "x", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`new-y-${index}`}>Y</label>
              <input
                type="text"
                id={`new-y-${index}`}
                value={item.y}
                onChange={(e) => handleItemChange(index, "y", e.target.value)}
              />
            </div>
          </div>
        ))}
        <Button variant="secondary" onClick={handleAddItem}>
          Add Item
        </Button>
        <Button variant="secondary" onClick={handleAddNewName}>
          Add New Name
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
