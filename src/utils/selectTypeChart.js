const typeChart = (chartId) => {
  switch (chartId) {
    case 1:
      return "line";
    case 2:
      return "area";
    case 3:
      return "bar";
    case 4:
      return "pie";
    case 5:
      return "mixed";
    default:
      return;
  }
};

export default typeChart;
