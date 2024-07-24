import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ClothesState,
  ClothingItemType,
  OutfitProps,
} from "../../constants/types";

const initialState: ClothesState = {
  item: {
    id: 0,
    type: "",
    brand: "",
    color: "",
    size: "",
  },
  items: [],
  filteredItems: [],
  recommendations: [],
  outfits: [],
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
    setItem: (state, action: PayloadAction<ClothingItemType>) => {
      state.item = action.payload;
    },
    selectClothes: (state, action: PayloadAction<ClothingItemType>) => {
      state.selected.push(action.payload);
      const { type, id } = action.payload;
      state.items = state.items?.filter((item) => item.id !== id);
      if (type === "shoes") state.shoesCount--;
      else if (type === "shirt") state.shirtsCount--;
      else if (type === "pants") state.pantsCount--;
    },
    setRecommendations: (state, action: PayloadAction<ClothingItemType[]>) => {
      state.recommendations = action.payload;
    },
    addToOutfit: (state, action: PayloadAction<OutfitProps>) => {
      state.outfits.push(action.payload);
    },
    deleteOutfit: (state, action: PayloadAction<string>) => {
      state.outfits = state.outfits.filter(
        (outfit) => outfit.id !== action.payload
      );
      state.shoesCount++;
      state.shirtsCount++;
      state.pantsCount++;
    },
    clearSelection: (state) => {
      state.selected = [];
    },
  },
});

export const {
  setClothes,
  setFilteredItems,
  setRecommendations,
  setItem,
  selectClothes,
  clearSelection,
  addToOutfit,
  deleteOutfit,
} = clothesSlice.actions;
export default clothesSlice.reducer;
