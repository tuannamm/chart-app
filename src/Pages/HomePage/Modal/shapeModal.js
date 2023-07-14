import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ShapeModal = ({
  selectedShapeObject,
  shapeModalVisible,
  setShapeModalVisible,
  shapeWidth,
  setShapeWidth,
  shapeColor,
  setShapeColor,
  canvasRef,
}) => {
  const handleModalSubmit = () => {
    if (selectedShapeObject) {
      selectedShapeObject.set({ width: shapeWidth, fill: shapeColor });
      canvasRef.current.renderAll();
    }
    setShapeModalVisible(false);
  };
  return (
    <Modal show={shapeModalVisible} onHide={() => setShapeModalVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Shape</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="shapeWidth">
            <Form.Label>Width</Form.Label>
            <Form.Control
              type="number"
              value={shapeWidth}
              onChange={(e) => setShapeWidth(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="shapeColor">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="color"
              value={shapeColor}
              onChange={(e) => setShapeColor(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShapeModalVisible(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleModalSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShapeModal;
