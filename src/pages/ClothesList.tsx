import { Box, Grid, Typography } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ClothingItem from "../components/ClothingItem";
import FilterClothing from "../components/FilterClothing";
import SaveSetDialog from "../components/SaveSetDialog";
import { SERVICES } from "../constants/strings";
import { useStyles } from "../constants/styles";
import {
  ClotheSizeType,
  ClothingItemType,
  ColorType,
} from "../constants/types";
import { useClothingSelections } from "../hooks/useClothingSelections";
import { RootState } from "../store";
import {
  selectClothes,
  setFilteredItems,
  setItem,
  setRecommendations,
} from "../store/slices/clothes-slice";
import { useOutfitEffect } from "../hooks/useOutfitEffect";

const ClothesList: FC = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<ClotheSizeType>("");
  const [selectedColor, setSelectedColor] = useState<ColorType>("");

  const location = useLocation();
  const type = new URLSearchParams(location.search).get("type") || "";
  const classes = useStyles();
  const dispatch = useDispatch();

  const { item, items, filteredItems, recommendations, selected } = useSelector(
    (state: RootState) => state.clothes
  );
  const { hasShoes, hasShirt, hasPants, nextItem } =
    useClothingSelections(selected);

  useEffect(() => {
    if (items.length) {
      dispatch(setFilteredItems(type));
    }
    return () => {
      setSelectedSize("");
      setSelectedColor("");
      setRecommendations([]);
    };
  }, [items, type, dispatch, item, recommendations]);

  useOutfitEffect(
    selected,
    hasShoes,
    hasShirt,
    hasPants,
    items,
    setShowDialog,
    item,
    nextItem
  );

  const filtered = useMemo(() => {
    if (!filteredItems) return [];
    let renderFilteredItems = filteredItems;

    if (selectedSize && selectedColor) {
      renderFilteredItems = renderFilteredItems.filter(
        (item) =>
          item.size == selectedSize &&
          item.color.toLowerCase() === selectedColor.toLowerCase()
      );
    } else if (selectedSize) {
      renderFilteredItems = renderFilteredItems.filter(
        (item) => item.size == selectedSize
      );
    } else if (selectedColor) {
      renderFilteredItems = renderFilteredItems.filter(
        (item) => item.color.toLowerCase() === selectedColor.toLowerCase()
      );
    }
    return renderFilteredItems;
  }, [filteredItems, selectedSize, selectedColor]);

  const handleSelectItem = (item: ClothingItemType) => {
    dispatch(setItem(item));
    dispatch(selectClothes(item));
  };

  return (
    <Box className={classes.root}>
      <Box p={4}>
        <Box className={classes.filterContainer}>
          <FilterClothing
            type={type}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </Box>
        {recommendations?.length ? (
          <>
            <Typography mb={2} variant='h4'>
              {SERVICES.RECOMMENDATIONS}
            </Typography>
            <Box className={classes.recommendationsContainer}>
              {recommendations.map((item: ClothingItemType) => (
                <Grid
                  item
                  key={item.id}
                  className={classes.recommendationItem}
                  mr={2}
                  minWidth={250}>
                  <ClothingItem
                    item={item}
                    onSelect={() => handleSelectItem(item)}
                  />
                </Grid>
              ))}
            </Box>
          </>
        ) : null}
        <Typography mb={2} variant='h4'>
          {SERVICES.SELECT_TYPE}
          {type}
        </Typography>
        <Grid container spacing={2} className={classes.gridContainer}>
          {filtered.map((item: ClothingItemType) => (
            <Grid item key={item.id} xs={12} sm={8} md={4} lg={3}>
              <ClothingItem
                item={item}
                onSelect={() => handleSelectItem(item)}
              />
            </Grid>
          ))}
        </Grid>
        <SaveSetDialog showDialog={showDialog} setShowDialog={setShowDialog} />
      </Box>
    </Box>
  );
};

export default ClothesList;
