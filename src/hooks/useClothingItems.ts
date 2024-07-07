import { useQuery } from "@tanstack/react-query";
import { CLOTHING_ITEMS } from "../react-query/query-keys";
import { fetchClothes } from "../api/clothesApi";
import { ClothingItemType } from "../constants/types";

export const useClothingItems = () => {
  return useQuery({
    queryKey: [CLOTHING_ITEMS],
    queryFn: fetchClothes,
  });
};

export const useClothesTypeItems = (type: string) => {
  const fallback: ClothingItemType[] = [];
  const {
    isError,
    isLoading,
    isFetching,
    data = fallback,
    error,
    isSuccess,
  } = useQuery({
    queryKey: [CLOTHING_ITEMS, type],
    queryFn: fetchClothes,
  });
  if (isSuccess && type !== "") {
    const clothingTypeItems = data.filter((item) => item.type === type);
    return {
      data: clothingTypeItems as ClothingItemType[],
      isError,
      isLoading,
      isFetching,
      error,
    };
  }
  return {
    data: data as ClothingItemType[],
    isError,
    isLoading,
    isFetching,
    error: error as Error,
  };
};
