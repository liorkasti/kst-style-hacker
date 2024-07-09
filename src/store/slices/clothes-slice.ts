import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ClothingItemType, ClothesState } from "../../constants/types";
import axios from "axios";
import { API_URL } from "../../api/clothesApi";

const initialState: ClothesState = {
  items: [],
  filteredItems: [],
  selected: [],
  shoesCount: 0,
  shirtsCount: 0,
  pantsCount: 0,
};

export const fetchClothes = createAsyncThunk(
  "clothes/fetchClothes",
  async () => {
    const response = await axios.get(API_URL);
    // const data: ClothingItemType[] = await response.json();
    console.log("dataaaaa", response.data);
    return response.data;
    // return data;
  }
);

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
    deleteOutfit: (state, action: PayloadAction<ClothingItemType>) => {
      state.selected = state.selected.filter(
        (outfit) => outfit.id !== action.payload.id
      );
      state.items.push(action.payload);
    },
    clearSelection: (state) => {
      state.selected = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClothes.fulfilled, (state, action) => {
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
    });
  },
});

export const {
  setClothes,
  setFilteredClothes,
  selectClothes,
  deleteOutfit,
  clearSelection,
} = clothesSlice.actions;
export default clothesSlice.reducer;
