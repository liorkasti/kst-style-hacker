import axios from "axios";
import { ClothingItemType } from "../constants/types";

//Original api given:
// export const API_URL =
//   "https://f32cf30e-6939-45f6-b650-40d5b43dc7f1.mock.pstmn.io/clothes";

//Mock data:
export const API_URL =
  "https://run.mocky.io/v3/6da54c38-8183-4abe-a621-252ab89c8c11";

// export const fetchClothes = createAsyncThunk(
//   "clothes/fetchClothes",
//   async () => {
//     const response = await axios.get(API_URL);
//     const data: ClothingItemType[] = await response.json();
//     return response.data;
//     return data;
//   }
// );
export const fetchClothes = async (): Promise<ClothingItemType[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching clothing items:", error);
    return [];
  }
};

export const fetchSavedOutfits = async () => {
  try {
    const response = await axios.get(`${API_URL}/saved-outfits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching saved outfits:", error);
    throw error;
  }
};
