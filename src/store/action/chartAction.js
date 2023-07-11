export const SET_CHART_ID = "SET_CHART_ID";
export const SET_CHART_DATA = "SET_CHART_DATA";

const setChartId = (id) => ({
  type: SET_CHART_ID,
  payload: id,
});

const setChartData = (data) => ({
  type: SET_CHART_DATA,
  payload: data,
});

export { setChartId, setChartData };
