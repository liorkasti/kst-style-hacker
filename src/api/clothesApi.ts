import axios from "axios";
import { ClothingItemType } from "../constants/types";

//Mock data:
export const API_URL =
  "https://run.mocky.io/v3/067e25c7-c865-4b09-b064-966b0dab4ed7";

export const fetchClothes = async (): Promise<ClothingItemType[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching clothing items:", error);
    return [];
  }
};

// const clothesApi = axios.create({
//   baseURL: "http://localhost:5173",
// });

// export const getItems = async () => {
//   const response = await clothesApi.get("/items");
//   return response.data;
// };

// export const addItem = async (item) => {
//   return await clothesApi.post("/clothing", item);
// };

// export const updateItem = async (item) => {
//   return await clothesApi.patch(`/clothing/${item.id}`, item);
// };

// export const deleteItem = async ({ id }) => {
//   return await clothesApi.delete(`/clothing/${id}`, id);
// };
