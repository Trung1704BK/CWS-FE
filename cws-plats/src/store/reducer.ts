import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import userReducer from "./userPage";
import rewardPageReducer from "./rewardPage";
import groupPageReducer from "./groupPage";
import lightBoxReducer from "./lightBox";

export const rootReducer = combineReducers({
  auth: authReducer,
  lightBox: lightBoxReducer,
  user: userReducer,
  rewardPage: rewardPageReducer,
  groupPage: groupPageReducer,
});
