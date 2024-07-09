import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClothesState, ClothingItemType } from "../../constants/types";

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
        (item: { type: string }) => item.type === "shoes"
      ).length;
      state.shirtsCount = action.payload.filter(
        (item: { type: string }) => item.type === "shirt"
      ).length;
      state.pantsCount = action.payload.filter(
        (item: { type: string }) => item.type === "pants"
      ).length;
    },
    setFilteredItems: (state, action: PayloadAction<string>) => {
      state.filteredItems = state.items.filter(
        (item) => item.type === action.payload
      );
    },
    selectClothes: (state, action: PayloadAction<ClothingItemType>) => {
      state.selected.push(action.payload);
      state.items = state.items?.filter(
        (item) => item.id !== action.payload.id
      );
      if (action.payload.type === "shoes") state.shoesCount--;
      else if (action.payload.type === "shirt") state.shirtsCount--;
      else if (action.payload.type === "pants") state.pantsCount--;
    },
    deleteOutfit: (state, action: PayloadAction<ClothingItemType>) => {
      state.selected = state.selected.filter(
        (outfit) => outfit.id !== action.payload.id
      );
      state.items?.push(action.payload);
    },
    clearSelection: (state) => {
      state.selected = [];
    },
    addItemsBack: (state, action: PayloadAction<ClothingItemType[]>) => {
      state.items = [...state.items, ...action.payload];
      action.payload.forEach((item) => {
        if (item.type === "shoes") state.shoesCount++;
        else if (item.type === "shirt") state.shirtsCount++;
        else if (item.type === "pants") state.pantsCount++;
      });
    },
  },
});

export const {
  setClothes,
  filteredItems,
  setFilteredItems,
  selectClothes,
  deleteOutfit,
  clearSelection,
} = clothesSlice.actions;
export default clothesSlice.reducer;
