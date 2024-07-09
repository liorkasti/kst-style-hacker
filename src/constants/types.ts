export type FilterType = "shirtSize" | "color" | "shoesSize";
export type SizeType = "S" | "M" | "L" | "XL" | "XXL";
export type ShoesSizeType =
  | "38"
  | "39"
  | "40"
  | "41"
  | "42"
  | "43"
  | "44"
  | "45"
  | "46";
export type ColorType = "Red" | "Blue" | "Black" | "White" | "Green";

export type ClothingItemType = {
  id: number;
  type: string;
  brand: string;
  color: string;
  size: string;
};

export interface ClothesState {
  items: ClothingItemType[];
  filteredItems: ClothingItemType[];
  selected: ClothingItemType[];
  shoesCount: number;
  shirtsCount: number;
  pantsCount: number;
}

export interface Outfit {
  id: string;
  items: ClothingItemType[];
  creationDate: string;
  creationTime: string;
}

export type ClothingItemProps = {
  id: number;
  item: ClothingItemType;
};
