import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

import chartReducer from "./chartReducer";

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2, // do sau merge cua storage
};

const authConfig = {
  ...commonConfig,
  key: "auth",
  whitelist: ["isLoggedIn", "accessToken"], // chon state cua reducer de luu vao storage
  // blacklist: ["isLoggedIn", "token"], // chon state cua reducer de khong luu vao storage
  // neu khong co whitelist va blacklist thi se luu tat ca state cua reducer vao storage
};

const chartConfig = {
  ...commonConfig,
  key: "chart",
};

const rootReducer = combineReducers({
  chartReducer: persistReducer(chartConfig, chartReducer),
});

export default rootReducer;
