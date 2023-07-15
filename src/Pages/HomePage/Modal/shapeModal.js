import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ShapeModal = ({
  selectedShapeObject,
  shapeModalVisible,
  setShapeModalVisible,
  shapeStrokeWidth,
  setShapeStrokeWidth,
  shapeColor,
  setShapeColor,
  shapeLineStyle,
  setShapeLineStyle,
  canvasRef,
}) => {
  const getStrokeDashArray = (style) => {
    switch (style) {
      case "solid":
        return [];
      case "dashed":
        return [5, 5];
      case "dotted":
        return [1, 3];
      case "double":
        return [10, 5, 1, 5];
      default:
        return [];
    }
  };
  const handleModalSubmit = () => {
    if (selectedShapeObject) {
      const scaleFactor = shapeStrokeWidth / selectedShapeObject.strokeWidth;
      selectedShapeObject.set({ scaleX: scaleFactor, fill: shapeColor });
      selectedShapeObject.set({
        strokeDashArray: getStrokeDashArray(shapeLineStyle),
      });
      canvasRef.current.renderAll();
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
          <Form.Group controlId="shapeStrokeWidth">
            <Form.Label>Stroke Width</Form.Label>
            <Form.Control
              type="range"
              value={shapeStrokeWidth}
              onChange={(e) => setShapeStrokeWidth(e.target.value)}
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

          <Form.Group controlId="shapeLineStyle">
            <Form.Label>Line Style</Form.Label>
            <Form.Control
              as="select"
              value={shapeLineStyle}
              onChange={(e) => setShapeLineStyle(e.target.value)}
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
            </Form.Control>
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
