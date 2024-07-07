import axios from "axios";
import { ClothingItemType } from "../constants/types";

export const API_URL =
  "https://f32cf30e-6939-45f6-b650-40d5b43dc7f1.mock.pstmn.io/clothes";

export const fetchClothes = async (): Promise<ClothingItemType[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching clothing items:", error);
    return [];
  }
};
