import { combineReducers } from "@reduxjs/toolkit";
import clothesReducer from "./slices/clothes-slice";

const rootReducer = combineReducers({
  clothes: clothesReducer,
});

export default rootReducer;
