import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import "./lineModal.scss";
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
  const [series, setSeries] = useState([
    { name: "", data: [{ x: "", y: "" }] },
  ]);
  const [labels, setLabels] = useState([""]);

  const handleNameChange = (seriesIndex, value) => {
    const updatedSeries = [...series];
    updatedSeries[seriesIndex].name = value;
    setSeries(updatedSeries);
  };

  const handleDataChange = (seriesIndex, dataIndex, field, value) => {
    const updatedSeries = [...series];
    updatedSeries[seriesIndex].data[dataIndex][field] = value;
    setSeries(updatedSeries);
  };

  const handleLabelChange = (labelIndex, value) => {
    const updatedLabels = [...labels];
    updatedLabels[labelIndex] = value;
    setLabels(updatedLabels);

    // Also update labels of series
    const updatedSeries = [...series];
    updatedSeries.forEach((serie) => {
      if (serie.data[labelIndex]) {
        serie.data[labelIndex].x = value;
      }
    });
    setSeries(updatedSeries);
  };

  const handleAddData = (seriesIndex) => {
    if (series[seriesIndex].data.length < labels.length) {
      const updatedSeries = [...series];
      updatedSeries[seriesIndex].data.push({
        x: labels[updatedSeries[seriesIndex].data.length] || "",
        y: "",
      });
      setSeries(updatedSeries);
    } else {
      alert("Cannot add more data points than labels");
    }
  };

  const handleAddSeries = () => {
    const newSeriesData = labels.map((label, index) => ({
      x: label,
      y: index === 0 ? "" : series[0].data[index].y,
    }));
    setSeries([...series, { name: "", data: newSeriesData }]);
  };

  const handleAddLabel = () => {
    setLabels([...labels, ""]);
    const updatedSeries = [...series];
    updatedSeries.forEach((serie) => {
      serie.data.push({ x: "", y: "" });
    });
    setSeries(updatedSeries);
  };

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
      setData([...data, newData]);
    }

    dispatch(setChartData([newData]));
    setShowDataModal(false);
  };

  const handleClose = () => {
    setShowDataModal(false);
  };

  const handleRemoveSeries = (seriesIndex) => {
    const updatedSeries = [...series];
    updatedSeries.splice(seriesIndex, 1);
    setSeries(updatedSeries);
  };

  const handleRemoveData = (seriesIndex, dataIndex) => {
    const updatedSeries = [...series];
    updatedSeries[seriesIndex].data.splice(dataIndex, 1);
    setSeries(updatedSeries);

    const updatedLabels = [...labels];
    updatedLabels.splice(dataIndex, 1);
    setLabels(updatedLabels);
  };

  const handleRemoveLabel = (labelIndex) => {
    const updatedLabels = [...labels];
    updatedLabels.splice(labelIndex, 1);
    setLabels(updatedLabels);

    // Also remove corresponding data from series
    const updatedSeries = [...series];
    updatedSeries.forEach((serie) => {
      if (serie.data[labelIndex]) {
        serie.data.splice(labelIndex, 1);
      }
    });
    setSeries(updatedSeries);
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
      setLabels(selectedData.series[0].data.map(({ x }) => x));
    }
  }, [data, selectedDataIndex, showDataModal]);

  return (
    <Modal show={showDataModal} onHide={handleClose} className="line-modal">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">DATA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-group">
          <label htmlFor="title" className="input-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="Chart title"
          />
        </div>

        <h3>Labels</h3>
        {labels.map((label, labelIndex) => (
          <div key={`label-${labelIndex}`} className="input-group">
            <input
              type="text"
              value={label}
              onChange={(e) => handleLabelChange(labelIndex, e.target.value)}
              className="input-field"
              placeholder={`Label ${labelIndex + 1}`}
            />
            <AiOutlineDelete
              className="icons-remove"
              onClick={() => handleRemoveLabel(labelIndex)}
            />
          </div>
        ))}
        <Button variant="primary" onClick={handleAddLabel} className="ml-3">
          Add Label
        </Button>

        <h3>Series</h3>
        {series.map((serie, seriesIndex) => (
          <div
            key={`series-${seriesIndex}`}
            className="input-group serie-group"
          >
            <div className="input-group">
              <input
                type="text"
                value={serie.name}
                onChange={(e) => handleNameChange(seriesIndex, e.target.value)}
                className="input-field"
                placeholder={`Series ${seriesIndex + 1} Name`}
              />
              <AiOutlineDelete
                className="icons-remove"
                onClick={() => handleRemoveSeries(seriesIndex)}
              />
            </div>

            {serie.data.map((dataPoint, dataIndex) => (
              <div key={`data-${dataIndex}`} className="input-group">
                <input
                  type="number"
                  value={dataPoint.y}
                  onChange={(e) =>
                    handleDataChange(
                      seriesIndex,
                      dataIndex,
                      "y",
                      e.target.value
                    )
                  }
                  className="input-field"
                  placeholder={`Data ${dataIndex + 1}`}
                />
                <AiOutlineDelete
                  className="icons-remove"
                  onClick={() => handleRemoveData(seriesIndex, dataIndex)}
                />
              </div>
            ))}

            <Button
              variant="primary"
              onClick={() => handleAddData(seriesIndex)}
              className="ml-3"
            >
              Add Data
            </Button>
          </div>
        ))}

        <Button variant="primary" onClick={handleAddSeries} className="ml-3">
          Add Series
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveData}>
          Save Data
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DataModal;
