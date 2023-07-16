import { useState } from "react";

const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDataIndex, setSelectedDataIndex] = useState(null);

  const handleShowModal = (index) => {
    setSelectedDataIndex(index);
    setIsModalVisible(true);
  };

  const handleHideModal = () => {
    setSelectedDataIndex(null);
    setIsModalVisible(false);
  };

  return {
    isModalVisible,
    handleShowModal,
    handleHideModal,
    selectedDataIndex,
    setSelectedDataIndex,
  };
};

export default useModal;
