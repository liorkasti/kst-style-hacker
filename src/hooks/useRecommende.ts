import { sizeMapping, colorCombination } from "../constants/recommendations";
import { ClothingItemType } from "../constants/types";

export const getRecommendations = (
  selectedItem: ClothingItemType,
  clothingItems: ClothingItemType[]
): ClothingItemType[] => {
  if (!clothingItems) return [];

  const recommendedItems: ClothingItemType[] = [];
  const selectedType = selectedItem.type;

  // Step 1: Recommend based on size
  const sizeRecommendations = sizeMapping[selectedType]?.[selectedItem.size];
  if (sizeRecommendations) {
    const sizeFilteredItems = clothingItems.filter(
      (item) =>
        sizeRecommendations.includes(item.size) && item.type !== selectedType
    );
    recommendedItems.push(...sizeFilteredItems);
  }

  // Step 2: Recommend based on color
  const colorRecommendations = colorCombination[selectedItem.color];
  if (colorRecommendations) {
    const colorFilteredItems = clothingItems.filter(
      (item) =>
        colorRecommendations.includes(item.color) && item.type !== selectedType
    );
    recommendedItems.push(...colorFilteredItems);
  }

  const uniqueRecommendedItems = Array.from(new Set(recommendedItems));

  return uniqueRecommendedItems.filter((item) => item.id !== selectedItem.id);
};

export const getNextType = (currentType: string): string => {
  const types = ["shoes", "shirt", "pants"];
  const currentIndex = types.indexOf(currentType);
  return currentIndex >= 0 && currentIndex < types.length - 1
    ? types[currentIndex + 1]
    : types[0];
};
