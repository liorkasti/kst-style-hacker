export type FilterType = "shirtSize" | "color" | "shoesSize";
export type ShirtSizeType = "S" | "M" | "L" | "XL" | "XXL";
export type PantsSizeType =
  | "28"
  | "29"
  | "30"
  | "31"
  | "32"
  | "33"
  | "34"
  | "35"
  | "36"
  | "37"
  | "38"
  | "39"
  | "40"
  | "41"
  | "42";

export type ShoesSizeType =
  | "35"
  | "36"
  | "37"
  | "38"
  | "39"
  | "40"
  | "41"
  | "42"
  | "43"
  | "44"
  | "45"
  | "46"
  | "47"
  | "48";
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
