import React, { memo } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import GroupButton from "../ButtonGroup";

import icons from "../../utils/icons";
import constant from "../../utils/constant";
import "./propertiesModal.scss";

const { AiOutlineClear } = icons;

const ChartPropertiesModal = ({
  properties,
  onPropertiesChange,
  showPropertyModal,
  setShowPropertyModal,
  setData,
  setLineStyle,
}) => {
  const chartId = useSelector((state) => state?.chartReducer);

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
        <div className="form">
          <Form>
            <Row>
              <Col>
                {chartId.id === 1 || chartId.id === 2 || chartId.id === 5 ? (
                  <div style={{ marginBottom: "1rem" }}>
                    <GroupButton setLineStyle={setLineStyle} />
                  </div>
                ) : null}
                <Form.Group controlId="showGrid">
                  <Form.Switch
                    id="showGrid"
                    label="Show Grid"
                    checked={properties.showGrid}
                    onChange={(event) =>
                      onPropertiesChange({
                        ...properties,
                        showGrid: event.target.checked,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="showGridRow">
                  <Form.Switch
                    id="showGridRow"
                    label="Show Row"
                    checked={properties.showGridRow}
                    onChange={(event) =>
                      onPropertiesChange({
                        ...properties,
                        showGridRow: event.target.checked,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="enableZoom">
                  <Form.Switch
                    id="enableZoom"
                    label="Enable Zoom"
                    checked={properties.enableZoom}
                    onChange={(event) =>
                      onPropertiesChange({
                        ...properties,
                        enableZoom: event.target.checked,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="showAnimations">
                  <Form.Switch
                    id="showAnimations"
                    label="Enable Animations"
                    checked={properties.showAnimations}
                    onChange={(event) =>
                      onPropertiesChange({
                        ...properties,
                        showAnimations: event.target.checked,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="showTooltip">
                  <Form.Switch
                    id="showTooltip"
                    label="Show Tooltip"
                    checked={properties.showTooltip}
                    onChange={(event) =>
                      onPropertiesChange({
                        ...properties,
                        showTooltip: event.target.checked,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="showLegend">
                  <Form.Switch
                    id="showLegend"
                    label="Show Legend"
                    checked={properties.showLegend}
                    onChange={(event) =>
                      onPropertiesChange({
                        ...properties,
                        showLegend: event.target.checked,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="showDataLabels">
                  <Form.Switch
                    id="showDataLabels"
                    label="Show Data Labels"
                    checked={properties.showDataLabels}
                    onChange={(event) =>
                      onPropertiesChange({
                        ...properties,
                        showDataLabels: event.target.checked,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  controlId="chartBackgroundColor"
                  className="form-group"
                >
                  <Form.Label>Background Color</Form.Label>
                  <Form.Control
                    type="color"
                    value={properties.chartBackgroundColor || "#ffffff"}
                    onChange={(event) =>
                      onPropertiesChange({
                        ...properties,
                        chartBackgroundColor: event.target.value,
                      })
                    }
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group controlId="chartFontSize" className="form-group">
                  <Form.Label>Font Size</Form.Label>
                  <Form.Control
                    type="number"
                    value={properties.chartFontSize || 12}
                    onChange={(event) =>
                      onPropertiesChange({
                        ...properties,
                        chartFontSize: event.target.value,
                      })
                    }
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group controlId="chartFontColor" className="form-group">
                  <Form.Label>Font Color</Form.Label>
                  <Form.Control
                    type="color"
                    value={properties.chartFontColor || "#000000"}
                    onChange={(event) =>
                      onPropertiesChange({
                        ...properties,
                        chartFontColor: event.target.value,
                      })
                    }
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group controlId="colorPalette" className="form-group">
                  <Form.Label>Color Palette</Form.Label>
                  <Form.Control
                    as="select"
                    value={properties.colorPalette}
                    onChange={(event) =>
                      onPropertiesChange({
                        ...properties,
                        colorPalette: event.target.value,
                      })
                    }
                    className="form-control"
                  >
                    <option value="palette1">Palette 1</option>
                    <option value="palette2">Palette 2</option>
                    <option value="palette3">Palette 3</option>
                    <option value="palette4">Palette 4</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="strokeWidth" className="form-group">
                  <Form.Label>
                    Stroke Width: {properties.strokeWidth || 2}
                  </Form.Label>
                  <Form.Control
                    type="range"
                    min="1"
                    max="10"
                    value={properties.strokeWidth || 2}
                    onChange={(event) =>
                      onPropertiesChange({
                        ...properties,
                        strokeWidth: event.target.value,
                      })
                    }
                    className="form-control"
                  />
                </Form.Group>
                <Button onClick={() => setData([])}>
                  <span>
                    <AiOutlineClear className="icons text" />{" "}
                    {constant.refresh_data}
                  </span>
                  <span>
                    <AiOutlineClear className="icons text" />
                  </span>
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
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
