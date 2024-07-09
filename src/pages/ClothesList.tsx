import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FilterClothing from "../components/FilterClothing";
import { SERVICES } from "../constants/strings";
import { useStyles } from "../constants/styles";
import {
  ClothingItemType,
  ColorType,
  PantsSizeType,
  ShirtSizeType,
  ShoesSizeType,
} from "../constants/types";
import { useClothesTypeItems } from "../hooks/useClothingItems";
import { getNextType, getRecommendations } from "../hooks/useRecommende";
import { RootState } from "../store";
import {
  filtereClothes,
  selectClothes,
  setFilteredClothes,
} from "../store/slices/clothes-slice";
import { saveOutfit } from "../store/slices/outfits-slice";
import ClothingItem from "../components/ClothingItem";

const ClothesList: FC = () => {
  const [recommendations, setRecommendations] =
    useState<ClothingItemType | null>();
  const [selectedSize, setSelectedSize] = useState<
    ShirtSizeType | ShoesSizeType | PantsSizeType
  >("");
  const [selectedColor, setSelectedColor] = useState<ColorType | "">("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const type = new URLSearchParams(location.search).get("type") || "";
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    data: clothingTypeItems,
    isLoading,
    error,
  } = useClothesTypeItems(type);
  const clothingItems = useSelector((state: RootState) => state.clothes.items);

  const filteredItems = useMemo(() => {
    if (!clothingItems) return [];
    let items = clothingItems.filter(
      (item: ClothingItemType) => item.type === type
    );
    if (selectedSize) {
      items = items.filter((item) => item.size == selectedSize);
    }
    if (selectedColor) {
      items = items.filter(
        (item) => item.color.toLowerCase() === selectedColor.toLowerCase()
      );
    }
    console.log({ items, clothingTypeItems, clothingItems });
    return items;
  }, [clothingTypeItems, type, selectedSize, selectedColor]);

  useEffect(() => {
    if (clothingTypeItems) {
      dispatch(setFilteredClothes(clothingTypeItems));
    }
  }, []);

  const handleSelectItem = (item: ClothingItemType) => {
    const recommendations = getRecommendations(item, clothingItems);
    console.log(getNextType(item.type), { recommendations });
    dispatch(selectClothes(item));

    if (recommendations.length > 0) {
      setRecommendations(recommendations);
      navigate(`/clothing-list?type=${getNextType(item.type)}`, {
        state: { recommendations },
      });
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography>Error loading items</Typography>;

  return (
    <Box className={classes.root}>
      <Typography mb={2} variant='h4'>
        {SERVICES.SELECT_TYPE}
        {type}
      </Typography>
      {recommendations ? (
        <>
          <Typography mb={2} variant='h4'>
            Recommendations:
          </Typography>
          <Grid
            container
            spacing={2}
            direction='row'
            justifyContent='center'
            alignItems='center'>
            {recommendations.map((item: ClothingItemType) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <ClothingItem
                  item={item}
                  onSelect={() => handleSelectItem(item)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : null}
      <Box p={4}>
        <FilterClothing
          type={type}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <Grid
          container
          spacing={2}
          direction='row'
          justifyContent='center'
          alignItems='center'>
          {filteredItems.map((item: ClothingItemType) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
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
            <DialogContentText>{`You have selected all items. Would you like to save this set?`}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              {SERVICES.SAVE_SET}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ClothesList;
