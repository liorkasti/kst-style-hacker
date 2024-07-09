import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Outfit } from "../../constants/types";

interface OutfitsState {
  outfits: Outfit[];
}

const initialState: OutfitsState = {
  outfits: [],
};

const outfitsSlice = createSlice({
  name: "outfits",
  initialState,
  reducers: {
    addToOutfit: (state, action: PayloadAction<Outfit>) => {
      state.outfits.push(action.payload);
    },
    deleteOutfit: (state, action: PayloadAction<string>) => {
      state.outfits = state.outfits.filter(
        (outfit) => outfit.id !== action.payload
      );
    },
  },
});

export const { addToOutfit, deleteOutfit } = outfitsSlice.actions;
export default outfitsSlice.reducer;
