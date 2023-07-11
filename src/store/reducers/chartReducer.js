// redux/reducers.js
import { SET_CHART_ID } from "../action/chartAction";

const initialState = {
  chartId: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CHART_ID:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
}
