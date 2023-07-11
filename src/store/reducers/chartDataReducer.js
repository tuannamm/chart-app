const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_CHART_DATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
