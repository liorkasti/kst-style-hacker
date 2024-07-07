import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClothingItemType } from "../../constants/types";

interface ClothesState {
  items: ClothingItemType[];
  filteredItems: ClothingItemType[];
  selected: ClothingItemType[];
  shoesCount: number;
  shirtsCount: number;
  pantsCount: number;
}

const initialState: ClothesState = {
  items: [],
  filteredItems: [],
  selected: [],
  shoesCount: 0,
  shirtsCount: 0,
  pantsCount: 0,
};

const clothesSlice = createSlice({
  name: "clothes",
  initialState,
  reducers: {
    setClothes: (state, action: PayloadAction<ClothingItemType[]>) => {
      state.items = action.payload;
      state.shoesCount = action.payload.filter(
        (item) => item.type === "shoes"
      ).length;
      state.shirtsCount = action.payload.filter(
        (item) => item.type === "shirt"
      ).length;
      state.pantsCount = action.payload.filter(
        (item) => item.type === "pants"
      ).length;
    },
    setFilteredClothes: (state, action: PayloadAction<ClothingItemType[]>) => {
      state.filteredItems = action.payload;
    },
    selectClothes: (state, action: PayloadAction<ClothingItemType>) => {
      state.selected.push(action.payload);
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearSelection: (state) => {
      state.selected = [];
    },
  },
});

export const {
  setClothes,
  setFilteredClothes,
  selectClothes,
  clearSelection,
  shoesCount,
  shirtsCount,
  pantsCount,
} = clothesSlice.actions;
export default clothesSlice.reducer;
