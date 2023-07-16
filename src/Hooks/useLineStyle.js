import { useState } from "react";

const useLineStyle = (initialStyle) => {
  const [lineStyle, setLineStyle] = useState(initialStyle);

  const changeLineStyle = (newStyle) => {
    setLineStyle(newStyle);
  };

  const resetLineStyle = () => {
    setLineStyle(initialStyle);
  };

  return {
    lineStyle,
    changeLineStyle,
    resetLineStyle,
  };
};

export default useLineStyle;
