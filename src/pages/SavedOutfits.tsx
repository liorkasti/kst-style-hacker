import React, { FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteOutfit } from "../store/slices/clothes-slice";
import {
  Box,
  Button,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { SERVICES } from "../constants/strings";
import { useStyles } from "../constants/styles";
import { ClothingItemType } from "../constants/types";
import ClothingItem from "../components/ClothingItem";

const SavedOutfits: FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const outfits = useSelector((state: RootState) => state.clothes.selected);

  const savedSelectedItems = JSON.parse(
    localStorage.getItem("selectedItems") || "[]"
  );

  const handleDeleteOutfit = useCallback(
    (item: ClothingItemType) => {
      dispatch(deleteOutfit(item));
      console.log({ outfits });
      localStorage.setItem("clothingItems", JSON.stringify(outfits));
    },
    [outfits, dispatch]
  );

  console.log({ outfits });
  return (
    <Box className={classes.root}>
      <Box p={4}>
        <Typography mb={2} variant='h4'>
          {SERVICES.SAVED_OUTFITS_TITLE}
        </Typography>
        <Grid
          container
          spacing={2}
          direction='row'
          justifyContent='center'
          alignItems='center'>
          {outfits.length > 0 ? (
            outfits?.map((item: ClothingItemType, index: number) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <ClothingItem
                  item={item}
                  onSelect={() => handleDeleteOutfit(item)}
                  isSelected
                />
              </Grid>
            ))
          ) : (
            <Typography>{SERVICES.NO_SAVED_OUTFITS}</Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default SavedOutfits;
