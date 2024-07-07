import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClothingItemType } from "../../constants/types";

interface ClothesState {
  items: ClothingItemType[];
  filteredItems: ClothingItemType[];
  selected: ClothingItemType[];
}

const initialState: ClothesState = {
  items: [],
  filteredItems: [],
  selected: [],
};

const clothesSlice = createSlice({
  name: "clothes",
  initialState,
  reducers: {
    setClothes: (state, action: PayloadAction<ClothingItemType[]>) => {
      state.items = action.payload;
    },
    setFilteredClothes: (state, action: PayloadAction<ClothingItemType[]>) => {
      state.filteredItems = action.payload;
    },
    filtereClothes: (state, action: PayloadAction<ClothingItemType[]>) => {
      state.filteredItems = action.payload;
    },
    selectClothes: (state, action: PayloadAction<ClothingItemType>) => {
      state.selected = [...state.selected, action.payload];
    },
    clearSelection: (state) => {
      state.selected = [];
    },
  },
});

export const {
  setClothes,
  setFilteredClothes,
  filtereClothes,
  selectClothes,
  clearSelection,
} = clothesSlice.actions;
export default clothesSlice.reducer;
