import { sizeMapping, colorCombination } from "../constants/recommendations";
import { ClothingItemType } from "../constants/types";

export const getRecommendations = (
  selectedItem: ClothingItemType,
  clothingItems: ClothingItemType[]
): ClothingItemType[] => {
  if (!clothingItems) return [];
  const recommendedItems: ClothingItemType[] = [];
  if (selectedItem) {
    // Step 1: Recommend based on size
    const sizeRecommendations =
      sizeMapping[selectedItem.type]?.[selectedItem.size];

    if (sizeRecommendations) {
      const sizeFilteredItems = clothingItems.filter(
        (item) =>
          sizeRecommendations.includes(item.size.toString()) &&
          item.type !== selectedItem.type
      );
      recommendedItems.push(...sizeFilteredItems);
    }

    // Step 2: Recommend based on color
    const colorRecommendations = colorCombination[selectedItem.color];
    if (colorRecommendations) {
      const colorFilteredItems = recommendedItems.filter(
        (item) =>
          colorRecommendations.includes(item.color.toString()) &&
          item.type !== selectedItem.type
      );
      recommendedItems.push(...colorFilteredItems);
    }
    const uniqueRecommendedItems = Array.from(new Set(recommendedItems));

    return uniqueRecommendedItems;
  }
  return recommendedItems;
};
