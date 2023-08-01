import React, { memo } from "react";
import { Modal, Button } from "react-bootstrap";

import ChartPropertiesControl from "../ChartProperties";

import constant from "../../utils/constant";

const ChartPropertiesModal = ({
  properties,
  onPropertiesChange,
  showPropertyModal,
  setShowPropertyModal,
  setData,
  setLineStyle,
}) => {
  const handleClose = () => {
    setShowPropertyModal(false);
  };
  return (
    <Modal
      show={showPropertyModal}
      onHide={handleClose}
      className="chart-properties-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Chart Properties</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ChartPropertiesControl
          properties={properties}
          onPropertiesChange={onPropertiesChange}
          setData={setData}
          setLineStyle={setLineStyle}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {constant.close}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(ChartPropertiesModal);
