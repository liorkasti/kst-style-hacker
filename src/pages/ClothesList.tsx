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
} from "../constants/types";
import {
  useClothesTypeItems,
  useSelectedItems,
} from "../hooks/useClothingItems";
import { getNextType, getRecommendations } from "../hooks/useRecommende";
import { RootState } from "../store";
import { selectClothes, setFilteredItems } from "../store/slices/clothes-slice";

const ClothesList: FC = () => {
  const [recommendations, setRecommendations] = useState<ClothingItemType[]>(
    []
  );
  const [selectedSize, setSelectedSize] = useState<ClotheSizeType>("");
  const [selectedColor, setSelectedColor] = useState<ColorType>("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const type = new URLSearchParams(location.search).get("type") || "";
  const classes = useStyles();
  const dispatch = useDispatch();

  const { data: clothingItems, isLoading, error } = useClothesTypeItems(type);
  const { items, filteredItems } = useSelector(
    (state: RootState) => state.clothes
  );

  useEffect(() => {
    if (items) {
      dispatch(setFilteredItems(type));
    }
    return () => {
      setRecommendations([]);
      setSelectedSize("");
      setSelectedColor("");
    };
  }, []);

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
  }, [filteredItems, selectedSize, selectedColor, type]);

  const handleSelectItem = (item: ClothingItemType) => {
    const recommendations: ClothingItemType[] = getRecommendations(item, items);
    dispatch(selectClothes(item));
    // TODO: useMutation-> useSelectedItems(item).selectItem();

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

  console.log({
    clothingItems,
    items,
    filteredItems,
    filtered,
  });
  return (
    <Box className={classes.root}>
      <Typography mb={2} variant='h4'>
        {SERVICES.SELECT_TYPE}
        {type}
      </Typography>
      {recommendations.length ? (
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
          {filtered.map((item: ClothingItemType) => (
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
