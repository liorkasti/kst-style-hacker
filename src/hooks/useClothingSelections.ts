import { ClothingItemType } from "../constants/types";

export const useClothingSelections = (selected: ClothingItemType[]) => {
  const hasShoes = selected.some((i) => i.type === "shoes");
  const hasShirt = selected.some((i) => i.type === "shirt");
  const hasPants = selected.some((i) => i.type === "pants");

  return {
    selected,
    hasShoes,
    hasShirt,
    hasPants,
  };
};
