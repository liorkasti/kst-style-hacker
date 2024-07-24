import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { fetchClothes } from "../api/clothesApi";
import { ClothingItemType } from "../constants/types";
import { CLOTHING_ITEMS } from "../react-query/query-keys";
import { RootState } from "../store";
import { setClothes } from "../store/slices/clothes-slice";

export const useClothesTypeItems = (type: string) => {
  const dispatch = useDispatch();
  const fallback: ClothingItemType[] = [];
  const { items } = useSelector((state: RootState) => state.clothes);

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
    select: (data) => {
      if (type === "") return data;
      const filtered = data.filter((item) => item.type === type);
      return filtered;
    },
  });
  if (isSuccess && !items.length) {
    dispatch(setClothes(data));
  }
  return {
    data: data as ClothingItemType[],
    isError,
    isLoading,
    isFetching,
    error,
  };
};
