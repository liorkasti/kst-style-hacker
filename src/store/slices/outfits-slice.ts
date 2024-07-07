import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Outfit } from "../../constants/types";

interface OutfitsState {
  savedOutfits: Outfit[];
}

const initialState: OutfitsState = {
  savedOutfits: [],
};

const outfitsSlice = createSlice({
  name: "outfits",
  initialState,
  reducers: {
    saveOutfit: (state, action: PayloadAction<Outfit>) => {
      state.savedOutfits.push(action.payload);
    },
    deleteOutfit: (state, action: PayloadAction<number>) => {
      state.savedOutfits = state.savedOutfits.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});

export const { saveOutfit, deleteOutfit } = outfitsSlice.actions;
export default outfitsSlice.reducer;
