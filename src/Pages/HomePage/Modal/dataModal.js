import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const DataModal = ({ showDataModal, setShowDataModal, data, setData }) => {
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [items, setItems] = useState([{ x: "", y: "" }]);

  const handleSaveData = () => {
    const newData = {
      title: title,
      series: [
        {
          label: label,
          data: items,
        },
      ],
    };

    // Clear input fields and close the modal
    setTitle("");
    setLabel("");
    setItems([{ x: "", y: "" }]);

    // Update the data state with the new array
    // data?.push(newData);

    data.push(newData);
    setData([...data]);

    // Close the modal
    setShowDataModal(false);
  };

  const handleAddItem = () => {
    setItems([...items, { x: "", y: "" }]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleClose = () => {
    setShowDataModal(false);
  };

  return (
    <Modal show={showDataModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="label">Label</label>
          <input
            type="text"
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <h3>Items</h3>
        {items.map((item, index) => (
          <div key={index} className="item">
            <div className="form-group">
              <label htmlFor={`x-${index}`}>X</label>
              <input
                type="text"
                id={`x-${index}`}
                value={item.x}
                onChange={(e) => handleItemChange(index, "x", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`y-${index}`}>Y</label>
              <input
                type="text"
                id={`y-${index}`}
                value={item.y}
                onChange={(e) => handleItemChange(index, "y", e.target.value)}
              />
            </div>
          </div>
        ))}
        <Button variant="secondary" onClick={handleAddItem}>
          Add Item
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveData}>
          Save
        </Button>
        <Button variant="secondary" onClick={() => setShowDataModal(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DataModal;
