import { combineReducers } from "@reduxjs/toolkit";
import clothesReducer from "./slices/clothes-slice";
// import outfitsReducer from "./slices/outfits-slice";

const rootReducer = combineReducers({
  clothes: clothesReducer,
  // outfits: outfitsReducer,
});

export default rootReducer;
