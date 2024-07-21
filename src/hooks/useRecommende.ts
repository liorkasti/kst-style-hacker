import { sizeMapping, colorCombination } from "../constants/recommendations";
import { ClothesTypesType, ClothingItemType } from "../constants/types";

export const getRecommendations = (
  selectedItem: ClothingItemType,
  clothingItems: ClothingItemType[]
): ClothingItemType[] => {
  if (!clothingItems) return [];

  const recommendedItems: ClothingItemType[] = [];

  // Step 1: Recommend based on size
  const sizeRecommendations =
    sizeMapping[selectedItem.type]?.[selectedItem.size];
  if (sizeRecommendations) {
    const sizeFilteredItems = clothingItems.filter((item) =>
      sizeRecommendations.includes(item.size)
    );
    recommendedItems.push(...sizeFilteredItems);
  }

  // Step 2: Recommend based on color
  const colorRecommendations = colorCombination[selectedItem.color];
  if (colorRecommendations) {
    const colorFilteredItems = clothingItems.filter((item) =>
      colorRecommendations.includes(item.color)
    );
    recommendedItems.push(...colorFilteredItems);
  }

  const uniqueRecommendedItems = Array.from(new Set(recommendedItems));

  return uniqueRecommendedItems.filter((item) => item.id !== selectedItem.id);
};

// קבלת מידות מומלצות לפי סוגים שונים
export function getRecommendedSizes(type: string, size: string): string[] {
  const sizeTypeMapping = sizeMapping[type];
  if (!sizeTypeMapping || !sizeTypeMapping[size]) return [];
  return Object.values(sizeTypeMapping[size]);
}
// קבלת צבעים מומלצים
export function getRecommendedColors(color: string): string[] {
  return colorCombination[color] || [];
}

export const getNextType = (currentType: string): string => {
  const types = ["shoes", "shirt", "pants"];
  const currentIndex = types.indexOf(currentType);
  return currentIndex >= 0 && currentIndex < types.length - 1
    ? types[currentIndex + 1]
    : types[0];
};
