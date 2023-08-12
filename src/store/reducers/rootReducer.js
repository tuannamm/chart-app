import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

import chartReducer from "./chartReducer";
import chartDataReducer from "./chartDataReducer";

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const chartConfig = {
  ...commonConfig,
  key: "chart",
};

const rootReducer = combineReducers({
  chartReducer: persistReducer(chartConfig, chartReducer),
  chartDataReducer: persistReducer(chartConfig, chartDataReducer),
});

export default rootReducer;
