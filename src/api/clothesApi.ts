//Original api given:
// export const API_URL =
//   "https://f32cf30e-6939-45f6-b650-40d5b43dc7f1.mock.pstmn.io/clothes";

import axios from "axios";
import { ClothingItemType } from "../constants/types";

const clothesApi = axios.create({
  baseURL: "http://localhost:5173",
});

//Mock data:
export const API_URL =
  "https://run.mocky.io/v3/791aa2d3-3f64-48d2-ab78-1a6cbb49efe1";

export const fetchClothes = async (): Promise<ClothingItemType[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching clothing items:", error);
    return [];
  }
};
