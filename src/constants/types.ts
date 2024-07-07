export interface UserProps {
  _id: string;
  email: string;
  password: string;
}

export type ClothingItemType = {
  id: string;
  type: string;
  brand: string;
  color: string;
  size: string;
};

export interface Outfit {
  shirt: ClothingItemType;
  pants: ClothingItemType;
  shoes: ClothingItemType;
  creationDate: string;
  creationTime: string;
}

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

export type SavedSetType = {
  setId: string;
  userId: string;
  type: string;
  items: ClothingItemType[];
  createdAt?: Date;
  is_set: boolean;
};

export type ClothingItemProps = {
  id: React.Key | null | undefined;
  item: ClothingItemType;
};

export interface ToggleClothingItemProps {
  data: SavedSetType[];
  addFavorite: (setId: SavedSetType) => void;
  removeFavorite: (setId: SavedSetType) => void;
  isLoading: boolean;
}
