// hooks/useChartData.js
import { useSelector } from "react-redux";

export const useChartData = () => {
  const chartData = useSelector((state) => state.chartData); // Adjust this to match your actual state shape
  return chartData;
};
