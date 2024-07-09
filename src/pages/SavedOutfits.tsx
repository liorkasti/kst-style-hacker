import { Box, Grid, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClothingItem from "../components/ClothingItem";
import { SERVICES } from "../constants/strings";
import { useStyles } from "../constants/styles";
import { ClothingItemType } from "../constants/types";
import { RootState } from "../store";
import { deleteOutfit } from "../store/slices/clothes-slice";

const SavedOutfits: FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { selected: outfits, items: clothingItems } = useSelector(
    (state: RootState) => state.clothes
  );

  const handleDeleteOutfit = useCallback(
    (item: ClothingItemType) => {
      dispatch(deleteOutfit(item));
      localStorage.setItem("selectedItems", JSON.stringify(outfits));
      localStorage.setItem("clothingItems", JSON.stringify(clothingItems));
    },
    [outfits, dispatch]
  );

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
            outfits?.map((item: ClothingItemType /* index: number */) => (
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
