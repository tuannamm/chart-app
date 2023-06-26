import React, { useState } from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import constant from "../../../utils/constant";
import "./dataModal.scss";

const DataModal = (props) => {
  const { showDataModal, setShowDataModal, setData } = props;
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [dataLabel, setDataLabel] = useState([]);

  const inputArr = [
    {
      type: "text",
      label: "Label",
    },
    {
      type: "text",
      label: "Data",
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = (e) => {
    e.preventDefault();
    setArr((s) => {
      return [
        ...s,
        {
          type: "text",
          label: "Label",
        },
        {
          type: "text",
          label: "Data",
        },
      ];
    });
  };

  const addLabel = (e) => {
    setCategories([...categories, e]);
  };

  const addDataLabel = (e) => {
    setDataLabel([...dataLabel, e]);
  };

  const handleSave = () => {
    setData({
      title,
      name,
      categories,
      dataLabel,
    });
    handleClose();
    toast.success("Created successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleClose = () => {
    setShowDataModal(false);
    setCategories([]);
    setDataLabel([]);
  };

  return (
    <>
      <Modal show={showDataModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`${constant.data}`.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">{constant.title}</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{constant.name}</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* <div className="col-md-6">
              <label className="form-label">Label</label>
              <input
                type="text"
                className="form-control"
                // value={label}
                // onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Data</label>
              <input
                type="text"
                className="form-control"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
              />
            </div> */}
            {arr.map((item, index) => {
              return (
                <div className="col-md-6">
                  <label className="form-label">{item.label}</label>
                  <input
                    className="form-control"
                    value={item.value}
                    id={index}
                    type={item.type}
                    onBlur={(e) => {
                      e.preventDefault();
                      item.label === "Label"
                        ? addLabel(e.target.value)
                        : addDataLabel(e.target.value);
                    }}
                  />
                </div>
              );
            })}
            <div>
              <button onClick={(e) => addInput(e)}>+</button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {constant.close}
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {constant.save_changes}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DataModal;
