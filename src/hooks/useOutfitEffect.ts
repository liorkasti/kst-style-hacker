import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClothingItemType, OutfitProps } from "../constants/types";
import {
  addToOutfit,
  clearSelection,
  setRecommendations,
} from "../store/slices/clothes-slice";
import { getRecommendations } from "../hooks/useRecommende";

export const useOutfitEffect = (
  selected: ClothingItemType[],
  hasShoes: boolean,
  hasShirt: boolean,
  hasPants: boolean,
  items: ClothingItemType[],
  setShowDialog: (value: boolean) => void,
  item: ClothingItemType,
  nextItem?: string
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (hasShoes && hasShirt && hasPants) {
      setShowDialog(true);
      const outfit: OutfitProps = {
        id: new Date().toISOString(),
        items: selected,
        creationDate: new Date().toLocaleDateString(),
        creationTime: new Date().toLocaleTimeString(),
      };
      dispatch(addToOutfit(outfit));
      dispatch(clearSelection());
    } else {
      if (item) {
        const updatedRecommendations: ClothingItemType[] = getRecommendations(
          item,
          items
        );

        dispatch(setRecommendations(updatedRecommendations));
      }
      if (nextItem) navigate(`/clothing-list?type=${nextItem}`);
    }
  }, [dispatch, selected, hasShoes, hasShirt, hasPants, item]);
};
