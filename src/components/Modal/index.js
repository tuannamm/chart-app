import DataModal from "./dataModal";
import LineModal from "./lineModal";
import MixedModal from "./mixedModal";
import PineModal from "./pieModal";

const ModalSelector = ({
  chartId,
  showDataModal,
  setShowDataModal,
  data,
  setData,
  selectedDataIndex,
}) => {
  switch (chartId) {
    case 1:
    case 2:
      return (
        <LineModal
          showDataModal={showDataModal}
          setShowDataModal={setShowDataModal}
          data={data}
          setData={setData}
          selectedIndex={selectedDataIndex}
        />
      );
    case 3:
    case 6:
      return (
        <DataModal
          showDataModal={showDataModal}
          setShowDataModal={setShowDataModal}
          data={data}
          setData={setData}
          selectedDataIndex={selectedDataIndex}
        />
      );
    case 4:
      return (
        <PineModal
          showDataModal={showDataModal}
          setShowDataModal={setShowDataModal}
          data={data}
          setData={setData}
          selectedIndex={selectedDataIndex}
        />
      );
    case 5:
      return (
        <MixedModal
          showDataModal={showDataModal}
          setShowDataModal={setShowDataModal}
          data={data}
          setData={setData}
          selectedDataIndex={selectedDataIndex}
        />
      );
    default:
      return null;
  }
};

export default ModalSelector;
