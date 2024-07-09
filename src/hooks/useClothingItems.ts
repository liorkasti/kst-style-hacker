import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CLOTHES,
  CLOTHING_ITEMS,
  FILTERED_CLOTHES,
  SELECTED_ITEMS,
} from "../react-query/query-keys";
import { ClothesState, ClothingItemType } from "../constants/types";
import { fetchClothes } from "../api/clothesApi";
import { useDispatch, useSelector } from "react-redux";
import {
  selectClothes,
  setClothes,
  setFilteredItems,
} from "../store/slices/clothes-slice";
import { RootState } from "../store";

export const useClothingItems = () => {
  return useQuery({
    queryKey: [CLOTHING_ITEMS],
    // queryFn: fetchClothes,
  });
};

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
  // if (items.length > 0 && type !== "") dispatch(setFilteredItems(data));
  return {
    data: data as ClothingItemType[],
    isError,
    isLoading,
    isFetching,
    error,
  };
};

// export const useSelectedItems = (item: ClothingItemType) => {
//   const queryClient = useQueryClient([CLOTHING_ITEMS]);

//   queryClient.setQueryData;
// };
