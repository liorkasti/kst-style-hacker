import { ClothingItemType } from "../constants/types";
import { sizeMapping, colorCombination } from "../constants/recommendations";

export const getRecommendations = (
  selectedItem: ClothingItemType,
  allItems: ClothingItemType[]
): ClothingItemType[] => {
  if (!allItems) return [];

  const recommendedItems: ClothingItemType[] = [];

  // Step 1: Recommend based on size
  const sizeRecommendations =
    sizeMapping[selectedItem.type]?.[selectedItem.size];
  if (sizeRecommendations) {
    const sizeFilteredItems = allItems.filter((item) =>
      sizeRecommendations.includes(item.size)
    );
    recommendedItems.push(...sizeFilteredItems);
  }

  // Step 2: Recommend based on color
  const colorRecommendations = colorCombination[selectedItem.color];
  if (colorRecommendations) {
    const colorFilteredItems = allItems.filter((item) =>
      colorRecommendations.includes(item.color)
    );
    recommendedItems.push(...colorFilteredItems);
  }

  // Remove duplicates
  const uniqueRecommendedItems = Array.from(new Set(recommendedItems));

  // Exclude the selected item itself
  return uniqueRecommendedItems.filter((item) => item.id !== selectedItem.id);
};

export const getNextType = (currentType: string): string => {
  const types = ["shoes", "shirts", "pants"];
  const currentIndex = types.indexOf(currentType);
  return types[(currentIndex + 1) % types.length];
};
