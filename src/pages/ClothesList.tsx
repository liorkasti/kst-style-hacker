import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ClothingItem from "../components/ClothingItem";
import FilterClothing from "../components/FilterClothing";
import { SERVICES } from "../constants/strings";
import { useStyles } from "../constants/styles";
import {
  ClotheSizeType,
  ClothingItemType,
  ColorType,
  OutfitProps,
} from "../constants/types";
import { getNextType, getRecommendations } from "../hooks/useRecommende";
import { RootState } from "../store";
import {
  addToOutfit,
  clearSelection,
  selectClothes,
  setFilteredItems,
  setRecommendations,
} from "../store/slices/clothes-slice";
import CustomButton from "../components/CustomButton";
import SaveIcon from "@mui/icons-material/Save";
import { useClothingSelections } from "../hooks/useClothingSelections";

const ClothesList: FC = () => {
  const [selectedSize, setSelectedSize] = useState<ClotheSizeType>("");
  const [selectedColor, setSelectedColor] = useState<ColorType>("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const type = new URLSearchParams(location.search).get("type") || "";
  const classes = useStyles();
  const dispatch = useDispatch();

  const { items, filteredItems, recommendations, selected } = useSelector(
    (state: RootState) => state.clothes
  );
  const { hasShoes, hasShirt, hasPants } = useClothingSelections(selected);

  useEffect(() => {
    if (items) {
      dispatch(setFilteredItems(type));
    }
    return () => {
      setSelectedSize("");
      setSelectedColor("");
      setOpen(false);
    };
  }, [items, type, dispatch]);

  useEffect(() => {
    if (hasShoes && hasShirt && hasPants) {
      setOpen(true);
      const outfit: OutfitProps = {
        id: new Date().toISOString(),
        items: selected,
        creationDate: new Date().toLocaleDateString(),
        creationTime: new Date().toLocaleTimeString(),
      };
      dispatch(addToOutfit(outfit));
      dispatch(clearSelection());
    }
  }, [dispatch, hasShoes, hasShirt, hasPants, selected]);

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
  }, [filteredItems, selectedSize, selectedColor, type, selected]);

  const handleSelectItem = (item: ClothingItemType) => {
    dispatch(selectClothes(item));
    const nextItem = getNextType(item.type);
    const recommendations: ClothingItemType[] = getRecommendations(item, items);
    dispatch(setRecommendations(recommendations));
    navigate(`/clothing-list?type=${nextItem}`);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/");
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
              Recommendations:
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{SERVICES.SAVE_SET}</DialogTitle>
          <DialogContent>
            <DialogContentText>{SERVICES.SAVE_SETS}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid pr={2} pb={2} mt={-2}>
              <CustomButton
                onClick={handleClose}
                startIcon={<SaveIcon />}
                text={SERVICES.SAVE_SET}
                isDisabled={undefined}
              />
            </Grid>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ClothesList;
