const typeChart = (chartId) => {
  switch (chartId) {
    case 1:
      return "Line chart";
    case 2:
      return "Area chart";
    case 3:
      return "Column chart";
    case 4:
      return "Pie chart";
    case 5:
      return "Mixed chart";
    case 6:
      return "Tree map chart";
    default:
      return;
  }
};

export default typeChart;
