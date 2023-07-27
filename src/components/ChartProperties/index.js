import React, { memo } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

import GroupButton from "../ButtonGroup";

import icons from "../../utils/icons";
import "./chartProperties.scss";

const { AiOutlineClear } = icons;

const ChartPropertiesControl = ({
  properties,
  onPropertiesChange,
  setData,
  chartId,
  setLineStyle,
}) => {
  return (
    <div className="form">
      {chartId === 1 || chartId === 2 || chartId === 5 ? (
        <GroupButton setLineStyle={setLineStyle} />
      ) : null}
      <Form>
        <Row>
          <Col>
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
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <Form.Group
              controlId="chartBackgroundColor"
              className="form-group "
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
            <Form.Group controlId="chartFontSize" className="form-group ">
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
            <Form.Group controlId="chartFontColor" className="form-group ">
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
            <Form.Group controlId="colorPalette" className="form-group ">
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
            <Form.Group controlId="strokeWidth" className="form-group ">
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
                <AiOutlineClear className="icons text" /> Refresh data
              </span>
              <span>
                <AiOutlineClear className="icons text" />
              </span>
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default memo(ChartPropertiesControl);
